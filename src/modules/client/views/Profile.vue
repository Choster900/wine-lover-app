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
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Información del Cliente -->
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <i class="fas fa-user"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">Información Personal</h3>
                            </div>

                            <!-- Vista previa del perfil -->
                            <div v-if="!isEditing" class="space-y-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl">
                                        {{ getInitials() }}
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-semibold text-title dark:text-white">
                                            {{ authStore.user?.client.names }} {{ authStore.user?.client.surnames }}
                                        </h4>
                                        <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
                                    </div>
                                </div>

                                <div class="space-y-4 mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                                    <div class="flex items-start gap-3 mb-5">
                                        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                            <i class="fas fa-id-card"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">DUI</p>
                                            <p class="font-medium text-title dark:text-white">{{ authStore.user?.client.identity_number }}</p>
                                        </div>
                                    </div>

                                    <div class="flex items-start gap-3 mb-5">
                                        <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">Teléfono</p>
                                            <p class="font-medium text-title dark:text-white">+503 {{ authStore.user?.client.phone }}</p>
                                        </div>
                                    </div>

                                    <div class="flex items-start gap-3 mb-5">
                                        <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                                            <i class="fas fa-calendar"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">Fecha de Nacimiento</p>
                                            <p class="font-medium text-title dark:text-white">{{ formatDate(authStore.user?.client.birthday_date) }}</p>
                                        </div>
                                    </div>

                                    <div class="flex items-start gap-3 mb-5">
                                        <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                                            <i class="fas fa-user-tag"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">Nombre de Usuario</p>
                                            <p class="font-medium text-title dark:text-white">{{ authStore.user?.username }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="pt-4">
                                    <button
                                        @click="startEditing"
                                        class="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i class="fas fa-edit"></i>
                                        <span>Editar Información</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Formulario de edición -->
                            <form v-else @submit.prevent="updateProfile" class="space-y-5">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <div>
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Nombres
                                        </label>
                                        <input
                                            v-model="formData.names"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                            type="text"
                                            placeholder="Nombres"
                                            required
                                        >
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Apellidos
                                        </label>
                                        <input
                                            v-model="formData.surnames"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                            type="text"
                                            placeholder="Apellidos"
                                            required
                                        >
                                    </div>
                                </div>

                                <div class="mb-5">
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        DUI
                                    </label>
                                    <input
                                        v-model="formData.identity_number"
                                        class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                        type="text"
                                        placeholder="00000000-0"
                                        required
                                    >
                                </div>

                                <div class="mb-5">
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        Teléfono
                                    </label>
                                    <div class="flex">
                                        <div class="flex-none w-16 h-12 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-l-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                                            +503
                                        </div>
                                        <input
                                            v-model="formData.phone"
                                            class="flex-1 h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-r-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                            type="tel"
                                            placeholder="7234-5678"
                                            required
                                        >
                                    </div>
                                </div>

                                <div class="mb-5">
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        Fecha de Nacimiento
                                    </label>
                                    <input
                                        v-model="formData.birthday_date"
                                        class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                        type="date"
                                        required
                                    >
                                </div>

                                <div class="mb-5">
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        Nombre de Usuario
                                    </label>
                                    <input
                                        v-model="formData.username"
                                        class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                        type="text"
                                        placeholder="Nombre de usuario"
                                        required
                                    >
                                </div>

                                <div class="mb-5">
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        v-model="formData.email"
                                        class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        required
                                    >
                                </div>

                                <div class="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        :disabled="isSubmitting"
                                        class="flex-1 h-12 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i class="fas" :class="isSubmitting ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                                        <span>{{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}</span>
                                    </button>
                                    <button
                                        type="button"
                                        @click="cancelEditing"
                                        class="px-6 h-12 bg-gray-500 hover:bg-gray-600 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i class="fas fa-times"></i>
                                        <span>Cancelar</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Estadísticas y Membresía -->
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">Estadísticas y Membresía</h3>
                            </div>

                            <!-- Membresía -->
                            <div class="mb-8">
                                <div class="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/20">
                                    <div class="flex items-center justify-between">
                                        <h4 class="text-lg font-semibold text-title dark:text-white">Membresía</h4>
                                        <div class="px-3 py-1 bg-primary/20 rounded-full text-primary text-sm font-medium">
                                            {{ authStore.user?.client.membership || 'Sin Membresia' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-8">
                                <div class="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/20">
                                    <div class="flex items-center justify-between">
                                        <h4 class="text-lg font-semibold text-title dark:text-white">Cashback Disponible</h4>
                                        <div class="px-3 py-1 font-semibold text-title">
                                            ${{ authStore.user?.client.current_cashback }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Estadísticas -->
                            <div class="grid grid-cols-1 gap-4">
                                <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div class="text-3xl font-bold text-primary mb-1">
                                        {{ authStore.user?.client.orders.length }}
                                    </div>
                                    <div class="text-sm text-gray-500">Pedidos Realizados</div>
                                </div>
                                <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg col-span-2">
                                    <div class="text-3xl font-bold text-amber-500 mb-1">
                                        ${{ getTotalSpent() }}
                                    </div>
                                    <div class="text-sm text-gray-500">Total Gastado</div>
                                </div>
                            </div>

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
import { onBeforeMount, onMounted, ref } from 'vue';
import Aos from 'aos';
import ProfileTab from '../components/ProfileTab.vue';
import { updateClientInfo } from '../actions/fetch-client.action';
import type { ClientPayload } from '../interfaces/update-client-info.interface';

const authStore = useAuthStore()

const isEditing = ref(false)
const isSubmitting = ref(false)

// Formulario para editar información
const formData = ref<ClientPayload>({
    names: '',
    surnames: '',
    identity_number: '',
    birthday_date: '',
    phone: '',
    username: '',
    email: ''
})

// Iniciar edición
const startEditing = () => {
    if (!authStore.user) return

    formData.value = {
        names: authStore.user.client.names,
        surnames: authStore.user.client.surnames,
        identity_number: authStore.user.client.identity_number,
        birthday_date: formatDateForInput(authStore.user.client.birthday_date),
        phone: authStore.user.client.phone,
        username: authStore.user.username,
        email: authStore.user.email
    }

    isEditing.value = true
}

// Cancelar edición
const cancelEditing = () => {
    isEditing.value = false
}

// Actualizar perfil
const updateProfile = async () => {
    if (!authStore.user) return

    isSubmitting.value = true
    try {
        const result = await updateClientInfo(formData.value)

        if (result) {
            // Actualizar el store con la nueva información
            authStore.updateUserInfo(result)
            alert('✅ Información actualizada exitosamente')
            isEditing.value = false
        } else {
            alert('❌ Ocurrió un error al actualizar la información. Intenta nuevamente.')
        }
    } catch (error) {
        console.error('Error al actualizar información:', error)
        alert('❌ Ocurrió un error al actualizar la información. Intenta nuevamente.')
    } finally {
        isSubmitting.value = false
    }
}

// Obtener iniciales del nombre
const getInitials = () => {
    if (!authStore.user) return ''

    const names = authStore.user.client.names
    const surnames = authStore.user.client.surnames

    return (names.charAt(0) + (surnames ? surnames.charAt(0) : '')).toUpperCase()
}

// Formatear fecha para mostrar
const formatDate = (date: string | Date | undefined): string => {
  if (!date) return 'N/A'

  const parsedDate = new Date(typeof date === 'string' ? `${date}T00:00:00` : date)

  return new Intl.DateTimeFormat('es-SV', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(parsedDate)
}

// Formatear fecha para input
const formatDateForInput = (date: string | Date) => {
    if (!date) return ''

    const d = new Date(date)
    return d.toISOString().split('T')[0]
}

// Obtener total gastado (simulado)
const getTotalSpent = () => {
    const orders = authStore.user?.client.orders || []
    const total = orders.reduce((sum, order) => sum + (Number.parseFloat(order.total) || 0), 0)

    return total.toFixed(2)
}

onMounted(() => {
    Aos.init()
})

onBeforeMount(() => {
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
input, select {
    transition: all 0.3s ease;
}

input:focus, select:focus {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
