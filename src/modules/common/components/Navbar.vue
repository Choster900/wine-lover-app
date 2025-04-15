<template>
  <div class="header-area default-header relative z-50 bg-white dark:bg-title" :class="scroll ? 'sticky-header' : ''">
    <div class="container-fluid">
      <div class="flex items-center justify-between gap-x-6 max-w-[1720px] mx-auto relative py-[10px] sm:py-4 lg:py-0">
        <router-link class="cursor-pointer block" to="/" aria-label="Furnixar">
          <img :src="logoDark" alt="" class='dark:hidden w-[120px] sm:w-[200px]' />
          <img :src="logoLight" alt="" class='dark:block hidden w-[120px] sm:w-[200px]' />
        </router-link>
        <div
          class="main-menu absolute z-50 w-full lg:w-auto top-full left-0 lg:static bg-white dark:bg-title lg:bg-transparent lg:dark:bg-transparent px-5 sm:px-[30px] py-[10px] sm:py-5 lg:px-0 lg:py-0"
          :class="toggle ? 'active' : ''">

          <ul class="text-lg leading-none text-title dark:text-white lg:flex lg:gap-[30px]">
            <li class="relative"
              :class="['/', '/index-v2', '/index-v3', '/index-v4', '/index-v5', '/index-v6'].includes(current) ? 'active' : ''">
              <router-link to="#">Home<span></span></router-link>
              <ul
                class="sub-menu lg:absolute z-50 lg:top-full lg:left-0 lg:min-w-[220px] lg:invisible lg:transition-all lg:bg-white lg:dark:bg-title lg:py-[15px] lg:pr-[30px]">

                <li :class="current === '/index-v6' ? 'active' : ''"><router-link to="/index-v6" class="menu-item">Home
                    Retro - currently</router-link></li>
              </ul>
            </li>
          </ul>
        </div>


        <NavMenu :toggle="toggle" @toggle-change="toggle = $event" />

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import NavMenu from './NavMenu.vue';
import { useRoute } from 'vue-router';

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
