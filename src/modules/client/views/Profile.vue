<template>

    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Mi Perfil</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li class="text-primary">Perfil</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100" data-aos="fade-up">
        <div class="container-fluid">
            <div
                class="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                <div class="w-full md:w-[200px] lg:w-[300px] flex-none">
                    <ProfileTab />
                </div>
                <div class="w-full md:w-auto md:flex-1 overflow-auto">

                    <div class="w-full max-w-[951px] bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-8 lg:p-[50px]">
                        <div>
                            <h3 class="font-semibold leading-none">{{ authStore.user!.client.names + authStore.user!.client.surnames }}</h3>
                            <span class="leading-none mt-3">{{ authStore.user!.client.identity_number }}</span>
                        </div>
                        <div class="mt-5 sm:mt-8 md:mt-10 grid gap-4 sm:gap-6">
                            <router-link to="#" class="flex items-center gap-2">
                                <i class="fa-solid fa-phone text-[#BB976D]"></i>
                                <span class="leading-none font-medium text-base sm:text-lg">+503 {{ authStore.user!.client.phone }}</span>
                            </router-link>
                            <router-link to="#" class="flex items-center gap-2">
                                <i class="fa-solid fa-envelope text-[#BB976D]"></i>
                                <span class="leading-none font-medium text-base sm:text-lg">{{ authStore.user!.email }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth';
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import { onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import Aos from 'aos';
import ProfileTab from '../components/ProfileTab.vue';

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
    Aos.init()
})

onBeforeMount(() => {
  if (!authStore.user) {
    router.push('/') // o a '/login' si es más adecuado
  }
})

</script>
