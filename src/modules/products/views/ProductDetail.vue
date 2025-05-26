<template>
    <div class="bg-[#F8F5F0] dark:bg-dark-secondary py-5 md:py-[30px]">
        <div class="container-fluid">
            <ul
                class="flex items-center gap-[10px] text-base md:text-lg leading-none font-normal text-title dark:text-white max-w-[1720px] mx-auto flex-wrap">
                <li><router-link to="/">Home</router-link></li>
                <li>/</li>
                <li><router-link to="/products">Shop</router-link></li>
                <li>/</li>
            </ul>
        </div>
    </div>

    <!--    <pre>
    {{ product }}
</pre> -->
    <div class="s-py-50" data-aos="fade-up">
        <div class="container-fluid">
            <div class="max-w-[1720px] mx-auto flex justify-between gap-10 flex-col lg:flex-row">
                <div class="w-full lg:w-[58%]">
                    <div class="relative product-dtls-wrapper">
                        <button
                            class="absolute top-5 left-0 p-2 bg-[#E13939] text-lg leading-none text-white font-medium z-50">-10%</button>
                        <div class="product-dtls-slider">
                            <div v-for="(image, index) in product?.images" :key="image.id">
                                <img :src="`${baseUrl}/storage/${image.url_image}`" alt="product" class="w-full"
                                    :class="activeImage === index ? '' : 'hidden'">
                            </div>
                        </div>

                        <div class="product-dtls-nav">
                            <div v-for="(image, index) in product?.images" :key="image.id">
                                <img :src="`${baseUrl}/storage/${image.url_image}`" @click="activeImage = index"
                                    alt="product" class="mb-2 cursor-pointer">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:max-w-[635px] w-full">
                    <div class="pb-4 sm:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <h2 class="font-semibold leading-none">
                            {{ product && product.name ? product.name : 'No especificado' }}
                        </h2>
                        <div class="flex gap-4 items-center mt-[15px]">
                            <!--  <span
                                class="text-lg sm:text-xl leading-none pb-[5px] text-title line-through pl-2 inline-block dark:text-white">$140.99</span> -->
                            <span class="text-2xl sm:text-3xl text-primary leading-none block">
                                ${{ product?.presentations[selectedPresentationIndex]?.unit_price }}
                            </span>
                            {{ selectedPresentationIndex }}
                        </div>

                        <p class="sm:text-lg mt-5 md:mt-7">
                            {{ product?.description }}
                        </p>
                    </div>
                    <div class="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up"
                        data-aos-delay="200">

                        <IncrementDecrement @update:count="handleCountUpdate" />

                        <div class="flex gap-4 mt-4 sm:mt-6">
                            <Button class="btn btn-solid" data-text="Add to Cart" @click="addToCart">
                                <span>Add to Cart</span>
                            </Button>
                            <router-link to="#" class="btn btn-outline" data-text="Add to Wishlist">
                                <span>Add to Wishlist</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up"
                        data-aos-delay="300">
                        <div class="flex flex-col sm:flex-row gap-y-4 gap-x-12 lg:gap-x-24 mt-5 sm:mt-10 items-start">
                            <div class="flex items-center gap-3">
                                <h6 class="leading-none font-medium whitespace-nowrap">Medida:</h6>
                                <div class="flex gap-3 flex-wrap">
                                    <label class="product-size cursor-pointer"
                                        v-for="(size, index) in product?.presentations" :key="index">
                                        <input class="appearance-none hidden" type="radio" name="size"
                                            :checked="index === 0" @click="changePrice(index)">
                                        <span
                                            class="px-6 py-2 rounded-lg uppercase flex items-center justify-center leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300 hover:bg-primary hover:text-white transition-all">
                                            {{ size.amount }}&nbsp;{{ size.unit_measurement }}
                                        </span>
                                        {{ size.id }}

                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up"
                        data-aos-delay="400">
                        <h4 class="font-medium leading-none">Tags :</h4>
                        <div class="flex flex-wrap gap-[10px] md:gap-[15px] mt-5 md:mt-6">
                            <router-link class="btn btn-theme-outline btn-xs" to="#"
                                :data-text="product?.category_product.name">
                                <span>
                                    {{ product?.category_product.name }}
                                </span>
                            </router-link>

                        </div>
                    </div>
                    <div class="pt-4 sm:pt-6" data-aos="fade-up" data-aos-delay="500">
                        <div class="flex items-center gap-6">
                            <h6 class="font-normal">Share : </h6>
                            <div class="flex gap-6">
                                <router-link to="#"
                                    class="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                    <i class="fa-brands fa-facebook-f"></i>
                                </router-link>
                                <router-link to="#"
                                    class="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                    <i class="fa-brands fa-twitter"></i>
                                </router-link>
                                <router-link to="#"
                                    class="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                    <i class="fa-brands fa-instagram"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="s-py-50">
        <DetailTab :description="product?.description" classList="" />
    </div>

    <div class="s-py-50-100">
        <div class="container-fluid">
            <div class="max-w-[547px] mx-auto text-center">
                <h6 class="text-2xl sm:text-3xl md:text-4xl leading-none">Related Products</h6>
                <p class="mt-3">Explore complementary options that enhance your experience. Discover related products
                    curated just for you. </p>
            </div>

            <div v-if="loadingAll">Cargando productos...</div>


            <ProductDetailLayout v-else
                :classList="'max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 pt-8 md:pt-[50px]'"
                :productList="(products ?? []).slice(0, 4)" />
        </div>
    </div>

