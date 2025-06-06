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
                        <li :class="current === '/' ? 'active' : ''"><router-link to="/">Inicio</router-link></li>
                        <li :class="current === '/membership' ? 'active' : ''"><router-link to="/membership">Planes</router-link></li>
                        <li :class="current === '/products' ? 'active' : ''">
                            <router-link to="/products">Productos</router-link>
                        </li>
                        <li class="relative"
                            :class="['/cart', '/cart/checkout'].includes(current) ? 'active' : ''">
                            <router-link to="#">Compras<span></span></router-link>
                            <ul
                                class="sub-menu lg:absolute z-50 lg:top-full lg:left-0 lg:min-w-[220px] lg:invisible lg:transition-all lg:bg-white lg:dark:bg-title lg:py-[15px] lg:pr-[30px]">
                                <li :class="current === '/cart' ? 'active' : ''"><router-link to="/cart">Mi Carrito</router-link></li>
                                <li :class="current === '/cart/checkout' ? 'active' : ''"><router-link
                                        to="/cart/checkout">Checkout</router-link></li>
                            </ul>
                        </li>
                        <li :class="current === '/reviews' ? 'active' : ''">
                            <router-link to="/reviews">Blog</router-link>
                        </li>
                        <li :class="current === '/contact' ? 'active' : ''"><router-link
                                to="/contact">Contacto</router-link></li>
                        <li :class="current === '/auth/login' ? 'active' : ''" class=" lg:hidden"><router-link
                                to="/auth/login">Login</router-link></li>
                        <li :class="current === '/auth/register' ? 'active' : ''" class=" lg:hidden"><router-link
                                to="/auth/register">Registro</router-link></li>
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
