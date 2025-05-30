<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">
                {{ isUpgrade ? 'Actualizar Membresía' : 'Pago de Membresía' }}
            </h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li><router-link to="/membership">Planes</router-link></li>
                <li>/</li>
                <li class="text-primary">{{ isUpgrade ? 'Actualizar Membresía' : 'Pago de Membresía' }}</li>
            </ul>
        </div>
    </div>

    <div class="py-12 md:py-16" data-aos="fade-up">
        <div class="container">
            <div class="max-w-6xl mx-auto">
                <!-- Loader principal -->
                <div v-if="isLoading || isLoadingMemberships" class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>

                <div v-else-if="selectedPlan && selectedMembership" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <!-- Columna izquierda: Plan y Beneficios -->
                    <div class="lg:col-span-5">
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-5 border border-gray-100 dark:border-gray-800 h-full">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <i class="fas fa-crown"></i>
                                </div>
                                <h3 class="text-lg font-semibold text-title dark:text-white">
                                    {{ isUpgrade ? 'Nueva Membresía' : 'Plan Seleccionado' }}
                                </h3>
                            </div>

                            <!-- Tarjeta del Plan -->
                            <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 p-5 dark:text-white mb-4">
                                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                                <div class="relative z-10">
                                    <div class="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 class="text-xl font-bold">{{ selectedMembership.name }}</h4>
                                            <p class="text-white/80">{{ selectedPlan.plan.name }} ({{ selectedPlan.plan.months }} meses)</p>
                                        </div>
                                        <div class="text-right">
                                            <div class="text-2xl">
                                                <i class="fas fa-crown"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <p class="text-white/70 text-xs">Cashback</p>
                                            <p class="text-lg font-semibold">{{ selectedPlan.cashback_percentage }}%</p>
                                        </div>
                                        <div>
                                            <p class="text-white/70 text-xs">Precio</p>
                                            <p class="text-lg font-semibold">${{ selectedPlan.price }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Comparación de Membresías (solo para upgrade) -->
                            <div v-if="isUpgrade && currentMembership" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 mb-4">
                                <h4 class="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2 text-sm">
                                    <i class="fas fa-arrow-up"></i>
                                    Comparación de Membresías
                                </h4>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <h5 class="font-medium text-gray-600 dark:text-gray-400 mb-1 text-xs">Actual</h5>
                                        <div class="space-y-1 text-xs">
                                            <div class="flex justify-between">
                                                <span>Plan:</span>
                                                <span class="font-medium">{{ currentMembership.membership }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Cashback:</span>
                                                <span class="font-medium">{{ currentMembership.cashback_percentage }}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 class="font-medium text-blue-600 dark:text-blue-400 mb-1 text-xs">Nueva</h5>
                                        <div class="space-y-1 text-xs">
                                            <div class="flex justify-between">
                                                <span>Plan:</span>
                                                <span class="font-medium text-blue-600">{{ selectedMembership.name }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Cashback:</span>
                                                <span class="font-medium text-green-600">
                                                    {{ selectedPlan.cashback_percentage }}%
                                                    <span class="text-xs">(+{{ selectedPlan.cashback_percentage - currentMembership.cashback_percentage }}%)</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Beneficios del Plan -->
                            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <h4 class="font-semibold text-title dark:text-white mb-3 text-sm">Beneficios Incluidos</h4>
                                <div class="grid grid-cols-1 gap-2">
                                    <div class="flex items-center gap-2 text-xs">
                                        <i class="fas fa-check-circle text-green-500"></i>
                                        <span>{{ selectedPlan.cashback_percentage }}% de cashback en compras</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs">
                                        <i class="fas fa-check-circle text-green-500"></i>
                                        <span>Envío gratuito en pedidos</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs">
                                        <i class="fas fa-check-circle text-green-500"></i>
                                        <span>Acceso a ofertas exclusivas</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs">
                                        <i class="fas fa-check-circle text-green-500"></i>
                                        <span>Soporte prioritario</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Columna central: Dirección y Tarjeta -->
                    <div class="lg:col-span-4">
                        <div class="space-y-6">
                            <!-- Selección de Dirección -->
                            <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-5 border border-gray-100 dark:border-gray-800 mb-5">
                                <div class="flex items-center gap-3 mb-4">
                                    <div class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <h3 class="text-lg font-semibold text-title dark:text-white">Dirección</h3>
                                </div>

                                <div v-if="isLoadingAddresses" class="flex justify-center items-center py-4">
                                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                </div>

                                <div v-else-if="!addresses.length" class="py-4 text-center">
                                    <p class="text-gray-600 dark:text-gray-400 mb-3 text-sm">No tienes direcciones guardadas</p>
                                    <router-link
                                        to="/my-profile/addresses"
                                        class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm transition-all duration-300"
                                    >
                                        <i class="fas fa-plus text-xs"></i>
                                        <span>Agregar Dirección</span>
                                    </router-link>
                                </div>

                                <div v-else class="space-y-2">
                                    <div
                                        v-for="address in addresses"
                                        :key="address.id"
                                        @click="selectedAddressId = address.id"
                                        :class="selectedAddressId === address.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'"
                                        class="p-3 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <div class="flex items-start justify-between">
                                            <div class="flex items-start gap-2">
                                                <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                                    <i class="fas fa-home text-xs"></i>
                                                </div>
                                                <div>
                                                    <h4 class="font-semibold text-title dark:text-white text-sm">{{ address.name }}</h4>
                                                    <p class="text-xs text-gray-600 dark:text-gray-400">
                                                        {{ address.street }} {{ address.number }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div v-if="selectedAddressId === address.id" class="text-primary">
                                                <i class="fas fa-check-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Selección de Tarjeta -->
                            <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-5 border border-gray-100 dark:border-gray-800">
                                <div class="flex items-center gap-3 mb-4">
                                    <div class="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <i class="fas fa-credit-card"></i>
                                    </div>
                                    <h3 class="text-lg font-semibold text-title dark:text-white">Método de Pago</h3>
                                </div>

                                <div v-if="isLoadingCards" class="flex justify-center items-center py-4">
                                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                </div>

                                <div v-else-if="!cards.length" class="py-4 text-center">
                                    <p class="text-gray-600 dark:text-gray-400 mb-3 text-sm">No tienes tarjetas guardadas</p>
                                    <router-link
                                        to="/my-profile/payment-methods"
                                        class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm transition-all duration-300"
                                    >
                                        <i class="fas fa-plus text-xs"></i>
                                        <span>Agregar Tarjeta</span>
                                    </router-link>
                                </div>

                                <div v-else class="space-y-2">
                                    <div
                                        v-for="card in cards"
                                        :key="card.id"
                                        @click="selectedCardId = card.id"
                                        :class="selectedCardId === card.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'"
                                        class="p-3 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-2">
                                                <div class="text-xl" :class="getCardBrandColor(card.brand)">
                                                    <i :class="getCardBrandIcon(card.brand)"></i>
                                                </div>
                                                <div>
                                                    <div class="font-mono text-sm font-medium text-title dark:text-white">
                                                        {{ card.masked_number }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="selectedCardId === card.id" class="text-primary">
                                                <i class="fas fa-check-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Columna derecha: Resumen de Pago -->
                    <div class="lg:col-span-3">
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-5 border border-gray-100 dark:border-gray-800 sticky top-8">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                    <i class="fas fa-receipt"></i>
                                </div>
                                <h3 class="text-lg font-semibold text-title dark:text-white">Resumen</h3>
                            </div>

                            <div class="space-y-3">
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-600 dark:text-gray-400">Plan:</span>
                                    <span class="font-medium text-title dark:text-white">{{ selectedMembership.name }}</span>
                                </div>

                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-600 dark:text-gray-400">Duración:</span>
                                    <span class="font-medium text-title dark:text-white">{{ selectedPlan.plan.months }} meses</span>
                                </div>

                                <div v-if="isUpgrade && currentMembership" class="flex justify-between items-center text-sm">
                                    <span class="text-gray-600 dark:text-gray-400">Reembolso Generado:</span>
                                    <span class="font-medium text-green-600">$</span>
                                </div>

                                <hr class="border-gray-200 dark:border-gray-700">

                                <div class="flex justify-between items-center text-base font-semibold">
                                    <span>Total:</span>
                                    <span class="text-primary">
                                        ${{ isUpgrade && currentMembership ?
                                            (selectedPlan.price - currentMembership.refund_amount).toFixed(2) :
                                            selectedPlan.price
                                        }}
                                    </span>
                                </div>

                                <!-- Renovación Automática -->
                                <div class="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="font-medium text-title dark:text-white text-sm">Renovación</p>
                                            <p class="text-xs text-gray-500">Automática</p>
                                        </div>
                                        <button
                                            @click="automaticRenewal = !automaticRenewal"
                                            :class="automaticRenewal ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'"
                                            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            <span
                                                :class="automaticRenewal ? 'translate-x-5' : 'translate-x-1'"
                                                class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
                                            ></span>
                                        </button>
                                    </div>
                                </div>

                                <!-- Botón de Pago -->
                                <button
                                    @click="processPurchase"
                                    :disabled="!canPurchase || isProcessing"
                                    class="w-full h-10 bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                                >
                                    <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
                                    <i v-else class="fas fa-lock"></i>
                                    <span>
                                        {{ isProcessing ? 'Procesando...' :
                                           isUpgrade ? 'Actualizar' : 'Confirmar' }}
                                    </span>
                                </button>

                                <!-- Información de Seguridad -->
                                <div class="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div class="flex items-center gap-1 text-xs text-green-700 dark:text-green-400">
                                        <i class="fas fa-shield-alt"></i>
                                        <span>Pago seguro con encriptación SSL</span>
                                    </div>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'

import { getCurrentMembership, acquireMembership, getMemberships } from '@/modules/client/actions/fetch-membership.action'
import { getAddresses } from '@/modules/client/actions/fetch-addresses.action'
import { getCardsToken } from '@/modules/client/actions/fetch-card.action'
import type { CurrentMembership, AcquareMembershipPayload, Membership, MembershipPlan } from '../interfaces/acquare-membership.interface'
import type { Address } from '../interfaces/addresses.interface'
import type { CardToken } from '../interfaces/card-token.interface'

const route = useRoute()
const router = useRouter()

// Estados
const isLoading = ref(true)
const isLoadingAddresses = ref(true)
const isLoadingCards = ref(true)
const isLoadingMemberships = ref(true)
const isProcessing = ref(false)

// Datos
const currentMembership = ref<CurrentMembership | null>(null)
const addresses = ref<Address[]>([])
const cards = ref<CardToken[]>([])
const memberships = ref<Membership[]>([])

// Selecciones
const selectedAddressId = ref<number | null>(null)
const selectedCardId = ref<number | null>(null)
const automaticRenewal = ref(true)

// Parámetros de la URL
const membershipId = ref<number>(parseInt(route.params.membershipId as string))
const planId = ref<number>(parseInt(route.params.planId as string))

// Datos del plan seleccionado
const selectedMembership = ref<Membership | null>(null)
const selectedPlan = ref<MembershipPlan | null>(null)

// Computed
const isUpgrade = computed(() => {
    return currentMembership.value &&
           currentMembership.value.id &&
           selectedMembership.value &&
           selectedMembership.value.id > currentMembership.value.id
})

const canPurchase = computed(() => {
    return selectedAddressId.value &&
           selectedCardId.value &&
           selectedPlan.value &&
           !isProcessing.value
})

// Funciones para obtener datos
const fetchCurrentMembership = async () => {
    try {
        const data = await getCurrentMembership()
        if (data) {
            currentMembership.value = data
        }
    } catch (error) {
        console.error('Error al obtener membresía actual:', error)
    }
}

const fetchAddresses = async () => {
    isLoadingAddresses.value = true
    try {
        const data = await getAddresses()
        if (data) {
            addresses.value = data
            // Seleccionar la primera dirección por defecto
            if (data.length > 0) {
                selectedAddressId.value = data[0].id
            }
        }
    } catch (error) {
        console.error('Error al obtener direcciones:', error)
    } finally {
        isLoadingAddresses.value = false
    }
}

const fetchCards = async () => {
    isLoadingCards.value = true
    try {
        const data = await getCardsToken()
        if (data) {
            cards.value = data
            // Seleccionar la primera tarjeta por defecto
            if (data.length > 0) {
                selectedCardId.value = data[0].id
            }
        }
    } catch (error) {
        console.error('Error al obtener tarjetas:', error)
    } finally {
        isLoadingCards.value = false
    }
}

// Funciones para obtener datos de membresías
const fetchMemberships = async () => {
    isLoadingMemberships.value = true
    try {
        const data = await getMemberships()
        if (data) {
            memberships.value = data
            findSelectedPlan()
        }
    } catch (error) {
        console.error('Error al obtener membresías:', error)
    } finally {
        isLoadingMemberships.value = false
    }
}

const findSelectedPlan = () => {
    // Encontrar la membresía seleccionada
    selectedMembership.value = memberships.value.find(m => m.id === membershipId.value) || null

    if (selectedMembership.value) {
        // Encontrar el plan específico dentro de la membresía
        selectedPlan.value = selectedMembership.value.plans.find(p => p.plan.id === planId.value) || null
    }

    if (!selectedMembership.value || !selectedPlan.value) {
        alert('❌ Plan de membresía no encontrado')
        router.push('/membership')
    }
}

// Funciones de utilidad para tarjetas
const getCardBrandIcon = (brand: string) => {
    const brandLower = brand.toLowerCase()
    if (brandLower.includes('visa')) return 'fab fa-cc-visa'
    if (brandLower.includes('mastercard')) return 'fab fa-cc-mastercard'
    if (brandLower.includes('amex')) return 'fab fa-cc-amex'
    return 'fas fa-credit-card'
}

const getCardBrandColor = (brand: string) => {
    const brandLower = brand.toLowerCase()
    if (brandLower.includes('visa')) return 'text-blue-600'
    if (brandLower.includes('mastercard')) return 'text-orange-500'
    if (brandLower.includes('amex')) return 'text-blue-500'
    return 'text-gray-600'
}

// Validar si es una actualización válida
const validateUpgrade = () => {
    if (isUpgrade.value && currentMembership.value && selectedMembership.value) {
        if (selectedMembership.value.id <= currentMembership.value.id) {
            alert('❌ Solo puedes actualizar a una membresía superior')
            router.push('/membership')
            return false
        }
    }
    return true
}

// Procesar compra
const processPurchase = async () => {
    if (!canPurchase.value) {
        alert('Por favor completa todos los campos requeridos')
        return
    }

    if (!validateUpgrade()) return

    isProcessing.value = true

    try {
        const payload: AcquareMembershipPayload = {
            automatic_renewal: automaticRenewal.value,
            card_token_id: selectedCardId.value!,
            address_id: selectedAddressId.value!,
            membership_id: membershipId.value,
            plan_id: planId.value,
            payment_method_id: 1 // Quemado como solicitaste
        }

        const result = await acquireMembership(payload)

        if (result) {
            alert(`✅ ${isUpgrade.value ? 'Membresía actualizada' : 'Membresía adquirida'} exitosamente!`)
            router.push('/')
        } else {
            alert(`❌ Error al ${isUpgrade.value ? 'actualizar' : 'adquirir'} la membresía. Intenta nuevamente.`)
        }
    } catch (error) {
        console.error('Error al procesar el pago:', error)
        alert(`❌ Error al ${isUpgrade.value ? 'actualizar' : 'adquirir'} la membresía. Intenta nuevamente.`)
    } finally {
        isProcessing.value = false
    }
}

onMounted(async () => {
    // Validar parámetros de la URL
    if (!membershipId.value || !planId.value) {
        alert('❌ Parámetros de membresía inválidos')
        router.push('/membership')
        return
    }

    // Cargar datos en paralelo
    await Promise.all([
        fetchCurrentMembership(),
        fetchAddresses(),
        fetchCards(),
        fetchMemberships()
    ])

    if (!(selectedMembership.value.id > currentMembership.value.id)) {
        if (
            confirm('❌ Para poder actualizar tu membresía debes seleccionar una categoría mayor.\n\n¿Deseas ir a la página de membresías?')
        ) {
            router.push('/membership')
        } else {
            router.push('/')
        }
    }

    isLoading.value = false
    Aos.init()
})
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease;
}

button:focus {
    outline: none;
}

.cursor-pointer:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
</style>
