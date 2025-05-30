<template>
    <!-- Header Banner -->
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Membresía Actual</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li><router-link to="/my-profile">Mi Cuenta</router-link></li>
                <li>/</li>
                <li class="text-primary">Membresía Actual</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100" data-aos="fade-up">
        <div class="container-fluid">
            <div
                class="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                <!-- Sidebar Navigation -->
                <div class="w-full md:w-[200px] lg:w-[300px] flex-none">
                    <ProfileTab />
                </div>

                <!-- Main Content -->
                <div class="w-full md:w-auto md:flex-1">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Información de Membresía Actual -->
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <i class="fas fa-crown"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">Mi Membresía</h3>
                            </div>

                            <div v-if="isLoading" class="flex justify-center items-center py-12">
                                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>

                            <div v-else-if="!currentMembership" class="py-12 text-center">
                                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <i class="fas fa-crown text-2xl"></i>
                                </div>
                                <h4 class="text-lg font-medium text-gray-600 dark:text-gray-400">Sin Membresía Activa</h4>
                                <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                    Adquiere una membresía para obtener beneficios exclusivos
                                </p>
                                <router-link 
                                    to="/membership" 
                                    class="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300"
                                >
                                    <i class="fas fa-plus"></i>
                                    <span>Ver Planes</span>
                                </router-link>
                            </div>

                            <div v-else class="space-y-6">
                                <!-- Tarjeta de Membresía -->
                                <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
                                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                                    
                                    <div class="relative z-10">
                                        <div class="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 class="text-2xl font-bold">{{ currentMembership.membership }}</h4>
                                                <p class="text-white/80">{{ currentMembership.plan }}</p>
                                            </div>
                                            <div class="text-right">
                                                <div class="text-3xl">
                                                    <i class="fas fa-crown"></i>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="grid grid-cols-2 gap-4 mt-6">
                                            <div>
                                                <p class="text-white/70 text-sm">Cashback</p>
                                                <p class="text-xl font-semibold">{{ currentMembership.cashback_percentage }}%</p>
                                            </div>
                                            <div>
                                                <p class="text-white/70 text-sm">Precio</p>
                                                <p class="text-xl font-semibold">${{ currentMembership.price }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Detalles de la Membresía -->
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div class="flex items-center gap-3">
                                            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <i class="fas fa-calendar-alt"></i>
                                            </div>
                                            <div>
                                                <p class="font-medium text-title dark:text-white">Fecha de Vencimiento</p>
                                                <p class="text-sm text-gray-500">{{ formatDate(currentMembership.end_date) }}</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <span :class="getMembershipStatusClass()">
                                                {{ getMembershipStatus() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div class="flex items-center gap-3">
                                            <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <i class="fas fa-sync-alt"></i>
                                            </div>
                                            <div>
                                                <p class="font-medium text-title dark:text-white">Renovación Automática</p>
                                                <p class="text-sm text-gray-500">
                                                    {{ currentMembership.automatic_renewal ? 'Activada' : 'Desactivada' }}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <button 
                                                @click="toggleAutoRenewal"
                                                :class="currentMembership.automatic_renewal ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'"
                                                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                            >
                                                <span 
                                                    :class="currentMembership.automatic_renewal ? 'translate-x-6' : 'translate-x-1'"
                                                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                                                ></span>
                                            </button>
                                        </div>
                                    </div>

                                    <div v-if="currentMembership.refund_amount > 0" class="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <div class="flex items-center gap-3">
                                            <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                                <i class="fas fa-dollar-sign"></i>
                                            </div>
                                            <div>
                                                <p class="font-medium text-title dark:text-white">Reembolso Disponible</p>
                                                <p class="text-sm text-gray-500">En caso de cancelación</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <span class="text-lg font-semibold text-amber-600">${{ currentMembership.refund_amount }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Acciones -->
                                <div class="flex gap-4 pt-4">
                                    <button
                                        @click="showCancelModal = true"
                                        class="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i class="fas fa-times-circle"></i>
                                        <span>Cancelar Membresía</span>
                                    </button>
                                    <router-link 
                                        to="/membership/upgrade"
                                        class="flex-1 h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i class="fas fa-arrow-up"></i>
                                        <span>Actualizar Plan</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <!-- Historial de Pagos -->
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <i class="fas fa-receipt"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">Información de Pago</h3>
                            </div>

                            <div v-if="currentMembership?.payment_track" class="space-y-4">
                                <!-- Estado del Pago -->
                                <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div class="flex justify-between items-center mb-3">
                                        <h4 class="font-semibold text-title dark:text-white">Estado del Pago</h4>
                                        <span :class="getPaymentStatusClass(currentMembership.payment_track.payment_status)">
                                            {{ getPaymentStatusText(currentMembership.payment_track.payment_status) }}
                                        </span>
                                    </div>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p class="text-gray-500">Método de Pago</p>
                                            <p class="font-medium text-title dark:text-white">{{ currentMembership.payment_track.payment_method }}</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500">Monto Pagado</p>
                                            <p class="font-medium text-title dark:text-white">${{ currentMembership.payment_track.amount_paid }}</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500">ID de Transacción</p>
                                            <p class="font-mono text-xs text-title dark:text-white">{{ currentMembership.payment_track.transaction_id }}</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500">Fecha de Pago</p>
                                            <p class="font-medium text-title dark:text-white">{{ formatDate(currentMembership.payment_track.created_at) }}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Próximo Pago -->
                                <div v-if="currentMembership.automatic_renewal" class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div class="flex items-center gap-3 mb-2">
                                        <i class="fas fa-calendar-check text-blue-600"></i>
                                        <h4 class="font-semibold text-blue-800 dark:text-blue-300">Próximo Pago</h4>
                                    </div>
                                    <p class="text-sm text-blue-700 dark:text-blue-400">
                                        Tu membresía se renovará automáticamente el {{ formatDate(currentMembership.end_date) }}
                                    </p>
                                    <p class="text-sm text-blue-700 dark:text-blue-400 mt-1">
                                        Monto: ${{ currentMembership.price }}
                                    </p>
                                </div>
                            </div>

                            <!-- Beneficios de la Membresía -->
                            <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h4 class="font-semibold text-title dark:text-white mb-4">Beneficios de tu Membresía</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div class="flex items-center gap-2 text-sm">
                                        <i class="fas fa-check-circle text-green-500"></i>
                                        <span>{{ currentMembership?.cashback_percentage }}% de cashback en compras</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-sm">
                                        <i class="fas fa-check-circle text-green-500"></i>
                                        <span>Envío gratuito en pedidos</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-sm">
                                        <i class="fas fa-check-circle text-green-500"></i>
                                        <span>Acceso a ofertas exclusivas</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-sm">
                                        <i class="fas fa-check-circle text-green-500"></i>
                                        <span>Soporte prioritario</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Cancelación -->
    <div v-if="showCancelModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-dark-secondary rounded-xl p-6 max-w-md w-full">
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <i class="fas fa-exclamation-triangle text-2xl"></i>
                </div>
                <h3 class="text-lg font-semibold text-title dark:text-white mb-2">¿Cancelar Membresía?</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                    Esta acción cancelará tu membresía actual. Perderás todos los beneficios asociados.
                </p>
                <div v-if="currentMembership?.refund_amount && currentMembership.refund_amount > 0" class="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p class="text-sm text-green-700 dark:text-green-400">
                        Recibirás un reembolso de ${{ currentMembership.refund_amount }}
                    </p>
                </div>
                <div class="flex gap-4">
                    <button
                        @click="showCancelModal = false"
                        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Mantener Membresía
                    </button>
                    <button
                        @click="cancelMembership"
                        class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                        Confirmar Cancelación
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import ProfileTab from './ProfileTab.vue'
import { getCurrentMembership } from '../actions/fetch-membership.action'
import type { CurrentMembership } from '../interfaces/acquare-membership.interface'

const currentMembership = ref<CurrentMembership | null>(null)
const isLoading = ref(true)
const showCancelModal = ref(false)

// Obtener membresía actual
const fetchCurrentMembership = async () => {
    isLoading.value = true
    try {
        const data = await getCurrentMembership()
        if (data) {
            currentMembership.value = data
        }
    } catch (error) {
        console.error('Error al obtener la membresía actual:', error)
    } finally {
        isLoading.value = false
    }
}

// Formatear fecha
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}

// Obtener estado de la membresía
const getMembershipStatus = () => {
    if (!currentMembership.value) return ''
    
    const endDate = new Date(currentMembership.value.end_date)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) return 'Expirada'
    if (daysUntilExpiry <= 7) return `Expira en ${daysUntilExpiry} días`
    if (daysUntilExpiry <= 30) return `Expira en ${daysUntilExpiry} días`
    return 'Activa'
}

// Obtener clase CSS para el estado de la membresía
const getMembershipStatusClass = () => {
    const status = getMembershipStatus()
    if (status === 'Expirada') return 'px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium'
    if (status.includes('Expira en') && status.includes('días')) {
        const days = parseInt(status.match(/\d+/)?.[0] || '0')
        if (days <= 7) return 'px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium'
        if (days <= 30) return 'px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium'
    }
    return 'px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium'
}

// Obtener estado del pago
const getPaymentStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
        'completed': 'Completado',
        'pending': 'Pendiente',
        'failed': 'Fallido',
        'refunded': 'Reembolsado'
    }
    return statusMap[status] || status
}

// Obtener clase CSS para el estado del pago
const getPaymentStatusClass = (status: string) => {
    const classMap: Record<string, string> = {
        'completed': 'px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium',
        'pending': 'px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium',
        'failed': 'px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium',
        'refunded': 'px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium'
    }
    return classMap[status] || 'px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium'
}

// Toggle renovación automática
const toggleAutoRenewal = async () => {
    // Aquí implementarías la lógica para cambiar la renovación automática
    alert('Funcionalidad de renovación automática no implementada')
}

// Cancelar membresía
const cancelMembership = async () => {
    // Aquí implementarías la lógica para cancelar la membresía
    alert('Funcionalidad de cancelación no implementada')
    showCancelModal.value = false
}

onMounted(() => {
    Aos.init()
    fetchCurrentMembership()
})
</script>

<style scoped>
.perspective-card {
    perspective: 1000px;
}

.card-face {
    backface-visibility: hidden;
    transition: transform 0.6s;
}

.card-back {
    transform: rotateY(180deg);
}

.rotate-card {
    transform: rotateY(180deg);
}

/* Animaciones suaves */
.transition-all {
    transition: all 0.3s ease;
}

/* Estilos para el toggle switch */
button:focus {
    outline: none;
}
</style>