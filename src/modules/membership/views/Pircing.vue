<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Planes</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li class="text-primary">Planes</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100">
        <div class="container">
            <div class="max-w-xl mx-auto mb-8 text-center" data-aos="fade-up">
                <h3 class="font-medium leading-none mt-4 md:mt-6 text-2xl md:text-3xl">Elige tu Plan de Membresía</h3>
                <p class="mt-3">Descubre la opción ideal para tu estilo de vida y presupuesto. Disfruta flexibilidad y beneficios exclusivos con nuestros planes diseñados especialmente para los amantes del buen beber.</p>
            </div>

            <!-- Selector de duración de planes -->
            <div class="mb-8 flex items-center justify-center">
                <div class="p-1 bg-[#F7F7F7] dark:bg-dark-card-bg border border-title/10 dark:border-white/10 rounded-full mx-auto inline-flex gap-1">
                    <button
                        v-for="planType in availablePlanTypes"
                        :key="planType.id"
                        @click="selectedPlanTypeId = planType.id"
                        :class="[
                            'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap',
                            selectedPlanTypeId === planType.id
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white hover:bg-white/50'
                        ]"
                    >
                        {{ planType.name }}
                    </button>
                </div>
            </div>

            <!-- Loading state -->
            <div v-if="isLoading" class="text-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p class="mt-4 text-gray-600">Cargando planes...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="text-center py-8">
                <p class="text-red-600">Error al cargar los planes de membresía.</p>
                <button
                    @click="fetchMemberships"
                    class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                    Reintentar
                </button>
            </div>

            <!-- Plans grid -->
            <div v-else class="flex flex-wrap justify-center lg:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[30px] max-w-[1342px] mx-auto">
                <div
                    v-for="(membership, index) in memberships"
                    :key="membership.id"
                    :class="[
                        'w-full sm:w-[47%] lg:w-auto flex flex-col justify-between px-7 md:px-10 py-8 md:py-12 group relative overflow-hidden rounded-lg transition-all duration-300 border-2',
                        getMembershipCardClass(membership.name),
                        'hover:scale-105 hover:shadow-xl'
                    ]"
                    data-aos="fade-up"
                    :data-aos-delay="100 * (index + 1)"
                >
                    <!-- Badge para plan recomendado -->
                    <div v-if="membership.name === 'Gold'" class="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                        Recomendado
                    </div>

                    <div>
                        <!-- Nombre del plan -->
                        <div class="flex items-center gap-2 mb-2">
                            <div :class="getMembershipIconClass(membership.name)">
                                <i :class="getMembershipIcon(membership.name)"></i>
                            </div>
                            <h4 class="font-bold text-xl leading-none">{{ membership.name }}</h4>
                        </div>

                        <!-- Precio -->
                        <div class="mb-4">
                            <span class="block text-title dark:text-white text-4xl md:text-5xl font-bold leading-none">
                                ${{ getCurrentPlanPrice(membership) }}
                            </span>
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                                / {{ getCurrentPlanDescription(membership) }}
                            </span>

                            <!-- Mostrar ahorro si no es mensual -->
                            <div v-if="getCurrentPlan(membership)!.plan.months > 1" class="mt-2">
                                <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Ahorra {{ calculateSavings(membership) }}%
                                </span>
                            </div>
                        </div>

                        <!-- Cashback -->
                        <div class="mb-4 p-3 bg-white/10 rounded-lg">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-coins text-yellow-500"></i>
                                <span class="font-semibold">{{ getCurrentPlanCashback(membership) }}% Cashback</span>
                            </div>
                            <p class="text-sm opacity-75 mt-1">En todas tus compras</p>
                        </div>

                        <!-- Descripción -->
                        <div class="mb-6">
                            <p class="text-sm leading-relaxed opacity-90">{{ membership.description }}</p>
                        </div>

                        <!-- Características del plan -->
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-center gap-2 text-sm">
                                <i class="fas fa-check text-green-500"></i>
                                <span>Acceso a productos exclusivos</span>
                            </li>
                            <li class="flex items-center gap-2 text-sm">
                                <i class="fas fa-check text-green-500"></i>
                                <span>Descuentos especiales</span>
                            </li>
                            <li class="flex items-center gap-2 text-sm">
                                <i class="fas fa-check text-green-500"></i>
                                <span>Envío prioritario</span>
                            </li>
                            <li v-if="membership.name !== 'Silver'" class="flex items-center gap-2 text-sm">
                                <i class="fas fa-check text-green-500"></i>
                                <span>Soporte premium</span>
                            </li>
                            <li v-if="membership.name === 'Platinum'" class="flex items-center gap-2 text-sm">
                                <i class="fas fa-check text-green-500"></i>
                                <span>Acceso VIP a eventos</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Botón de suscripción -->
                    <div class="mt-6">
                        <router-link
                            class="block w-full text-center py-4 px-6 transform hover:scale-105 rounded-lg font-semibold transition-all duration-300 border-2 border-primary text-primary hover:bg-primary hover:text-white"
                            :to="getSubscriptionLink(membership)"
                        >
                            Suscribirse Ahora
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Información adicional -->
            <div class="mt-12 text-center" data-aos="fade-up">
                <div class="max-w-2xl mx-auto">
                    <h4 class="text-xl font-semibold mb-4">¿Necesitas ayuda para elegir?</h4>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">
                        Todos nuestros planes incluyen garantía de satisfacción de 30 días.
                        Puedes cambiar o cancelar tu suscripción en cualquier momento.
                    </p>
                    <div class="flex flex-wrap justify-center gap-4">
                        <router-link to="/contact" class="px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-primary text-primary hover:bg-primary hover:text-white">
                            Contactar Soporte
                        </router-link>
                        <router-link to="/faq" class="px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-gray-600 hover:text-primary">
                            Ver FAQ
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import { getAllMemberships } from '../actions/get-all-membership.action'
import type { Membership, PlanType, MembershipPlan } from '../interfaces/membership.interface'

