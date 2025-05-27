<template>
    <div class="header-area default-header relative z-50 bg-white dark:bg-title" :class="scroll ? 'sticky-header' : ''">
        <div class="container-fluid">
            <div
                class="flex items-center justify-between gap-x-6 max-w-[1720px] mx-auto relative py-[10px] sm:py-4 lg:py-0">
                <router-link class="cursor-pointer block p-2" to="/" aria-label="Furnixar">
                    <img :src="logoDark" alt="" class='dark:hidden w-[100px] rounded-xl' />
                    <img :src="logoLight" alt="" class='dark:block hidden w-[100px] rounded-xl' />
                </router-link>
                <div class="main-menu absolute z-50 w-full lg:w-auto top-full left-0 lg:static bg-white dark:bg-title lg:bg-transparent lg:dark:bg-transparent px-5 sm:px-[30px] py-[10px] sm:py-5 lg:px-0 lg:py-0"
                    :class="toggle ? 'active' : ''">

                    <ul class="text-lg leading-none text-title dark:text-white lg:flex lg:gap-[30px]">
                        <li :class="current === '/' ? 'active' : ''"><router-link to="/">Home</router-link></li>
                        <li :class="current === '/membership' ? 'active' : ''"><router-link to="/membership">Pricing</router-link></li>
                        <li :class="current === '/products' ? 'active' : ''">
                            <router-link to="/products">Product</router-link>
                        </li>
                        <li class="relative"
                            :class="['/shop-v1', '/shop-v2', '/shop-v3', '/shop-v4', '/product-details', '/cart', '/checkout'].includes(current) ? 'active' : ''">
                            <router-link to="#">Shop<span></span></router-link>
                            <ul
                                class="sub-menu lg:absolute z-50 lg:top-full lg:left-0 lg:min-w-[220px] lg:invisible lg:transition-all lg:bg-white lg:dark:bg-title lg:py-[15px] lg:pr-[30px]">
                                <li :class="current === '/cart' ? 'active' : ''"><router-link to="/cart">My
                                        Cart</router-link></li>
                                <li :class="current === '/checkout' ? 'active' : ''"><router-link
                                        to="/checkout">Checkout</router-link></li>
                            </ul>
                        </li>
                        <li class="relative"
                            :class="['/blog-v1', '/blog-v2', '/blog-details-v1', '/blog-details-v2', '/blog-details-v3', '/blog-tag'].includes(current) ? 'active' : ''">
                            <router-link to="#">Blog<span></span></router-link>
                            <ul
                                class="sub-menu lg:absolute z-50 lg:top-full lg:left-0 lg:min-w-[220px] lg:invisible lg:transition-all lg:bg-white lg:dark:bg-title lg:py-[15px] lg:pr-[30px]">
                                <li :class="current === '/blog-v1' ? 'active' : ''"><router-link to="/blog-v1">Blog
                                        Layout 1</router-link></li>
                                <li :class="current === '/blog-v2' ? 'active' : ''"><router-link to="/blog-v2">Blog
                                        Layout 2</router-link></li>
                                <li :class="current === '/blog-details-v1' ? 'active' : ''"><router-link
                                        to="/blog-details-v1">Blog Details 1</router-link></li>
                                <li :class="current === '/blog-details-v2' ? 'active' : ''"><router-link
                                        to="/blog-details-v2">Blog Details 2</router-link></li>
                                <li :class="current === '/blog-details-v3' ? 'active' : ''"><router-link
                                        to="/blog-details-v3">Blog Details 3</router-link></li>
                                <li :class="current === '/blog-tag' ? 'active' : ''"><router-link to="/blog-tag">Blog
                                        Tag</router-link></li>
                            </ul>
                        </li>
                        <li :class="current === '/contact' ? 'active' : ''"><router-link
                                to="/contact">Contact</router-link></li>
                        <li :class="current === '/auth/login' ? 'active' : ''" class=" lg:hidden"><router-link
                                to="/auth/login">Login</router-link></li>
                    </ul>
                </div>


                <NavMenu :toggle="toggle" @toggle-change="toggle = $event" />

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavMenu from './NavMenu.vue';
import { useRoute } from 'vue-router';


import logoDark from '@/assets/images/logo/wine-lovers.png'
import logoLight from '@/assets/images/logo/wine-lovers.png'

const scroll = ref(false)
const toggle = ref(false);



const router = useRoute();
const current = ref(router.path);


const handleScroll = () => {
    if (window.scrollY >= 50) {
        scroll.value = true
    } else {
        scroll.value = false
    }
}

onMounted(() => {
    window.scrollTo(0, 0)
    window.addEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped></style>
