<template>


    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Shop</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Home</router-link></li>
                <li>/</li>
                <li class="text-primary">Shop</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100">
        <div class="container">
            <div class="max-w-[1477px] mx-auto flex items-start justify-between gap-8 md:gap-10 flex-col lg:flex-row">
                <div class="grid gap-[15px] lg:max-w-[300px] w-full sm:grid-cols-2 lg:grid-cols-1" data-aos="fade-up">
                    <CategoriesFilter />
                    <ItemsType />
                    <BrandsFilter />
                    <RangePrice />

                    <router-link to="/shop-v1" class="hidden lg:block">
                        <img class="w-full" :src="card" alt="shop-card">
                    </router-link>
                </div>
                <div class="lg:max-w-[1100px] w-full" data-aos="fade-up" data-aos-delay="200">

                    <ProductsCards
                        :classList="'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8'"
                        :productList="productList" />

                </div>
            </div>
        </div>
    </div>



</template>
<script setup lang="ts">
import bg from '@/assets/images/shortcode/breadcumb.jpg'

import Aos from 'aos';
import { onMounted, ref } from 'vue'
import ItemsType from '../components/ItemsType.vue';
import RangePrice from '../components/RangePrice.vue';
import card from '@/assets/images/thumb/shop-card.jpg'
import BrandsFilter from '../components/BrandsFilter.vue';
import ProductsCards from '../components/ProductsCards.vue';
import CategoriesFilter from '../components/CategoriesFilter.vue';
import { fetchProductsAction } from '../actions/fetch-products.action';
import type { Product } from '../interfaces/product.interface';

const productList = ref<Product[]>([])


onMounted(async () => {
    Aos.init()

    try {
        const response = await fetchProductsAction()
        productList.value = response.data
    } catch (error) {
        console.error('Error cargando productos:', error)
    }
})



</script>
