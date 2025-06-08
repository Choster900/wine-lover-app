<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Blog</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li class="text-primary">Blog</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100" data-aos="fade-up">
        <div class="container">
            <div class="max-w-1366 mx-auto">
                <!-- Header de la sección -->
                <div class="max-w-[547px] mx-auto mb-8 md:mb-12 text-center" data-aos="fade-up">
                    <h2 class="mt-[15px] leading-none">Reseñas y Artículos</h2>
                    <p class="mt-[10px] md:mt-[15px]">
                        Descubre reseñas exclusivas, recomendaciones expertas y las últimas tendencias en el mundo de los vinos y licores.
                        Mantente informado con nuestro contenido especializado.
                    </p>
                </div>

                <!-- Grid de reseñas -->
                <div v-if="isLoading" class="flex justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]" data-aos="fade-up" data-aos-delay="200">
                    <div v-for="(item, index) in reviews" :key="item.id" class="group" data-aos="fade-up" :data-aos-delay="100 + (index * 50)">
                        <router-link :to="`/review/${item.id}`"
                            class="p-[10px] sm:p-[15px] transition-all duration-300 group-hover:bg-opacity-0 overflow-hidden block">
                            <img
                                class="duration-200 transform scale-100 group-hover:scale-110 w-full h-48 object-cover rounded"
                                :src="baseUrl + '/' + item.cover_image"
                                :alt="item.title"
                                @error="handleImageError"
                            >
                        </router-link>
                        <div class="pt-5 md:pt-6 md:px-4 text-center">
                            <!-- Título -->
                            <h5 class="text-primary font-semibold text-sm mb-1 uppercase tracking-wide">
                                <router-link :to="`/review/${item.id}`" class="transition-all duration-300 group-hover:bg-opacity-0 overflow-hidden block">
                                    {{ item.title }}
                                </router-link>
                            </h5>

                            <!-- Botón Ver -->
                            <div class="text-center mt-7" >
                                <router-link
                                    class="btn btn-outline"
                                    data-text="Leer más"
                                    :to="`/reviews/${item.id}`">
                                    Leer más
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <TablePagination
                    v-if="paginationData && paginationData.total > 0"
                    :current-page="currentPage"
                    :total-pages="paginationData.last_page"
                    :total="paginationData.total"
                    :from="paginationData.from"
                    :to="paginationData.to"
                    @page-change="handlePageChange"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import TablePagination from '@/modules/common/components/TablePagination.vue'
import { fetchReviewsAction } from '../actions/fetch-reviews.action'

const route = useRoute()
const router = useRouter()
const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL

const reviews = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const paginationData = ref(null)

Aos.init()

const loadReviews = async () => {
    try {
        isLoading.value = true

        const params = {
            page: currentPage.value,
            per_page: 9,
        }

        const response = await fetchReviewsAction(params)

        if (response && response.data) {
            console.log(response);

            reviews.value = response.data
            paginationData.value = {
                total: response.meta.total || 0,
                last_page: response.meta.last_page || 1,
                from: response.meta.from || 0,
                to: response.meta.to || 0,
                current_page: response.meta.current_page || 1
            }
        } else {
            reviews.value = []
            paginationData.value = null
        }
    } catch (error) {
        console.error('Error al cargar las reseñas:', error)
        reviews.value = []
        paginationData.value = null
    } finally {
        isLoading.value = false
    }
}

const handlePageChange = (page: number) => {
    currentPage.value = page

    const query = { ...route.query, page: page.toString() }
    if (page === 1) {
        delete query.page
    }

    router.push({ query })

    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    target.src = '/placeholder.svg?height=200&width=300'
}

const initializeFromURL = () => {
    const pageParam = route.query.page
    if (pageParam && typeof pageParam === 'string') {
        const page = parseInt(pageParam)
        if (page > 0) {
            currentPage.value = page
        }
    }
}

watch(currentPage, () => {
    loadReviews()
})

onMounted(() => {
    initializeFromURL()
    loadReviews()
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.blog-btn-hover:hover::before {
    height: 100%;
}

.transition-colors {
    transition: color 0.3s ease;
}

input:focus {
    outline: none;
}

select:focus {
    outline: none;
}
</style>
