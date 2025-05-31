<template>
    <div :class="classList">
        <div v-for="(item, index) in productList" :key="index" class="group">
            <div class="relative overflow-hidden">
                <router-link :to="`/products/${item.id}`">
                    <img class="w-full h-60 object-cover transform group-hover:scale-110 duration-300"
                        :src="`${baseUrl}/${item.images[0].url_image}`" alt="product" />
                </router-link>
                <div
                    class="absolute z-10 top-7 left-7 pt-[10px] pb-2 px-3 bg-[#9739E1] rounded-[30px] font-primary text-[14px] text-white font-semibold leading-none">
                    NEW
                </div>
            </div>

            <div class="md:px-2 lg:px-4 xl:px-6 lg:pt-6 pt-5 flex gap-4 md:gap-5 flex-col">
                <h4 class="font-medium leading-none dark:text-white text-lg">
                    ${{ parseFloat(item.presentations[0].unit_price).toFixed(2) }}
                </h4>
                <div>
                    <h5 class="font-normal dark:text-white text-xl leading-[1.5]">
                        <router-link :to="`/products/${item.id}`" class="text-underline">
                            {{ item.name }}
                        </router-link>
                    </h5>
                    <ul class="flex items-center gap-2 mt-1">
                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                        <li><i class="fa-solid fa-star text-slate-300 text-[14px]"></i></li>
                        <li class="dark:text-gray-100">( 1,230 )</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Product } from '../interfaces/product.interface';

const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL;

defineProps<{
    productList: Product[]
    classList: string
}>()
</script>
