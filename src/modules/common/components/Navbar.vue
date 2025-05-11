<template>
    <div class="header-area default-header relative z-50 bg-white dark:bg-title" :class="scroll ? 'sticky-header' : ''">
        <div class="container-fluid">
            <div
                class="flex items-center justify-between gap-x-6 max-w-[1720px] mx-auto relative py-[10px] sm:py-4 lg:py-0">
                <router-link class="cursor-pointer block" to="/" aria-label="Furnixar">
                    <img :src="logoDark" alt="" class='dark:hidden w-[120px] sm:w-[200px]' />
                    <img :src="logoLight" alt="" class='dark:block hidden w-[120px] sm:w-[200px]' />
                </router-link>
                <div class="main-menu absolute z-50 w-full lg:w-auto top-full left-0 lg:static bg-white dark:bg-title lg:bg-transparent lg:dark:bg-transparent px-5 sm:px-[30px] py-[10px] sm:py-5 lg:px-0 lg:py-0"
                    :class="toggle ? 'active' : ''">

                    <ul class="text-lg leading-none text-title dark:text-white lg:flex lg:gap-[30px]">
                        <li class="relative"
                            :class="['/', '/index-v2', '/index-v3', '/index-v4', '/index-v5', '/index-v6'].includes(current) ? 'active' : ''">
                            <router-link to="#">Home<span></span></router-link>
                            <ul
                                class="sub-menu lg:absolute z-50 lg:top-full lg:left-0 lg:min-w-[220px] lg:invisible lg:transition-all lg:bg-white lg:dark:bg-title lg:py-[15px] lg:pr-[30px]">

                                <li :class="current === '/index-v6' ? 'active' : ''"><router-link to="/index-v6"
                                        class="menu-item">Home
                                        Retro - currently</router-link></li>
                            </ul>
                        </li>

                        <li
                            :class="['/about', '/pricing', '/team', '/our-clients', '/faq', '/terms-and-conditions', '/portfolio-v1', '/portfolio-v2', '/portfolio-v3', '/portfolio-details-v1', '/portfolio-details-v2', '/error', '/my-profile', '/login', '/register', '/forger-password', '/coming-soon', '/thank-you', '/shipping-method', '/payment-method', '/invoice', '/payment-confirmation', '/payment-success', '/payment-failure'].includes(current) ? 'active' : ''">
                            <router-link to="#">Pages<span></span></router-link>
                            <div
                                class="mega-menu lg:absolute z-50 lg:top-full lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:max-w-[1100px] lg:w-full lg:bg-white lg:dark:bg-title lg:px-[30px] lg:py-[15px] lg:flex lg:items-start lg:justify-between gap-[30px] lg:invisible lg:transition-all lg:duration-300">
                                <div class="lg:grid lg:grid-cols-4 lg:items-start gap-x-5 2xl:gap-x-[25px] lg:flex-1">
                                    <div class="megamenu-item">
                                        <ul>
                                            <li :class="current === '/about' ? 'active' : ''"><router-link
                                                    to="/about">About Us</router-link></li>
                                            <li :class="current === '/pricing' ? 'active' : ''"><router-link
                                                    to="/pricing">Price Plan</router-link></li>
                                            <li :class="current === '/team' ? 'active' : ''"><router-link
                                                    to="/team">Team Member</router-link></li>
                                            <li :class="current === '/our-clients' ? 'active' : ''"><router-link
                                                    to="/our-clients">Clients</router-link></li>
                                            <li :class="current === '/faq' ? 'active' : ''"><router-link
                                                    to="/faq">FAQs</router-link></li>
                                            <li :class="current === '/terms-and-conditions' ? 'active' : ''">
                                                <router-link to="/terms-and-conditions">Terms & conditions</router-link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="megamenu-item">
                                        <ul>
                                            <li :class="current === '/portfolio-v1' ? 'active' : ''"><router-link
                                                    to="/portfolio-v1">Portolfio 1</router-link></li>
                                            <li :class="current === '/portfolio-v2' ? 'active' : ''"><router-link
                                                    to="/portfolio-v2">Portolfio 2</router-link></li>
                                            <li :class="current === '/portfolio-v3' ? 'active' : ''"><router-link
                                                    to="/portfolio-v3">Portolfio 3</router-link></li>
                                            <li :class="current === '/portfolio-details-v1' ? 'active' : ''">
                                                <router-link to="/portfolio-details-v1">Portolfio details
                                                    1</router-link>
                                            </li>
                                            <li :class="current === '/portfolio-details-v2' ? 'active' : ''">
                                                <router-link to="/portfolio-details-v2">Portolfio details
                                                    2</router-link>
                                            </li>
                                            <li :class="current === '/error' ? 'active' : ''"><router-link
                                                    to="/error">404 Error</router-link></li>
                                        </ul>
                                    </div>
                                    <div class="megamenu-item">
                                        <ul>
                                            <li :class="current === '/my-profile' ? 'active' : ''"><router-link
                                                    to="/my-profile">My Profile</router-link></li>
                                            <li :class="current === '/login' ? 'active' : ''"><router-link
                                                    to="/login">Login</router-link></li>
                                            <li :class="current === '/register' ? 'active' : ''"><router-link
                                                    to="/register">Register</router-link></li>
                                            <li :class="current === '/forger-password' ? 'active' : ''"><router-link
                                                    to="/forger-password">Forget Password</router-link></li>
                                            <li :class="current === '/coming-soon' ? 'active' : ''"><router-link
                                                    to="/coming-soon">Coming Soon</router-link></li>
                                            <li :class="current === '/thank-you' ? 'active' : ''"><router-link
                                                    to="/thank-you">Thank you</router-link></li>
                                        </ul>
                                    </div>
                                    <div class="megamenu-item">
                                        <ul>
                                            <li :class="current === '/shipping-method' ? 'active' : ''"><router-link
                                                    to="/shipping-method">Shipping Method</router-link></li>
                                            <li :class="current === '/payment-method' ? 'active' : ''"><router-link
                                                    to="/payment-method">Payment Method</router-link></li>
                                            <li :class="current === '/invoice' ? 'active' : ''"><router-link
                                                    to="/invoice">Invoice</router-link></li>
                                            <li :class="current === '/payment-confirmation' ? 'active' : ''">
                                                <router-link to="/payment-confirmation">Payment
                                                    Confirmation</router-link>
                                            </li>
                                            <li :class="current === '/payment-success' ? 'active' : ''"><router-link
                                                    to="/payment-success">Payment Completed</router-link></li>
                                            <li :class="current === '/payment-failure' ? 'active' : ''"><router-link
                                                    to="/payment-failure">Payment Failure</router-link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="lg:py-[15px] lg:max-w-[280px] w-full hidden lg:block">
                                    <router-link to="shop-v1.html">
                                        <img :src="add" alt="mega-menu-add" />
                                    </router-link>
                                </div>
                            </div>
                        </li>
                        <li class="relative"
                            :class="['/shop-v1', '/shop-v2', '/shop-v3', '/shop-v4', '/product-details', '/cart', '/checkout'].includes(current) ? 'active' : ''">
                            <router-link to="#">Shop<span></span></router-link>
                            <ul
                                class="sub-menu lg:absolute z-50 lg:top-full lg:left-0 lg:min-w-[220px] lg:invisible lg:transition-all lg:bg-white lg:dark:bg-title lg:py-[15px] lg:pr-[30px]">
                                <li :class="current === '/shop-v1' ? 'active' : ''"><router-link to="/shop-v1">Shop
                                        Layout 01</router-link></li>
                                <li :class="current === '/shop-v2' ? 'active' : ''"><router-link to="/shop-v2">Shop
                                        Layout 02</router-link></li>
                                <li :class="current === '/shop-v3' ? 'active' : ''"><router-link to="/shop-v3">Shop
                                        Layout 03</router-link></li>
                                <li :class="current === '/shop-v4' ? 'active' : ''"><router-link to="/shop-v4">Shop
                                        Layout 04</router-link></li>
                                <li :class="current === '/product-details' ? 'active' : ''"><router-link
                                        to="/product-details">Product Details</router-link></li>
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
                        <li :class="current === '/login' ? 'active' : ''" class="lg:hidden"><router-link
                                to="/login">Login</router-link></li>
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


import logoDark from '@/assets/images/svg/logo.svg'
import logoLight from '@/assets/images/svg/logo-light.svg'
import add from '@/assets/images/thumb/add.png'

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
