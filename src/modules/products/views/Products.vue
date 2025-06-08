<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Tienda</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li class="text-primary">Tienda</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100">
        <div class="container">
            <div class="max-w-[1477px] mx-auto flex items-start justify-between gap-8 md:gap-10 flex-col lg:flex-row">
                <!-- Filtros -->
                <div class="grid gap-[15px] lg:max-w-[300px] w-full sm:grid-cols-2 lg:grid-cols-1">
                    <CategoriesFilter
                        :model-value="selectedCategories"
                        @update:model-value="handleCategoriesChange"
                    />
                    <ItemsType
                        :model-value="selectedQuality"
                        @update:model-value="handleQualityChange"
                    />
                    <BrandsFilter
                        :model-value="selectedManufacturer"
                        @update:model-value="handleManufacturerChange"
                    />
                    <RangePrice
                        :min-value="selectedMinPrice"
                        :max-value="selectedMaxPrice"
                        @update:range="handlePriceRangeChange"
                    />

                    <!-- Botón para limpiar filtros -->
                    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
                        <button
                            @click="resetFilters"
                            class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </div>

                <!-- Productos -->
                <div class="lg:max-w-[1100px] w-full" data-aos="fade-up" data-aos-delay="200">
                    <!-- Información de resultados y filtros activos -->
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">
                                {{ isLoading ? 'Cargando...' : `${totalProducts} productos encontrados` }}
                            </h3>
                            <div class="text-sm text-gray-600">
                                Página {{ currentPage }} de {{ totalPages }}
                            </div>
                        </div>

                        <!-- Filtros activos -->
                        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-4">
                            <span class="text-sm text-gray-600">Filtros activos:</span>
                            <span
                                v-if="selectedCategories.length > 0"
                                class="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                            >
                                Categorías: {{ selectedCategories.length }}
                            </span>
                            <span
                                v-if="selectedQuality"
                                class="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                            >
                                Calidad seleccionada
                            </span>
                            <span
                                v-if="selectedManufacturer"
                                class="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                            >
                                Fabricante seleccionado
                            </span>
                            <span
                                v-if="selectedMinPrice > 0 || selectedMaxPrice < 1000"
                                class="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                            >
                                Precio: ${{ selectedMinPrice }} - ${{ selectedMaxPrice }}
                            </span>
                        </div>
                    </div>

                    <!-- Loading state -->
                    <div v-if="isLoading" class="text-center py-8">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p class="mt-4 text-gray-600">Cargando productos...</p>
                    </div>

                    <!-- Error state -->
                    <div v-else-if="isError" class="text-center py-8">
                        <p class="text-red-600">Ocurrió un error al cargar los productos.</p>
                        <button
                            @click="refetch"
                            class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Reintentar
                        </button>
                    </div>

                    <!-- Products grid -->
                    <div v-else>
                        <ProductsCards
                            v-if="productList && productList.length > 0"
                            :classList="'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8'"
                            :productList="productList"
                        />

                        <!-- Empty state -->
                        <div v-else class="text-center py-12">
                            <p class="text-gray-600 text-lg">No se encontraron productos con los filtros seleccionados.</p>
                            <button
                                @click="resetFilters"
                                class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                            >
                                Limpiar filtros
                            </button>
                        </div>

                        <!-- Paginación -->
                        <TablePagination
                            v-if="productList && productList.length > 0 && productsResponse?.meta"
                            :current-page="currentPage"
                            :total-pages="totalPages"
                            :total="totalProducts"
                            :from="fromProduct"
                            :to="toProduct"
                            @page-change="handlePageChange"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import bg from '@/assets/images/shortcode/breadcumb.jpg'

import Aos from 'aos';
import { computed, onMounted } from 'vue'
import ItemsType from '../components/ItemsType.vue';
import RangePrice from '../components/RangePrice.vue';
import BrandsFilter from '../components/BrandsFilter.vue';
import ProductsCards from '../components/ProductsCards.vue';
import CategoriesFilter from '../components/CategoriesFilter.vue';
import TablePagination from '@/modules/common/components/TablePagination.vue'
import { useProductsQuery } from '../composable/useProductsQuery';
import { useProductFilters } from '../composable/useProductFilters';

// Usar el composable de filtros
const {
    filters,
    queryParams,
    updateCategories,
    updateQuality,
    updateManufacturer,
    updatePriceRange,
    resetFilters,
    goToPage
} = useProductFilters()

// Query de productos con parámetros reactivos - CAMBIO AQUÍ
const { data: productsResponse, isLoading, isError, refetch } = useProductsQuery(queryParams)

// Computed properties para los filtros
const selectedCategories = computed(() =>
    filters.value.category_product_id ? [filters.value.category_product_id] : []
)
const selectedQuality = computed(() => filters.value.quality_product_id)
const selectedManufacturer = computed(() => filters.value.manufacturer_id)
const selectedMinPrice = computed(() => filters.value.min_price || 0)
const selectedMaxPrice = computed(() => filters.value.max_price || 1000)

// Computed properties para los productos y paginación
const productList = computed(() => productsResponse.value?.data || [])
const currentPage = computed(() => productsResponse.value?.meta?.current_page || 1)
const totalPages = computed(() => productsResponse.value?.meta?.last_page || 1)
const totalProducts = computed(() => productsResponse.value?.meta?.total || 0)
const fromProduct = computed(() => productsResponse.value?.meta?.from || 0)
const toProduct = computed(() => productsResponse.value?.meta?.to || 0)

// Computed para verificar si hay filtros activos
const hasActiveFilters = computed(() => {
    return selectedCategories.value.length > 0 ||
           selectedQuality.value !== undefined ||
           selectedManufacturer.value !== undefined ||
           selectedMinPrice.value > 0 ||
           selectedMaxPrice.value < 1000
})

// Handlers para los filtros
const handleCategoriesChange = (categoryIds: number[]) => {
    updateCategories(categoryIds)
}

const handleQualityChange = (qualityId: number | undefined) => {
    updateQuality(qualityId)
}

const handleManufacturerChange = (manufacturerId: number | undefined) => {
    updateManufacturer(manufacturerId)
}

const handlePriceRangeChange = (minPrice: number, maxPrice: number) => {
    updatePriceRange(minPrice, maxPrice)
}

const handlePageChange = (page: number) => {
    goToPage(page)
}

onMounted(async () => {
    Aos.init()
})
</script>
