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

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5 lg:gap-x-7 gap-y-[30px] lg:gap-y-12"
                        data-aos="fade-up" data-aos-delay="100">
                        <div v-for="(item, index) in productList.slice(4, 12)" :key="index">
                            <div class="group relative overflow-hidden">
                                <img class="w-full transform duration-300 group-hover:scale-110" :src="item.image"
                                    alt="product-card">
                                <div
                                    class="absolute w-11/12 h-[91.6666%] top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 bg-white dark:bg-title bg-opacity-70 dark:bg-opacity-70 flex items-end p-5 scale-110 opacity-0 duration-200 group-hover:scale-100 group-hover:opacity-100">
                                    <ul class="flex items-center gap-2 mt-1">
                                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                        <li><i class="fa-solid fa-star text-slate-300 text-[14px]"></i></li>
                                        <li class="dark:text-gray-100 text-[#3C474E]">( 1,230 )</li>
                                    </ul>
                                    <div class="absolute z-10 top-5 right-5 flex flex-col items-end gap-3">
                                        <router-link to="#"
                                            class="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon new-product-icon-3">
                                            <i class="mdi mdi-cards-heart-outline dark:text-white text-[24px]"></i>
                                            <span class="mt-1">Add to wishlist</span>
                                        </router-link>
                                        <router-link to="#"
                                            class="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon new-product-icon-3">
                                            <i class="mdi mdi-shopping-outline dark:text-white text-[24px]"></i>
                                            <span class="mt-1">Add to Cart</span>
                                        </router-link>
                                        <button
                                            class="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon new-product-icon-3 quick-view">
                                            <i class="mdi mdi-eye-outline dark:text-white text-[24px]"></i>
                                            <span class="mt-1">Quick View</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 md:mt-6 flex items-start justify-between gap-4">
                                <div>
                                    <h5 class="leading-none mb-4 dark:text-white font-primary text-lg font-medium">
                                        {{ item.price }}</h5>
                                    <h5 class="text-lg md:text-xl font-normal dark:text-white leading-[1.5]">
                                        <router-link to="/product-details">{{ item.name }}</router-link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-7 md:mt-12" data-aos="fade-up" data-aos-delay="200">
                        <router-link to="/shop-v3" class="btn btn-outline" data-text="Ver todos los Productos">
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
            </div>
        </div>

        <Footer />

        <ScrollToTop /><!-- // TODO  Verificar por que el scroll to top no funciona-->
    </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Navbar from '@/modules/common/components/Navbar.vue';
//import NavbarOne from '@/components/navbar/navbar-one.vue';
import Blog from '../components/Blog.vue';
import Footer from '@/modules/common/components/FooterOne.vue';
import ScrollToTop from '@/modules/common/components/ScrollToTop.vue';


import Aos from 'aos';


import { productList } from '@/mocks/data.ts';

onMounted(() => {
    Aos.init()
})
</script>