// Estado reactivo
const memberships = ref<Membership[]>([])
const selectedPlanTypeId = ref<number>(1) // Por defecto mensual
const isLoading = ref(true)
const error = ref(false)

// Computed para obtener los tipos de planes disponibles
const availablePlanTypes = computed<PlanType[]>(() => {
    if (!memberships.value.length) return []

    // Obtener todos los tipos de planes únicos
    const planTypes = new Map<number, PlanType>()

    memberships.value.forEach(membership => {
        membership.plans.forEach(membershipPlan => {
            const planType = membershipPlan.plan
            if (!planTypes.has(planType.id)) {
                planTypes.set(planType.id, planType)
            }
        })
    })

    // Ordenar por duración (meses)
    return Array.from(planTypes.values()).sort((a, b) => a.months - b.months)
})

// Funciones para obtener información del plan actual
const getCurrentPlan = (membership: Membership): MembershipPlan | undefined => {
    return membership.plans.find(p => p.plan.id === selectedPlanTypeId.value)
}

const getCurrentPlanPrice = (membership: Membership): string => {
    const plan = getCurrentPlan(membership)
    return plan ? plan.price : '0.00'
}

const getCurrentPlanDescription = (membership: Membership): string => {
    const plan = getCurrentPlan(membership)
    return plan ? plan.plan.description : ''
}

const getCurrentPlanCashback = (membership: Membership): number => {
    const plan = getCurrentPlan(membership)
    return plan ? plan.cashback_percentage : 0
}

// Calcular ahorro comparado con el plan mensual
const calculateSavings = (membership: Membership): number => {
    const currentPlan = getCurrentPlan(membership)
    const monthlyPlan = membership.plans.find(p => p.plan.months === 1)

    if (!currentPlan || !monthlyPlan || currentPlan.plan.months === 1) return 0

    const monthlyTotal = parseFloat(monthlyPlan.price) * currentPlan.plan.months
    const currentPrice = parseFloat(currentPlan.price)
    const savings = ((monthlyTotal - currentPrice) / monthlyTotal) * 100

    return Math.round(savings)
}

// Funciones para estilos dinámicos
const getMembershipCardClass = (name: string): string => {
    switch (name.toLowerCase()) {
        case 'silver':
            return 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-600'
        case 'gold':
            return 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 border-yellow-400 dark:border-yellow-600'
        case 'platinum':
            return 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 border-purple-400 dark:border-purple-600'
        default:
            return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }
}

const getMembershipButtonClass = (name: string): string => {
    switch (name.toLowerCase()) {
        case 'silver':
            return 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl'
        case 'gold':
            return 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl'
        case 'platinum':
            return 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
        default:
            return 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl'
    }
}

const getMembershipIconClass = (name: string): string => {
    const baseClass = 'w-8 h-8 rounded-full flex items-center justify-center text-white '
    switch (name.toLowerCase()) {
        case 'silver':
            return baseClass + 'bg-gray-500'
        case 'gold':
            return baseClass + 'bg-yellow-500'
        case 'platinum':
            return baseClass + 'bg-purple-600'
        default:
            return baseClass + 'bg-primary'
    }
}

const getMembershipIcon = (name: string): string => {
    switch (name.toLowerCase()) {
        case 'silver':
            return 'fas fa-medal'
        case 'gold':
            return 'fas fa-crown'
        case 'platinum':
            return 'fas fa-gem'
        default:
            return 'fas fa-star'
    }
}

// Generar link de suscripción
const getSubscriptionLink = (membership: Membership): string => {
    const currentPlan = getCurrentPlan(membership)
    if (!currentPlan) return '#'

    return `/cart/payment-confirmation/membership/${membership.id}/${currentPlan.plan.id}`
}

// Función para cargar membresías
const fetchMemberships = async () => {
    try {
        isLoading.value = true
        error.value = false

        const data = await getAllMemberships()

        if (data && data.length > 0) {
            memberships.value = data
            console.log('Memberships loaded:', data)
        } else {
            error.value = true
            console.error('No memberships data received')
        }
    } catch (err) {
        error.value = true
        console.error('Error fetching memberships:', err)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    Aos.init()
    fetchMemberships()
})
</script>

<style scoped>
.switch-wrapper-dynamic {
    min-width: fit-content;
}

/* Animaciones adicionales */
.group:hover .fas {
    transform: scale(1.1);
    transition: transform 0.3s ease;
}
</style>
