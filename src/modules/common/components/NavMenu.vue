<template>
    <div class="flex items-center gap-4 sm:gap-6">
        <router-link v-if="!auth.isLoggedIn" to="/auth/login"
            class="text-lg leading-none text-title dark:text-white transition-all duration-300 hover:text-primary hidden lg:block">
            Login
        </router-link>

        <!--  <button class="relative hdr_wishList_btn" @click="wishList = !wishList">
            <span
                class="absolute w-[22px] h-[22px] bg-secondary top-[0px] -right-[11px] rounded-full flex items-center justify-center text-xs leading-none text-white">14</span>
            <i class="mdi mdi-cards-heart-outline text-3xl dark:text-white text-[50px] sm:text-[50px]"></i>
            <i class="mdi mdi-cards-heart-outline text-4xl text-red-600 dark:text-white"></i>
        </button> -->

        <!-- <div v-if="wishList"
            class="wishlist_popup w-80 md:w-96 absolute z-50 top-full right-0 sm:right-20 xl:right-11 bg-white dark:bg-title py-5 md:py-[30px] pl-5 md:pl-[30px] pr-[10px] md:pr-[15px] border border-primary">
            <h4 class="font-medium leading-none dark:text-white mb-4 text-xl md:text-2xl">Wishlist</h4>
            <div>
                <div class="pr-4 md:pr-5 wishlist-item">
                    <router-link to="/product-details"
                        class="flex items-center gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <img class="w-[70px] md:w-auto" :src="w1" alt="wishlist" />
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">Sofa</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">$65.90</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold leading-none mt-3">Modern Sofa Set</h6>
                        </div>
                        <div
                            class="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group duration-300 hover:bg-primary dark:hover:bg-primary">
                            <svg class="fill-current text-title dark:text-white duration-300 group-hover:text-white"
                                width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.636719 1.56306L1.56306 0.636719L4.98839 4.06204L8.41371 0.636719L9.31851 1.54152L5.89319 4.96685L9.3616 8.43526L8.43526 9.3616L4.96685 5.89319L1.54152 9.31851L0.636719 8.41371L4.06204 4.98839L0.636719 1.56306Z" />
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/product-details"
                        class="flex items-center gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <img class="w-[70px] md:w-auto" :src="w2" alt="wishlist" />
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">Interior</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">$99.90</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold leading-none mt-3">Classic Chair with Vase
                            </h6>
                        </div>
                        <div
                            class="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group duration-300 hover:bg-primary dark:hover:bg-primary">
                            <svg class="fill-current text-title dark:text-white duration-300 group-hover:text-white"
                                width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.636719 1.56306L1.56306 0.636719L4.98839 4.06204L8.41371 0.636719L9.31851 1.54152L5.89319 4.96685L9.3616 8.43526L8.43526 9.3616L4.96685 5.89319L1.54152 9.31851L0.636719 8.41371L4.06204 4.98839L0.636719 1.56306Z" />
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/product-details"
                        class="flex items-center gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <img class="w-[70px] md:w-auto" :src="w3" alt="wishlist" />
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">Lamp</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">$30.90</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold leading-none mt-3">Luxury Hanging Lamp</h6>
                        </div>
                        <div
                            class="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group duration-300 hover:bg-primary dark:hover:bg-primary">
                            <svg class="fill-current text-title dark:text-white duration-300 group-hover:text-white"
                                width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.636719 1.56306L1.56306 0.636719L4.98839 4.06204L8.41371 0.636719L9.31851 1.54152L5.89319 4.96685L9.3616 8.43526L8.43526 9.3616L4.96685 5.89319L1.54152 9.31851L0.636719 8.41371L4.06204 4.98839L0.636719 1.56306Z" />
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/product-details"
                        class="flex items-center gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <img class="w-[70px] md:w-auto" :src="w4" alt="wishlist" />
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">Vase</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">$56.90</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold leading-none mt-3">Premium Quality Vase</h6>
                        </div>
                        <div
                            class="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group duration-300 hover:bg-primary dark:hover:bg-primary">
                            <svg class="fill-current text-title dark:text-white duration-300 group-hover:text-white"
                                width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.636719 1.56306L1.56306 0.636719L4.98839 4.06204L8.41371 0.636719L9.31851 1.54152L5.89319 4.96685L9.3616 8.43526L8.43526 9.3616L4.96685 5.89319L1.54152 9.31851L0.636719 8.41371L4.06204 4.98839L0.636719 1.56306Z" />
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/product-details"
                        class="flex items-center gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <img class="w-[70px] md:w-auto" :src="w5" alt="wishlist" />
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">Chair</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">$50.00</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold leading-none mt-3">Classic White Chair</h6>
                        </div>
                        <div
                            class="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group duration-300 hover:bg-primary dark:hover:bg-primary">
                            <svg class="fill-current text-title dark:text-white duration-300 group-hover:text-white"
                                width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.636719 1.56306L1.56306 0.636719L4.98839 4.06204L8.41371 0.636719L9.31851 1.54152L5.89319 4.96685L9.3616 8.43526L8.43526 9.3616L4.96685 5.89319L1.54152 9.31851L0.636719 8.41371L4.06204 4.98839L0.636719 1.56306Z" />
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/product-details"
                        class="flex items-center gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <img class="w-[70px] md:w-auto" :src="w1" alt="wishlist" />
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">Sofa</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">$30.50</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold leading-none mt-3">Modern Sofa Set</h6>
                        </div>
                        <div
                            class="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group duration-300 hover:bg-primary dark:hover:bg-primary">
                            <svg class="fill-current text-title dark:text-white duration-300 group-hover:text-white"
                                width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.636719 1.56306L1.56306 0.636719L4.98839 4.06204L8.41371 0.636719L9.31851 1.54152L5.89319 4.96685L9.3616 8.43526L8.43526 9.3616L4.96685 5.89319L1.54152 9.31851L0.636719 8.41371L4.06204 4.98839L0.636719 1.56306Z" />
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/product-details"
                        class="flex items-center gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <img class="w-[70px] md:w-auto" :src="w2" alt="wishlist" />
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">Vase</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">$30.00</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold leading-none mt-3">Classic Chair with Vase
                            </h6>
                        </div>
                        <div
                            class="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group duration-300 hover:bg-primary dark:hover:bg-primary">
                            <svg class="fill-current text-title dark:text-white duration-300 group-hover:text-white"
                                width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.636719 1.56306L1.56306 0.636719L4.98839 4.06204L8.41371 0.636719L9.31851 1.54152L5.89319 4.96685L9.3616 8.43526L8.43526 9.3616L4.96685 5.89319L1.54152 9.31851L0.636719 8.41371L4.06204 4.98839L0.636719 1.56306Z" />
                            </svg>
                        </div>
                    </router-link>
                    <router-link to="/product-details"
                        class="flex items-center gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk">
                        <img class="w-[70px] md:w-auto" :src="w3" alt="wishlist" />
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">Lamp</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">$120.00</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold leading-none mt-3">Luxury Hanging Lamp</h6>
                        </div>
                        <div
                            class="wishList_item_close absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-title dark:bg-white bg-opacity-10 dark:bg-opacity-10 group duration-300 hover:bg-primary dark:hover:bg-primary">
                            <svg class="fill-current text-title dark:text-white duration-300 group-hover:text-white"
                                width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.636719 1.56306L1.56306 0.636719L4.98839 4.06204L8.41371 0.636719L9.31851 1.54152L5.89319 4.96685L9.3616 8.43526L8.43526 9.3616L4.96685 5.89319L1.54152 9.31851L0.636719 8.41371L4.06204 4.98839L0.636719 1.56306Z" />
                            </svg>
                        </div>
                    </router-link>
                </div>
                <div class="mt-6 md:mt-10">
                    <router-link to="/wishlist" class="btn btn-outline btn-sm w-full" data-text="View All Wishlist">
                        <span>View All Wishlist</span>
                    </router-link>
                </div>
            </div>

        </div> -->


        <button class="relative hdr_cart_btn" @click="cartList = !cartList">
            <span
                class="absolute w-[22px] h-[22px] bg-secondary top-[0px] -right-[11px] rounded-full flex items-center justify-center text-xs leading-none text-white">22</span>
            <span class="mdi mdi-shopping-outline text-3xl dark:text-white text-[24px] sm:text-[28px]"></span>
        </button>


        <div v-if="cartList"
            class="hdr_cart_popup w-80 md:w-96 absolute z-50 top-full right-0 sm:right-10 xl:right-0 bg-white dark:bg-title p-5 md:p-[30px] border border-primary">
            <h4 class="font-medium leading-none mb-4 text-xl md:text-2xl">Cart List</h4>
            <div>
                <div class="hdr-cart-item">
                    <div v-for="item in getUserCartItems" :key="item.id"
                        class="flex gap-[15px] relative pb-[15px] mb-[15px] border-b border-bdr-clr dark:border-bdr-clr-drk group">
                        <router-link to="/product-details" class="block">
                            <img class="w-16 h-16 object-cover rounded" :src="(() => {
                                const product = products.find(product => product && product.id === item.productId)
                                return product ? `${baseUrl}/storage/${product.images[0].url_image}` : '/images/default-product.jpg'
                            })()" alt="cart" />
                        </router-link>
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[14px] md:text-[15px] leading-none block">{{

                                    (() => {
                                        const product = products.find(product => product && product.id ===
                                            item.productId)
                                        return product ? product.name : 'Producto no encontrado'
                                    })()
                                }}</span>
                                <span class="w-[6px] h-[6px] rounded-full bg-primary"></span>
                                <span class="text-[14px] md:text-[15px] leading-none block">${{ item.price }}</span>
                            </div>
                            <h6 class="text-base md:text-lg font-semibold !leading-none mt-[10px]">
                                <router-link to="/product-details">{{
                                    (() => {
                                        const product = products.find(product => product && product.id
                                            ===
                                            item.productId)
                                        return product ? product.description : 'Producto no encontrado'
                                    })()
                                }}</router-link>
                            </h6>
                            <IncrementDecrement :initialCount="item.quantity"
                                @update:count="newCount => handleCountUpdate(newCount, item.cartItemId)" />
                        </div>
                    </div>

                </div>
                <div class="pt-5 md:pt-[30px] mt-5 md:mt-[30px] border-t border-bdr-clr dark:border-bdr-clr-drk">
                    <h4 class="mb-5 md:mb-[30px] font-medium !leading-none text-lg md:text-xl text-right">Subtotal :
                        $870</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <router-link to="/cart" class="btn btn-outline btn-sm" data-text="View Cart">
                            <span>View Cart</span>
                        </router-link>
                        <router-link to="/checkout" class="btn btn-theme-solid btn-sm" data-text="Checkout">
                            <span>Checkout</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <button class="hamburger" :class="toggle ? 'opened' : ''" @click="handleToggle">
            <svg class="stroke-current text-title dark:text-white" width="40" viewBox="0 0 100 100">
                <path class="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                <path class="line line2" d="M 20,50 H 80" />
                <path class="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>
        </button>
        <router-link aria-label="" to="/client/my-profile">
            <i class="mdi mdi-account text-3xl dark:text-white text-[24px] sm:text-[28px]"></i>
        </router-link>

        <div class="w-[1px] bg-title/20 dark:bg-white/20 h-7 hidden sm:block"></div>

        <SwitcherS />



    </div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useAuthStore } from '@/modules/auth/stores/auth';


