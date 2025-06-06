<template>
    <div class="dark:bg-title bg-[#EBEBEB]">
        <Navbar />
        <div
            class="hv6-banner bg-overlay py-20 sm:py-24 md:py-32 2xl:py-[245px] bg-[#EBEBEB] dark:bg-title dark:before:bg-dark-secondary dark:before:bg-opacity-50 2xl:dark:before:hidden">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                <span class="text-xl sm:text-2xl lg:text-3xl leading-none block text-primary" data-aos="fade-up">
                    Exclusivo para amantes del vino y licores
                </span>
                <h2
                    class="text-4xl sm:text-5xl lg:text-6xl sm:leading-tight leading-tight lg:leading-tight max-w-[300px] sm:max-w-[400px] lg:max-w-[602px] mt-5 pt-5 pb-5"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Únete al Club y disfruta de experiencias únicas
                </h2>
                <p class="max-w-[450px] lg:max-w-[550px] mt-3 sm:mt-0" data-aos="fade-up" data-aos-delay="200">
                    Conviértete en miembro del <strong>Club Amantes del Vino y Licores</strong> y accede a descuentos especiales y contenido exclusivo.
                </p>
                <div data-aos="fade-up" data-aos-delay="300">
                    <router-link to="/membership" class="btn btn-outline mt-6" data-text="Descubrir ahora">
                    <span>Descubre nuestros planes</span>
                    </router-link>
                </div>
                </div>
            </div>
        </div>


        <div class="s-py-100-50">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <div class="max-w-[547px] mx-auto mb-8 md:mb-12 text-center" data-aos="fade-up">
                        <h2 class="mt-[15px] leading-none">Productos Nuevos</h2>
                        <p class="mt-[10px] md:mt-[15px]">
                            Sé el primero en descubrir nuevas sensaciones. Explora nuestras más recientes selecciones de vinos y licores premium. Mantente a la vanguardia del buen gusto y disfruta lo nuevo antes que nadie.
                        </p>
                    </div>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-x-5 lg:gap-x-7 gap-y-[30px] lg:gap-y-12"
                        data-aos="fade-up" data-aos-delay="100">
                        <div v-for="(item, index) in productList?.data" :key="index">
                            <div class="group relative overflow-hidden ">
                                <img class="w-full transform duration-300 group-hover:scale-110" :src="`${baseUrl}/${item.images[0].url_image}`"
                                    alt="product-card">

                            </div>
                            <div class="mt-4 md:mt-6 flex items-start justify-between gap-4">
                                <div>
                                    <h5 class="text-primary font-semibold text-sm mb-1 uppercase tracking-wide">
                                        <router-link :to="`/products/${item.id}`" class="text-underline">
                                            {{ item.name }}
                                        </router-link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-7 md:mt-12" data-aos="fade-up" data-aos-delay="200">
                        <router-link to="/products" class="btn btn-outline" data-text="Ver todos los Productos">
                            <span>Ver todos los Productos</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="s-py-50-100">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <div class="max-w-[547px] mx-auto mb-8 sm:mb-[70px] text-center" data-aos="fade-up">
                        <h2 class="mt-[15px] leading-none">Blog</h2>
                        <p class="mt-[10px] md:mt-[15px]">
                            Accede a reseñas exclusivas como miembro del club. Mantente informado e inspirado con nuestras últimas publicaciones sobre vinos y licores. Descubre recomendaciones expertas y tendencias antes que nadie.
                        </p>
                    </div>
                    <Blog />
                </div>
                <div class="text-center mt-7 md:mt-12" data-aos="fade-up" data-aos-delay="200">
                    <router-link to="/reviews" class="btn btn-outline" data-text="Ver todas las Reseñas">
                        <span>Ver todas las Reseñas</span>
                    </router-link>
                </div>
            </div>
        </div>

        <Footer />

        <ScrollToTop /><!-- // TODO  Verificar por que el scroll to top no funciona-->
    </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Navbar from '@/modules/common/components/Navbar.vue';
import Blog from '../components/Blog.vue';
import Footer from '@/modules/common/components/FooterOne.vue';
import ScrollToTop from '@/modules/common/components/ScrollToTop.vue';


import Aos from 'aos';
import { useProductsQuery } from '@/modules/products/composable/useProductsQuery';

const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL;

const { data: productList } = useProductsQuery({ page: 1, per_page: 3 })

onMounted(() => {
    Aos.init()
})
</script>
