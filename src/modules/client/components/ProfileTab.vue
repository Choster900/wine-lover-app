<template>
    <ul
        class="divide-y dark:divide-paragraph text-title dark:text-white text-base sm:text-lg lg:text-xl flex flex-col justify-center leading-none">
        <li class="py-3 lg:py-6 pl-6 lg:pl-12">
            <router-link class="duration-300 hover:text-primary" to="/client/my-profile">Perfil</router-link>
        </li>
        <li class="py-3 lg:py-6 pl-6 lg:pl-12">
            <router-link class="duration-300 hover:text-primary" to="/client/membership">Membresia</router-link>
        </li>
        <li class="py-3 lg:py-6 pl-6 lg:pl-12">
            <router-link class="duration-300 hover:text-primary" to="/client/address">Direcciones</router-link>
        </li>
        <li class="py-3 lg:py-6 pl-6 lg:pl-12">
            <router-link class="duration-300 hover:text-primary" to="/client/method-payment">Metodos de Pago</router-link>
        </li>
        <li class="py-3 lg:py-6 pl-6 lg:pl-12">
            <router-link class="duration-300 hover:text-primary" to="/client/order-history">Mis ordenes</router-link>
        </li>
        <li class="py-3 lg:py-6 pl-6 lg:pl-12">
            <router-link class="duration-300 hover:text-primary" to="/client/cashback-history">Historial de cashback</router-link>
        </li>
        <li class="pt-3 lg:pt-6 pl-6 lg:pl-12">
            <button @click="logout" class="duration-300 hover:text-primary">Logout</button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth';
import { useRouter } from 'vue-router';


const router = useRouter();

function logout() {
    const authStore = useAuthStore()
    authStore.logout()
    
    router.push('/')
}

</script>