const wishList = ref(false)
const cartList = ref(false);

import SwitcherS from './Switcher-s.vue'

const emit = defineEmits(['toggle-change']);

const props = defineProps({
    toggle: Boolean,
});

function handleToggle() {
    emit('toggle-change', !props.toggle);
}


const auth = useAuthStore()


import { useQueries } from '@tanstack/vue-query'
import { fetchProductByIdAction } from '@/modules/products/actions/fetch-products.action'
import Aos from 'aos'
import IncrementDecrement from '@/modules/products/components/IncrementDecrement.vue';

const CART_KEY = 'cart'
const authStore = useAuthStore()
const userCartItems = ref<any[]>([])
const baseUrl = import.meta.env.VITE_BACKEND_URL;

authStore.initAuthFromStorage()

onMounted(() => {
    Aos.init()
    const storedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    userCartItems.value = storedCart.filter((item: any) => item.userId === authStore.user?.id)
})


// 🔄 Obtener productos del carrito del usuario autenticado
const getUserCartItems = computed(() => {
    return userCartItems.value
})


const productIds = computed(() => {
    return [...new Set(getUserCartItems.value.map(item => item.productId))]
})


// ✅ Lanzar múltiples consultas en paralelo con useQueries
const productQueries = useQueries({
    queries: computed(() =>
        productIds.value.map(id => ({
            queryKey: ['product', id],
            queryFn: () => fetchProductByIdAction(String(id)).then(res => res.data),
            enabled: !!authStore.user && !!id,
            staleTime: 1000 * 60 * 5,
        }))
    )
})

// 📦 Productos cargados exitosamente
const products = computed(() =>
    productQueries.value
        .map(q => q.data)
        .filter(Boolean) // elimina `undefined`
)

console.log(products.value);


// 🔄 Estado de carga global (si alguna query está cargando)
const loading = computed(() =>
    productQueries.value.some(q => q.isLoading)
)

const handleCountUpdate = (newCount: number, cartItemId: string) => {

    /*  if (newCount <= 1) return */

    console.log('Nuevo valor:', newCount)

    const storedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')

    const updatedCart = storedCart.map((item: any) => {
        if (item.cartItemId === cartItemId) {
            return {
                ...item,
                quantity: newCount
            }
        }
        return item
    })

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart))

    // ⚠️ Solo actualiza los del usuario actual
    userCartItems.value = updatedCart.filter((item: any) => item.userId === authStore.user?.id)
}


</script>

<style lang="scss" scoped></style>
