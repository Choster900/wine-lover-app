<template>
  <div>
    <Navbar />

    <div class="flex">
      <!-- Imagen -->
      <div class="w-1/2 hidden md:block lg:flex-1">
        <img class="h-full object-cover" :src="register" alt="register" />
      </div>

      <!-- Formulario -->
      <div class="w-full md:w-1/2 lg:max-w-lg xl:max-w-3xl lg:w-full py-10 px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center">
        <form @submit.prevent="registerUser" class="w-full max-w-2xl space-y-10">
          <div>
            <h2 class="text-3xl font-bold">Nueva Cuenta</h2>
          </div>

          <!-- Datos Personales -->
          <div>
            <h3 class="text-xl font-semibold mt-5 mb-5">Información Personal</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block font-medium mb-1">Nombres</label>
                <input v-model="form.names" type="text" placeholder="Ingresa tus nombres" class="w-full h-11 border p-3" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Apellidos</label>
                <input v-model="form.surnames" type="text" placeholder="Ingresa tus apellidos" class="w-full h-11 border p-3" required />
              </div>
              <div>
                <label class="block font-medium mb-1">DUI</label>
                <input v-model="form.identity_number" type="text" placeholder="06184091-8" class="w-full h-11 border p-3" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Fecha de Nacimiento</label>
                <input v-model="form.birthday_date" type="date" class="w-full h-11 border p-3" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Telefono</label>
                <input v-model="form.phone" type="tel" placeholder="7234-5678" class="w-full h-11 border p-3" required />
              </div>
            </div>
          </div>

          <!-- Usuario -->
          <div>
            <h3 class="text-xl font-semibold mt-5 mb-5">Información de la Cuenta</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block font-medium mb-1">Username</label>
                <input v-model="form.username" type="text" placeholder="Ingresa tu nombre de usuario" class="w-full h-11 border p-3" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Email</label>
                <input v-model="form.email" type="email" placeholder="Ingresa tu correo electrónico" class="w-full h-11 border p-3" required />
              </div>
              <div class="md:col-span-2">
                <label class="block font-medium mb-1">Contraseña</label>
                <input v-model="form.password" type="password" placeholder="********" class="w-full h-11 border p-3" required />
              </div>
            </div>
          </div>

          <!-- Dirección -->
          <div>
            <h3 class="text-xl font-semibold mt-5 mb-5">Dirección</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block font-medium mb-1">Nombre</label>
                <input v-model="form.name" type="text" placeholder="Trabajo" class="w-full h-11 border p-3" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Colonia/Residencial</label>
                <input v-model="form.neighborhood" type="text" placeholder="San Benito" class="w-full h-11 border p-3" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Calle</label>
                <input v-model="form.street" type="text" placeholder="Av. De La Revolución" class="w-full h-11 border p-3" required />
              </div>
              <div>
                <label class="block font-medium mb-1">Numero</label>
                <input v-model="form.number" type="text" placeholder="123" class="w-full h-11 border p-3" required />
              </div>
              <div class="md:col-span-2">
                <label class="block font-medium mb-1">District</label>
                <select v-model="form.district_id" class="w-full h-11 border p-3" required>
                  <option v-for="dis in distric" :key="dis.id" :value="dis.id">{{ dis.name }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Botón -->
          <div>
            <button type="submit" class="btn btn-theme-solid w-full mt-5" data-text="Registrar">Registrar</button>
            <p class="text-base mt-4">
              Ya tienes una cuenta?
              <router-link to="/auth/login" class="text-primary font-medium ml-1">Login</router-link>
            </p>
          </div>
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
