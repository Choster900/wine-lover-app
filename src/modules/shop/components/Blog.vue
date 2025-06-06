<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]" data-aos="fade-up" data-aos-delay="100">
        <div v-if="isLoading" class="col-span-full flex justify-center py-10">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="!reviews || reviews.length === 0" class="col-span-full text-center py-10">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <i class="fas fa-newspaper text-2xl"></i>
            </div>
            <h4 class="text-lg font-medium text-gray-600 dark:text-gray-400">No hay reseñas disponibles</h4>
            <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Vuelve pronto para ver nuevas reseñas
            </p>
        </div>

        <div v-else v-for="(item, index) in reviews" :key="index" class="group">
            <router-link :to="`/review/${item.id}`"
                class="p-[10px] sm:p-[15px] transition-all duration-300 group-hover:bg-opacity-0 overflow-hidden block">
                <img class="duration-200 transform scale-100 group-hover:scale-110 w-full" :src="baseUrl + '/' + item.cover_image"
                    alt="blog-card">
            </router-link>
            <div class="pt-5 md:pt-6 md:px-4 text-center">
                <h5 class="text-primary font-semibold text-sm mb-1 uppercase tracking-wide">
                    <router-link :to="`/reviews/${item.id}`" class="transition-all duration-300 group-hover:bg-opacity-0 overflow-hidden block">{{ item.title }}</router-link>
                </h5>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Aos from 'aos';
import { fetchReviewsAction } from '../../review/actions/fetch-reviews.action';

const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL;

const reviews = ref([]);
const isLoading = ref(true);

const loadReviews = async () => {
    try {
        isLoading.value = true;
        const response = await fetchReviewsAction({ page: 1, per_page: 3 });
        reviews.value = response.data || [];
    } catch (error) {
        console.error('Error al cargar las reseñas:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    Aos.init();
    loadReviews();
});
</script>
