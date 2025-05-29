<template>
    <div class="flex items-center gap-4 sm:gap-6">
        <router-link v-if="!auth.user" to="/auth/login"
            class="text-lg leading-none text-title dark:text-white transition-all duration-300 hover:text-primary hidden lg:block">
            Login
        </router-link>
        <router-link v-if="!auth.user" to="/auth/register"
            class="text-lg leading-none text-title dark:text-white transition-all duration-300 hover:text-primary hidden lg:block">
            Registro
        </router-link>

        <!-- <button class="relative hdr_cart_btn" @click="cartList = !cartList">
            <span
                class="absolute w-[22px] h-[22px] bg-secondary top-[0px] -right-[11px] rounded-full flex items-center justify-center text-xs leading-none text-white">22</span>
            <span class="mdi mdi-shopping-outline text-3xl dark:text-white text-[24px] sm:text-[28px]"></span>
        </button> -->


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
        <router-link v-if="auth.user" aria-label="" to="/client/my-profile">
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

</script>

<style lang="scss" scoped></style>
