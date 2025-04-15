<template>
    <div class="dark:bg-title bg-[#EBEBEB]">
        <Navbar />
        <div
            class="hv6-banner bg-overlay py-20 sm:py-24 md:py-32 2xl:py-[245px] bg-[#EBEBEB] dark:bg-title dark:before:bg-dark-secondary dark:before:bg-opacity-50 2xl:dark:before:hidden">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <span class="text-xl sm:text-2xl lg:text-3xl leading-none block text-primary" data-aos="fade-up">New
                        Arrival</span>
                    <h2 class="text-4xl sm:text-5xl lg:text-7xl sm:leading-tight leading-tight lg:leading-tight max-w-[300px] sm:max-w-[400px] lg:max-w-[602px] mt-5"
                        data-aos="fade-up" data-aos-delay="100">Premium Lounge Sofa Chair</h2>
                    <p class="max-w-[450px] lg:max-w-[550px] mt-3 sm:mt-0" data-aos="fade-up" data-aos-delay="200">We
                        offer you an
                        extremely comfortable lounge sofa chair. Taking the time to relax at home or the office will be
                        more
                        appealing
                        than ever when you choose a modern lounge sofa chair.</p>
                    <div data-aos="fade-up" data-aos-delay="300">
                        <router-link to="/shop-v1" class="btn btn-outline mt-6" data-text="Let's Shop Now">
                            <span>Let's Shop Now</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-[#EBEBEB] dark:bg-title s-py-100" data-aos="fade-up">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <div
                        class="bg-[#F3F3F3] dark:bg-dark-secondary rounded-[10px] xl:flex xl:justify-between sm:gap-5 grid sm:grid-cols-2 relative">
                        <div v-for="(item, index) in servicesData" :key="index" class="relative">
                            <router-link to="/product-category" class="group flex items-center gap-5 p-6">
                                <div
                                    class="w-14 md:w-[70px] h-14 p-[10px] md:h-[70px] flex items-center justify-center border border-primary rounded-[10px] group-hover:bg-primary duration-300">
                                    <div class="block group-hover:hidden">
                                        <img :src="item.image" alt="" />
                                    </div>
                                    <div class="hidden group-hover:block">
                                        <img :src="item.image2" alt="" />
                                    </div>
                                </div>
                                <div>
                                    <h5 class="font-medium leading-none text-lg lg:text-xl">{{ item.title }}</h5>
                                    <p class="leading-none mt-[10px]">{{ item.product }}</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="s-py-100 bg-[#F3F3F3] dark:bg-dark-secondary relative z-[1] overflow-hidden">
            <img class="absolute top-0 left-[6%] z-[-1] w-[10%] 2xl:w-auto" :src="offer1" alt="offer-shape"
                data-aos="fade-down">
            <img class="absolute right-0 bottom-0 lg:bottom-auto lg:top-1/2 transform lg:-translate-y-1/2 z-[-1] w-1/4 2xl:w-auto"
                :src="offer2" alt="offer-shape">
            <div class="container">
                <div class="max-w-[780px] mx-auto text-center">
                    <h2 class="leading-none text-7xl sm:text-100 lg:text-[150px] xl:text-[200px] italic flex items-start justify-center"
                        data-aos="fade-up">45% <sup
                            class="text-xl sm:text-2xl lg:text-3xl font-normal text-primary transform rotate-90 inline-block not-italic translate-y-[20px] lg:translate-y-[40px]">OFF</sup>
                    </h2>
                    <h3 class="font-normal leading-none mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl" data-aos="fade-up"
                        data-aos-delay="100">Hurry Up ! It,s Only for Today</h3>
                    <p class="mt-5 sm:mt-6" data-aos="fade-up" data-aos-delay="200">Don't miss out on exclusive savings!
                        Enjoy a massive 45% discount, available for today only. Hurry, grab your deal before it's
                        gone!This special deal won’t last long, so claim it while you can! </p>
                    <div data-aos="fade-up" data-aos-delay="300">
                        <router-link to="/shop-v2" class="btn btn-outline mt-6" data-text="Claim Discount">
                            <span>Claim Discount</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>


        <div class="s-py-100-50">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <div class="max-w-[547px] mx-auto mb-8 md:mb-12 text-center" data-aos="fade-up">
                        <img :src="bed" class="mx-auto" alt="">
                        <h2 class="mt-[15px] leading-none">Latest Products</h2>
                        <p class="mt-[10px] md:mt-[15px]">Be the first to experience innovation with our latest
                            arrivals. Stay ahead of the curve and discover what's new in style. </p>
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
                        <router-link to="/shop-v3" class="btn btn-outline" data-text="See all Products">
                            <span>See all Products</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>


        <div class="s-py-50" data-aos="fade-up">
            <div class="grid md:grid-cols-2 gap-8">
                <div class="relative">
                    <img class="w-full object-cover" :src="product1" alt="product">
                    <div
                        class="absolute w-[90%] h-[90%] flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div
                            class="bg-white dark:bg-title bg-opacity-90 dark:bg-opacity-90 p-5 sm:p-6 flex items-start flex-col">
                            <h4 class="font-normal leading-none">Up to <span class="text-primary">20% off</span> all
                                furniture on store</h4>
                            <h2 class="text-3xl md:text-4xl xl:text-5xl leading-none mt-[15px]">Home & Office</h2>
                            <router-link to="/shop-v4" class="btn btn-outline btn-sm mt-4 sm:mt-6" data-text="Shop Now">
                                <span>Shop Now</span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <img class="w-full object-cover" :src="product2" alt="product">
                    <div
                        class="absolute w-[90%] h-[90%] flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div
                            class="bg-white dark:bg-title bg-opacity-90 dark:bg-opacity-90 p-5 sm:p-6 flex items-start flex-col">
                            <h4 class="font-normal leading-none">Up to <span class="text-primary">35% off</span> all
                                Interior Items</h4>
                            <h2 class="text-3xl md:text-4xl xl:text-5xl leading-none mt-[15px]">Interior Setup</h2>
                            <router-link to="/shop-v2" class="btn btn-outline btn-sm mt-4 sm:mt-6" data-text="Shop Now">
                                <span>Shop Now</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="s-py-50-100">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <div class="max-w-[547px] mx-auto mb-8 sm:mb-[70px] text-center" data-aos="fade-up">
                        <img :src="comment" class="mx-auto" alt="">
                        <h2 class="mt-[15px] leading-none">From the Blog</h2>
                        <p class="mt-[10px] md:mt-[15px]">Stay informed and inspired with our latest blog posts. Explore
                            insightful content that keeps you ahead of trends. </p>
                    </div>
                    <Blog />
                </div>
            </div>
        </div>

        <div class="py-12 bg-[#F3F3F3] dark:bg-dark-secondary">
            <div class="container">
                <Partner />
            </div>
        </div>


        <Footer />

        <ScrollToTop /><!-- // TODO  Verificar por que el scroll to top no funciona-->
    </div>

</template>

<script setup>
import { onMounted } from 'vue';

import Navbar from '@/modules/common/components/Navbar.vue';
//import NavbarOne from '@/components/navbar/navbar-one.vue';
import Blog from '../components/Blog.vue';
import Partner from '../components/Partner.vue';
import Footer from '@/modules/common/components/Footer.vue';
import ScrollToTop from '@/modules/common/components/ScrollToTop.vue';

//import comment from '@/assets/img/svg/comment-2.svg'
import offer1 from '@/assets/images/home/offer-01.png'
import offer2 from '@/assets/images/home/offer-02.png'
import product1 from '@/assets/images/home-v3/pdct-01.jpg'
import product2 from '@/assets/images/home-v3/pdct-02.jpg'
//import bed from '@/assets/img/svg/bed-2.svg'

import Aos from 'aos';


import { productList } from '@/mocks/data';
import { servicesData } from '@/mocks/index-three';

onMounted(() => {
    Aos.init()
})
</script>
