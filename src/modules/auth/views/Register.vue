<template>
    <div>
        <Navbar />

        <div class="flex">
            <div class="w-1/2 hidden md:block lg:flex-1">
                <img class="h-full object-cover" :src="register" alt="register" />
            </div>

            <div
                class="w-full md:w-1/2 lg:max-w-lg xl:max-w-3xl lg:w-full py-16 px-[20px] sm:px-8 lg:p-16 xl:p-24 relative z-10 flex items-center overflow-hidden">
                <form @submit.prevent="registerUser" class="mx-auto md:mx-0 max-w-md w-full">
                    <h2 class="leading-none">Create New Account</h2>
                    <p class="text-lg mt-[15px]">Register your account details below</p>

                    <!-- Full Name -->
                    <div class="mt-7">
                        <label class="block font-medium mb-2.5">Full Name</label>
                        <input v-model="form.names" type="text" placeholder="Enter your name"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Surnames -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Surnames</label>
                        <input v-model="form.surnames" type="text" placeholder="Enter your surnames"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Identity Number -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Identity Number</label>
                        <input v-model="form.identity_number" type="text" placeholder="061840918"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Birthday -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Birthday</label>
                        <input v-model="form.birthday_date" type="date" class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Phone -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Phone</label>
                        <input v-model="form.phone" type="tel" placeholder="1234567890" class="w-full h-12 border p-4"
                            required />
                    </div>

                    <!-- Username -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Username</label>
                        <input v-model="form.username" type="text" placeholder="Choster900"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Email -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Email</label>
                        <input v-model="form.email" type="email" placeholder="Enter your email address"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Password -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Password</label>
                        <input v-model="form.password" type="password" placeholder="********"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Address Info -->
                    <h3 class="text-xl font-semibold mt-10 mb-4">Address Info</h3>

                    <!-- Name (Label) -->
                    <div class="mt-2">
                        <label class="block font-medium mb-2.5">Home Label</label>
                        <input v-model="form.name" type="text" placeholder="Casa Principal"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Neighborhood -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Neighborhood</label>
                        <input v-model="form.neighborhood" type="text" placeholder="Centro"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Street -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Street</label>
                        <input v-model="form.street" type="text" placeholder="Calle Principal"
                            class="w-full h-12 border p-4" required />
                    </div>

                    <!-- Number -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">Number</label>
                        <input v-model="form.number" type="text" placeholder="123" class="w-full h-12 border p-4"
                            required />
                    </div>

                    <!-- District ID -->
                    <div class="mt-5">
                        <label class="block font-medium mb-2.5">District ID</label>
                        <select v-model="form.district_id" class="w-full h-12 border p-4" required>
                            <option v-for="dis in distric" :value="dis.id">{{ dis.name }}</option>
                        </select>
                    </div>

                    <!-- Submit -->
                    <div class="mt-7">
                        <button type="submit" class="btn btn-theme-solid w-full">Register</button>
                    </div>

                    <p class="text-lg mt-4">Already have an account?
                        <router-link to="/auth/login" class="text-primary font-medium ml-1">Login</router-link>
                    </p>
                </form>
            </div>
        </div>

        <FooterOne />
        <ScrollToTop />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/modules/common/components/Navbar.vue'
import FooterOne from '@/modules/common/components/FooterOne.vue'
import ScrollToTop from '@/modules/common/components/ScrollToTop.vue'
import register from '@/assets/images/bg/register.jpg'
import { distric } from '../../../mocks/data'
import { registerAction } from '../actions/register.action'
import type { ClientRegistrationPayload } from '../interfaces/client-registration-payload'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref<ClientRegistrationPayload>({
    names: '',
    surnames: '',
    identity_number: '',
    birthday_date: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    name: '',
    neighborhood: '',
    street: '',
    number: '',
    district_id: 1
})

const registerUser = async () => {
    try {
        await registerAction(form.value)
        router.push('/')
    } catch (error: any) {
        alert('Registro fallido: ' + (error?.message || 'Error desconocido'))
    }
}
</script>
