import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { GetProductParams } from '../interfaces/get-product-params.interface'

export interface FilterState {
  name?: string
  min_price?: number
  max_price?: number
  category_product_id?: number
  quality_product_id?: number
  manufacturer_id?: number
  page: number
  per_page: number
}

export function useProductFilters() {
  const router = useRouter()
  const route = useRoute()

  // Estado de los filtros
  const filters = ref<FilterState>({
    page: 1,
    per_page: 6, // Paginación de 6 en 6 como solicitado
    name: undefined,
    min_price: undefined,
    max_price: undefined,
    category_product_id: undefined,
    quality_product_id: undefined,
    manufacturer_id: undefined
  })

  // Inicializar filtros desde la URL
  const initializeFiltersFromURL = () => {
    const query = route.query

    filters.value = {
      page: Number(query.page) || 1,
      per_page: 6,
      name: query.name as string || undefined,
      min_price: query.min_price ? Number(query.min_price) : undefined,
      max_price: query.max_price ? Number(query.max_price) : undefined,
      category_product_id: query.category_product_id ? Number(query.category_product_id) : undefined,
      quality_product_id: query.quality_product_id ? Number(query.quality_product_id) : undefined,
      manufacturer_id: query.manufacturer_id ? Number(query.manufacturer_id) : undefined
    }
  }

  // Parámetros para la query
  const queryParams = computed<GetProductParams>(() => {
    const params: GetProductParams = {
      paginate: true,
      page: filters.value.page,
      per_page: filters.value.per_page
    }

    if (filters.value.name) params.name = filters.value.name
    if (filters.value.min_price !== undefined) params.min_price = filters.value.min_price
    if (filters.value.max_price !== undefined) params.max_price = filters.value.max_price
    if (filters.value.category_product_id) params.category_product_id = filters.value.category_product_id
    if (filters.value.quality_product_id) params.quality_product_id = filters.value.quality_product_id
    if (filters.value.manufacturer_id) params.manufacturer_id = filters.value.manufacturer_id

    return params
  })

  // Actualizar URL cuando cambien los filtros
  const updateURL = () => {
    const query: Record<string, string> = {}

    if (filters.value.page > 1) query.page = filters.value.page.toString()
    if (filters.value.name) query.name = filters.value.name
    if (filters.value.min_price !== undefined) query.min_price = filters.value.min_price.toString()
    if (filters.value.max_price !== undefined) query.max_price = filters.value.max_price.toString()
    if (filters.value.category_product_id) query.category_product_id = filters.value.category_product_id.toString()
    if (filters.value.quality_product_id) query.quality_product_id = filters.value.quality_product_id.toString()
    if (filters.value.manufacturer_id) query.manufacturer_id = filters.value.manufacturer_id.toString()

    router.push({ query })
  }

  // Métodos para actualizar filtros
  const updateFilter = (key: keyof FilterState, value: any) => {
    filters.value[key] = value
    if (key !== 'page') {
      filters.value.page = 1 // Reset page when filters change
    }
    updateURL()
  }

  const updatePriceRange = (minPrice: number, maxPrice: number) => {
    filters.value.min_price = minPrice
    filters.value.max_price = maxPrice
    filters.value.page = 1
    updateURL()
  }

  const updateCategories = (categoryIds: number[]) => {
    filters.value.category_product_id = categoryIds.length > 0 ? categoryIds[0] : undefined
    filters.value.page = 1
    updateURL()
  }

  const updateQuality = (qualityId: number | undefined) => {
    filters.value.quality_product_id = qualityId
    filters.value.page = 1
    updateURL()
  }

  const updateManufacturer = (manufacturerId: number | undefined) => {
    filters.value.manufacturer_id = manufacturerId
    filters.value.page = 1
    updateURL()
  }

  const resetFilters = () => {
    filters.value = {
      page: 1,
      per_page: 6,
      name: undefined,
      min_price: undefined,
      max_price: undefined,
      category_product_id: undefined,
      quality_product_id: undefined,
      manufacturer_id: undefined
    }
    updateURL()
  }

  const goToPage = (page: number) => {
    updateFilter('page', page)
  }

  // Inicializar al montar
  initializeFiltersFromURL()

  // Watch para actualizar cuando cambie la URL
  watch(() => route.query, () => {
    initializeFiltersFromURL()
  }, { deep: true })

  return {
    filters,
    queryParams,
    updateFilter,
    updatePriceRange,
    updateCategories,
    updateQuality,
    updateManufacturer,
    resetFilters,
    goToPage
  }
}
