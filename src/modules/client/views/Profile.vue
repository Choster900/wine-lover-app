<template>
    <!--   <div> -->
    <!--  <Navbar /> -->

    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">My Profile</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Home</router-link></li>
                <li>/</li>
                <li class="text-primary">Profile</li>
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
                            <h3 class="font-semibold leading-none">Kathlene Roser</h3>
                            <span class="leading-none mt-3">Product Designer</span>
                        </div>
                        <p class="text-base sm:text-lg mt-5 sm:mt-8 md:mt-10 text-justify">
                            All the Lorem Ipsum generators on the Internet tend to repeat predefined on the
                            Internet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, lobortis in in
                            tortor lectus iaculis viverra. Adipiscing lobortis interdum fringilla euismod odio vitae
                            nam pulvinar elementum. Nibh purus integer elementum in. Tellus vulputate habitasse ut
                            vulputate posuere habitant vel tempor varius.
                        </p>
                        <div class="mt-5 sm:mt-8 md:mt-10 grid gap-4 sm:gap-6">
                            <router-link to="#" class="flex items-center gap-2">
                                <i class="fa-solid fa-phone text-[#BB976D]"></i>
                                <span class="leading-none font-medium text-base sm:text-lg">+111 - (1234 5678
                                    99)</span>
                            </router-link>
                            <router-link to="#" class="flex items-center gap-2">
                                <i class="fa-solid fa-envelope text-[#BB976D]"></i>
                                <span class="leading-none font-medium text-base sm:text-lg">furnixar123@gmail.com</span>
                            </router-link>
                            <router-link to="#" class="flex items-center gap-2">
                                <i class="fa-solid fa-location-dot text-[#BB976D]"></i>
                                <span class="leading-none font-medium text-base sm:text-lg">23/ A Lake Side , New
                                    Arizona , USA</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <FooterOne />

        <ScrollToTop />
    </div> -->
</template>

<script setup lang="ts">
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import { onMounted, ref } from 'vue';
import Aos from 'aos';
import ProfileTab from '../components/ProfileTab.vue';

onMounted(() => {
    Aos.init()
})




</script>