</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Aos from 'aos'

import { useProductByIdQuery, useProductsQuery } from '../composable/useProductsQuery'
import { useAuthStore } from '@/modules/auth/stores/auth'

import IncrementDecrement from '../components/IncrementDecrement.vue'
import DetailTab from '@/modules/common/components/DetailTab.vue'
import ProductDetailLayout from '@/modules/common/components/ProductDetailLayout.vue'

// Constantes
const CART_KEY = 'cart'
const baseUrl = import.meta.env.VITE_BACKEND_URL
const authStore = useAuthStore()

// Ruta y producto actual
const route = useRoute()
const productId = computed(() => route.params.id?.toString() ?? '')
const { data: product, isLoading: loadingProduct } = useProductByIdQuery(productId.value)
const { data: products, isLoading: loadingAll } = useProductsQuery()

// Estados
const activeImage = ref(1)
const selectedQuantity = ref(1)
const selectedPresentationIndex = ref(0)

// Cuenta regresiva
const now = ref(Date.now())
const targetTime = ref(new Date('Sep 13 2025').getTime())
const difference = ref(targetTime.value - now.value)

watch(now, () => {
    difference.value = targetTime.value - now.value
})
setInterval(() => { now.value = Date.now() }, 1000)

// Hooks
onMounted(() => {
    Aos.init()
})

// Eventos
function handleCountUpdate(value: number) {
    selectedQuantity.value = value
}

function changePrice(index: number) {
    selectedPresentationIndex.value = index
}

// Lógica para el carrito
import { nextTick } from 'vue'

import { nanoid } from 'nanoid' // Asegúrate de instalarlo: `npm i nanoid`

async function addToCart() {
    await nextTick()
    const user = authStore.user
    const productData = product.value

    if (!user || !productData) {
        alert('Debes iniciar sesión para agregar al carrito.')
        return
    }

    const price = productData.presentations[selectedPresentationIndex.value].unit_price

    const cartItem = {
        cartItemId: nanoid(),
        userId: user.id,
        productId: productData.id,
        price,
        quantity: selectedQuantity.value,
    }

    const existingCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')

    // Agrega siempre el nuevo ítem sin verificar si existe
    existingCart.push(cartItem)

    localStorage.setItem(CART_KEY, JSON.stringify(existingCart))
    alert('Producto agregado al carrito')
}


</script>



<style lang="scss" scoped></style>
