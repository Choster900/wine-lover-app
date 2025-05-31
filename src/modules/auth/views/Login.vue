<template>
    <div>
        <Navbar />

        <div class="flex">
            <div class="w-1/2 hidden md:block lg:flex-1">
                <img class="h-full object-cover" :src="loginImg" alt="login">
            </div>
            <div
                class="w-full md:w-1/2 lg:max-w-lg xl:max-w-3xl lg:w-full py-16 px-[20px] sm:px-8 lg:p-16 xl:p-24 relative z-10 flex items-center overflow-hidden">
                <div class="mx-auto md:mx-0 max-w-md">
                    <h2 class="leading-none" data-aos="fade-up">Bienvenido de nuevo!</h2>
                    <p class="text-lg mt-[15px]" data-aos="fade-up" data-aos-delay="100">Compra y disfruta productos exclusivos solo en Club Amantes del Vino y Licores</p>
                    <div class="mt-7" data-aos="fade-up" data-aos-delay="200">
                        <label
                            class="text-base sm:text-lg font-medium leading-none mb-2.5 block dark:text-white">Email</label>
                        <input v-model="email"
                            class="w-full h-12 md:h-14 bg-white dark:bg-transparent border border-bdr-clr focus:border-primary p-4 outline-none duration-300"
                            type="email" placeholder="Ingresa tu dirección de correo" required>
                    </div>
                    <div class="mt-5" data-aos="fade-up" data-aos-delay="300">
                        <label
                            class="text-base sm:text-lg font-medium leading-none mb-2.5 block dark:text-white">Password</label>
                        <input v-model="password"
                            class="w-full h-12 md:h-14 bg-white dark:bg-transparent border border-bdr-clr focus:border-primary p-4 outline-none duration-300 placeholder:text-xl placeholder:transform placeholder:translate-y-[10px]"
                            type="password" placeholder="* * * * * * * *" required>
                    </div>
                    <div class="mt-7" data-aos="fade-up" data-aos-delay="400">
                        <label class="flex items-center gap-2 iam-agree">
                            <input class="appearance-none hidden" type="checkbox" name="categories">
                            <span
                                class="w-[18px] h-[18px] rounded-[5px] border-2 border-title dark:border-white flex items-center justify-center duration-300">
                                <svg class="duration-300 opacity-0 fill-current text-title dark:text-white" width="9"
                                    height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.05203 7.04122C2.87283 7.04122 2.69433 6.97322 2.5562 6.83864L0.532492 4.8553C0.253409 4.58189 0.249159 4.13351 0.522576 3.85372C0.796701 3.57393 1.24578 3.57039 1.52416 3.84309L3.05203 5.34122L7.61512 0.868804C7.89491 0.595387 8.34328 0.59822 8.6167 0.87872C8.89082 1.1578 8.88657 1.60689 8.60749 1.8803L3.54787 6.83864C3.40974 6.97322 3.23124 7.04122 3.05203 7.04122Z" />
                                </svg>
                            </span>
                            <span
                                class="text-base sm:text-lg text-title dark:text-white leading-none sm:leading-none select-none inline-block transform translate-y-[3px]">Recordarme</span>
                        </label>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="500">
                        <button @click="login" class="btn btn-theme-solid mt-[15px]" data-text="Login">
                            <span>Login</span>
                        </button>
                    </div>
                    <p class="text-lg mt-[15px]" data-aos="fade-up" data-aos-delay="600">No tienes cuenta?
                        <router-link to="/auth/register"
                            class="text-primary font-medium ml-1 inline-block">Registrate</router-link>
                    </p>
                </div>
            </div>
        </div>

        <FooterOne />

        <ScrollToTop />
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/modules/common/components/Navbar.vue';
import loginImg from '@/assets/images/bg/login.jpg'
import { onMounted, ref } from 'vue';
import Aos from 'aos';
import FooterOne from '@/modules/common/components/FooterOne.vue';
import ScrollToTop from '@/modules/common/components/ScrollToTop.vue';
import { loginAction } from '../actions/login.action';
import { useRouter } from 'vue-router';

onMounted(() => {
    Aos.init()
})

const email = ref('')
const password = ref('')
const router = useRouter()


const login = async () => {
    try {
        if (email.value && password.value) {
            await loginAction(email.value, password.value)
            router.push('/')
        }
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : String(error);
        alert('Login failed: ' + errorMessage)
    }
}
</script>
