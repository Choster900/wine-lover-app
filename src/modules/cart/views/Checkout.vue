<template>
    <div
        class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }"
    >
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">
                Checkout
            </h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4"
            >
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li><router-link to="/cart">Carrito</router-link></li>
                <li>/</li>
                <li class="text-primary">Checkout</li>
            </ul>
        </div>
    </div>

    <div class="py-12" data-aos="fade-up">
        <div class="container">
            <div class="max-w-6xl mx-auto">
                <!-- Verificación de membresía -->
                <div
                    v-if="!currentMembership && !isLoadingMembership"
                    class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8"
                >
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600"
                        >
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-red-800 dark:text-red-300">
                                Membresía Requerida
                            </h3>
                            <p class="text-red-700 dark:text-red-400 mt-1 mb-5">
                                Necesitas una membresía activa para realizar compras.
                            </p>
                            <router-link to="/membership" class="underline font-medium"
                                >Adquiere una membresía aquí</router-link
                            >
                        </div>
                    </div>
                </div>

                <!-- Contenido principal del checkout -->
                <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <!-- Columna izquierda: Formulario -->
                    <div class="lg:col-span-8">
                        <div class="space-y-8">
                            <!-- Información de membresía -->
                            <div
                                v-if="currentMembership"
                                class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
                            >
                                <div class="flex items-center gap-3 mb-4">
                                    <div
                                        class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"
                                    >
                                        <i class="fas fa-crown"></i>
                                    </div>
                                    <div>
                                        <h3
                                            class="text-lg font-semibold text-green-800 dark:text-green-300"
                                        >
                                            Membresía Activa
                                        </h3>
                                        <p class="text-green-700 dark:text-green-400">
                                            {{ currentMembership.membership }} -
                                            {{ currentMembership.cashback_percentage }}% cashback
                                        </p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-green-600">Cashback disponible:</span>
                                        <span class="font-semibold text-green-800"
                                            >${{ userCashback }}</span
                                        >
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-green-600">Cashback a ganar:</span>
                                        <span class="font-semibold text-green-800"
                                            >${{ cashbackToEarn.toFixed(2) }}</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <!-- Selección de dirección -->
                            <div
                                class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
                            >
                                <div class="flex items-center gap-3 mb-6">
                                    <div
                                        class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
                                    >
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <h3 class="text-xl font-semibold text-title dark:text-white">
                                        Dirección de Envío
                                    </h3>
                                </div>

                                <div v-if="isLoadingAddresses" class="flex justify-center py-8">
                                    <div
                                        class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
                                    ></div>
                                </div>

                                <div v-else-if="!addresses.length" class="py-8 text-center">
                                    <div
                                        class="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"
                                    >
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                                        No tienes direcciones guardadas
                                    </p>
                                    <router-link
                                        to="/my-profile/addresses"
                                        class="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300"
                                    >
                                        <i class="fas fa-plus"></i>
                                        <span>Agregar Dirección</span>
                                    </router-link>
                                </div>

                                <div v-else class="space-y-3">
                                    <div
                                        v-for="address in addresses"
                                        :key="address.id"
                                        @click="selectedAddressId = address.id"
                                        :class="
                                            selectedAddressId === address.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-200 dark:border-gray-700'
                                        "
                                        class="p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <div class="flex items-start justify-between">
                                            <div class="flex items-start gap-3">
                                                <div
                                                    class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1"
                                                >
                                                    <i class="fas fa-home"></i>
                                                </div>
                                                <div>
                                                    <h4
                                                        class="font-semibold text-title dark:text-white"
                                                    >
                                                        {{ address.name }}
                                                    </h4>
                                                    <p
                                                        class="text-sm text-gray-600 dark:text-gray-400 mt-1"
                                                    >
                                                        {{ address.street }} {{ address.number }},
                                                        {{ address.neighborhood }}
                                                    </p>
                                                    <p class="text-sm text-gray-500">
                                                        {{ address.district }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                v-if="selectedAddressId === address.id"
                                                class="text-primary"
                                            >
                                                <i class="fas fa-check-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Selección de método de pago -->
                            <div
                                class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
                            >
                                <div class="flex items-center gap-3 mb-6">
                                    <div
                                        class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"
                                    >
                                        <i class="fas fa-credit-card"></i>
                                    </div>
                                    <h3 class="text-xl font-semibold text-title dark:text-white">
                                        Método de Pago
                                    </h3>
                                </div>

                                <!-- Opciones de método de pago -->
                                <div class="space-y-4 mb-6">
                                    <!-- Tarjeta de crédito -->
                                    <div
                                        @click="selectedPaymentMethod = 'card'"
                                        :class="
                                            selectedPaymentMethod === 'card'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-200 dark:border-gray-700'
                                        "
                                        class="p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-3">
                                                <div
                                                    class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
                                                >
                                                    <i class="fas fa-credit-card"></i>
                                                </div>
                                                <div>
                                                    <h4
                                                        class="font-semibold text-title dark:text-white"
                                                    >
                                                        Tarjeta de Crédito/Débito
                                                    </h4>
                                                    <p
                                                        class="text-sm text-gray-600 dark:text-gray-400"
                                                    >
                                                        Pago con tarjeta
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                v-if="selectedPaymentMethod === 'card'"
                                                class="text-primary"
                                            >
                                                <i class="fas fa-check-circle"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Cashback -->
                                    <div
                                        @click="selectedPaymentMethod = 'cashback'"
                                        :class="[
                                            selectedPaymentMethod === 'cashback'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-200 dark:border-gray-700',
                                            !canUseCashback
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'cursor-pointer hover:border-primary hover:bg-primary/5',
                                        ]"
                                        class="p-4 border rounded-lg transition-all duration-300"
                                    >
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-3">
                                                <div
                                                    class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"
                                                >
                                                    <i class="fas fa-coins"></i>
                                                </div>
                                                <div>
                                                    <h4
                                                        class="font-semibold text-title dark:text-white"
                                                    >
                                                        Cashback
                                                    </h4>
                                                    <p
                                                        class="text-sm text-gray-600 dark:text-gray-400"
                                                    >
                                                        Disponible: ${{ userCashback }}
                                                        <span
                                                            v-if="!canUseCashback"
                                                            class="text-red-500 ml-2"
                                                            >(Insuficiente)</span
                                                        >
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                v-if="selectedPaymentMethod === 'cashback'"
                                                class="text-primary"
                                            >
                                                <i class="fas fa-check-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Selección de tarjeta (solo si método es tarjeta) -->
                                <div
                                    v-if="selectedPaymentMethod === 'card'"
                                    class="border-t border-gray-200 dark:border-gray-700 pt-6"
                                >
                                    <h4 class="font-semibold text-title dark:text-white mb-4">
                                        Seleccionar Tarjeta
                                    </h4>

                                    <div v-if="isLoadingCards" class="flex justify-center py-4">
                                        <div
                                            class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"
                                        ></div>
                                    </div>

                                    <div v-else-if="!cards.length" class="py-4 text-center">
                                        <p class="text-gray-600 dark:text-gray-400 mb-3">
                                            No tienes tarjetas guardadas
                                        </p>
                                        <router-link
                                            to="/client/method-payment"
                                            class="inline-flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm transition-all duration-300"
                                        >
                                            <i class="fas fa-plus"></i>
                                            <span>Agregar Tarjeta</span>
                                        </router-link>
                                    </div>

                                    <div v-else class="space-y-3">
                                        <div
                                            v-for="card in cards"
                                            :key="card.id"
                                            @click="selectedCardId = card.id"
                                            :class="
                                                selectedCardId === card.id
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-gray-200 dark:border-gray-700'
                                            "
                                            class="p-3 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                        >
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-3">
                                                    <div
                                                        class="text-xl"
                                                        :class="getCardBrandColor(card.brand)"
                                                    >
                                                        <i
                                                            :class="getCardBrandIcon(card.brand)"
                                                        ></i>
                                                    </div>
                                                    <div>
                                                        <div
                                                            class="font-mono text-sm font-medium text-title dark:text-white"
                                                        >
                                                            {{ card.masked_number }}
                                                        </div>
                                                        <div class="text-xs text-gray-500">
                                                            {{ card.brand }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="selectedCardId === card.id"
                                                    class="text-primary"
                                                >
                                                    <i class="fas fa-check-circle"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Columna derecha: Resumen del pedido -->
                    <div class="lg:col-span-4">
                        <div
                            class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 sticky top-8"
                        >
                            <div class="flex items-center gap-3 mb-6">
                                <div
                                    class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"
                                >
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">
                                    Resumen del Pedido
                                </h3>
                            </div>

                            <!-- Productos en el carrito -->
                            <div v-if="isLoading" class="flex justify-center py-8">
                                <div
                                    class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
                                ></div>
                            </div>

                            <div v-else class="space-y-4 mb-6">
                                <div
                                    v-for="item in getUserCartItems"
                                    :key="item.productId"
                                    class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <img
                                        :src="getProductImage(item.productId)"
                                        :alt="getProductName(item.productId)"
                                        class="w-12 h-12 object-cover rounded"
                                    />
                                    <div class="flex-1">
                                        <h4
                                            class="font-medium text-sm text-title dark:text-white line-clamp-2"
                                        >
                                            {{
                                                getProductDisplayName(
                                                    item.productId,
                                                    item.presentationId,
                                                )
                                            }}
                                        </h4>
                                        <p class="text-xs text-gray-500">
                                            Cantidad: {{ item.quantity }} × ${{
                                                item.price
                                            }}
                                        </p>
                                    </div>
                                    <div class="text-sm font-semibold text-title dark:text-white">
                                        ${{ (item.quantity * item.price) }}
                                    </div>
                                </div>
                            </div>

                            <!-- Resumen de precios -->
                            <div
                                class="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4"
                            >
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                    <span class="font-medium text-title dark:text-white"
                                        >${{ subtotal }}</span
                                    >
                                </div>

                                <div
                                    v-if="selectedPaymentMethod === 'cashback'"
                                    class="flex justify-between text-sm"
                                >
                                    <span class="text-gray-600 dark:text-gray-400"
                                        >Pago con cashback:</span
                                    >
                                    <span class="font-medium text-green-600"
                                        >-${{ Math.min(subtotal, userCashback) }}</span
                                    >
                                </div>

                                <div
                                    v-if="
                                        selectedPaymentMethod === 'cashback' &&
                                        subtotal > userCashback
                                    "
                                    class="flex justify-between text-sm"
                                >
                                    <span class="text-gray-600 dark:text-gray-400"
                                        >Restante (tarjeta):</span
                                    >
                                    <span class="font-medium text-title dark:text-white"
                                        >${{ (subtotal - userCashback) }}</span
                                    >
                                </div>

                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600 dark:text-gray-400">Envío:</span>
                                    <span class="font-medium text-green-600">Gratis</span>
                                </div>

                                <hr class="border-gray-200 dark:border-gray-700" />

                                <div class="flex justify-between text-lg font-semibold">
                                    <span>Total:</span>
                                    <span class="text-primary">${{ finalTotal }}</span>
                                </div>

                                <div
                                    v-if="currentMembership && selectedPaymentMethod === 'card'"
                                    class="text-sm text-green-600"
                                >
                                    Ganarás ${{ cashbackToEarn.toFixed(2) }} en cashback
                                </div>
                            </div>

                            <!-- Botón de compra -->
                            <button
                                @click="processOrder"
                                :disabled="!canProceedToPayment || isProcessing"
                                class="w-full h-12 bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 mt-6"
                            >
                                <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
                                <i v-else class="fas fa-lock"></i>
                                <span>
                                    {{ isProcessing ? 'Procesando...' : 'Finalizar Compra' }}
                                </span>
                            </button>

                            <!-- Información de seguridad -->
                            <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div
                                    class="flex items-center gap-2 text-sm text-green-700 dark:text-green-400"
                                >
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Compra segura con encriptación SSL</span>
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
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import { useCartStore } from '@/modules/products/stores/cart'
import { useAuthStore } from '@/modules/auth/stores/auth'
import { useQueries } from '@tanstack/vue-query'
import { fetchProductByIdAction } from '@/modules/products/actions/fetch-products.action'
import { getCurrentMembership } from '@/modules/client/actions/fetch-membership.action'
import { getAddresses } from '@/modules/client/actions/fetch-addresses.action'
import { getCardsToken } from '@/modules/client/actions/fetch-card.action'
import { createOrderAction } from '@/modules/cart/actions/create-order.action'
import type { CurrentMembership } from '@/modules/client/interfaces/acquare-membership.interface'
import type { Address } from '@/modules/client/interfaces/addresses.interface'
import type { CardToken } from '@/modules/client/interfaces/card-token.interface'
import type { CreateOrderPayload } from '@/modules/cart/interfaces/order.interface'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL

// Estados
const currentMembership = ref<CurrentMembership | null>(null)
const addresses = ref<Address[]>([])
const cards = ref<CardToken[]>([])
const isLoadingMembership = ref(true)
const isLoadingAddresses = ref(true)
const isLoadingCards = ref(true)
const isProcessing = ref(false)

// Selecciones
const selectedAddressId = ref<number | null>(null)
const selectedCardId = ref<number | null>(null)
const selectedPaymentMethod = ref<'card' | 'cashback'>('card')

// Datos del carrito
const getUserCartItems = computed(() => cartStore.cart)

const productIds = computed(() => {
    return [...new Set(getUserCartItems.value.map((item) => item.productId))]
})

const productQueries = useQueries({
    queries: computed(() =>
        productIds.value.map((id) => ({
            queryKey: ['product', id],
            queryFn: () => fetchProductByIdAction(String(id)).then((res) => res.data),
            enabled: !!authStore.user && !!id,
            staleTime: 1000 * 60 * 5,
        })),
    ),
})

const products = computed(() => productQueries.value.map((q) => q.data).filter(Boolean))

const isLoading = computed(
    () => productQueries.value.some((q) => q.isLoading) || products.value.length === 0,
)

// Cálculos
const subtotal = computed(() =>
    getUserCartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
)

const userCashback = computed(() => {
    return authStore.user?.client.current_cashback || 0
})

const canUseCashback = computed(() => {
    return userCashback.value >= subtotal.value
})

const cashbackToEarn = computed(() => {
    if (!currentMembership.value || selectedPaymentMethod.value === 'cashback') return 0
    return subtotal.value * (currentMembership.value.cashback_percentage / 100)
})

const finalTotal = computed(() => {
    if (selectedPaymentMethod.value === 'cashback') {
        return Math.max(0, subtotal.value - userCashback.value)
    }
    return subtotal.value
})

const canProceedToPayment = computed(() => {
    const hasAddress = selectedAddressId.value !== null
    const hasValidPayment =
        selectedPaymentMethod.value === 'cashback' ||
        (selectedPaymentMethod.value === 'card' && selectedCardId.value !== null)
    const hasMembership = currentMembership.value !== null
    const hasItems = getUserCartItems.value.length > 0

    if (selectedPaymentMethod.value === 'cashback' && !canUseCashback.value) {
        return false
    }

    return hasAddress && hasValidPayment && hasMembership && hasItems
})

// Funciones para obtener datos
const fetchCurrentMembership = async () => {
    isLoadingMembership.value = true
    try {
        const data = await getCurrentMembership()
        if (data) {
            currentMembership.value = data
        }
    } catch (error) {
        console.error('Error al obtener membresía actual:', error)
    } finally {
        isLoadingMembership.value = false
    }
}

const fetchAddresses = async () => {
    isLoadingAddresses.value = true
    try {
        const data = await getAddresses()
        if (data) {
            addresses.value = data
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

// Funciones de utilidad
const getProductById = (productId: number) => {
    return products.value.find((product) => product && product.id === productId)
}

const getProductImage = (productId: number): string => {
    const product = getProductById(productId)
    if (product && product.images && product.images.length > 0) {
        return `${baseUrl}/${product.images[0].url_image}`
    }
    return '/placeholder.svg?height=80&width=80'
}

const getProductName = (productId: number): string => {
    const product = getProductById(productId)
    return product?.name || 'Producto'
}

const getProductDisplayName = (productId: number, presentationId: number): string => {
    const product = getProductById(productId)
    if (!product) return 'Cargando...'

    const presentation = product.presentations?.find((p) => p && p.id === presentationId)
    if (!presentation) return product.name

    let unitText = ''
    if (typeof presentation.unit_measurement === 'string') {
        unitText = presentation.unit_measurement
    } else if (presentation.unit_measurement && typeof presentation.unit_measurement === 'object') {
        unitText = presentation.unit_measurement || ''
    }

    return `${product.name} / ${presentation.amount} ${unitText}`
}

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
    return 'text-gray-600'
}

// Procesar orden
const processOrder = async () => {
    if (!canProceedToPayment.value) {
        alert('Por favor completa todos los campos requeridos')
        return
    }

    isProcessing.value = true

    try {
        const payload: CreateOrderPayload = {
            products: getUserCartItems.value.map((item) => ({
                product_id: item.productId,
                presentation_id: item.presentationId,
                amount: item.quantity,
            })),
            address_id: selectedAddressId.value!,
            card_token_id: selectedPaymentMethod.value === 'card' ? selectedCardId.value! : 0,
            payment_method_id: selectedPaymentMethod.value === 'card' ? 1 : 2,
        }

        const result = await createOrderAction(payload)

        if (result) {
            // Limpiar carrito
            cartStore.clearCart()

            // Redirigir a página de éxito
            alert('✅ Orden creada exitosamente!')
            router.push('/client/order-history')
        } else {
            alert('❌ Error al procesar la orden. Intenta nuevamente.')
        }
    } catch (error) {
        console.error('Error al procesar la orden:', error)
        alert('❌ Error al procesar la orden. Intenta nuevamente.')
    } finally {
        isProcessing.value = false
    }
}

onMounted(async () => {
    // Verificar si hay items en el carrito
    if (getUserCartItems.value.length === 0) {
        router.push('/cart')
        return
    }

    // Cargar datos necesarios
    await Promise.all([fetchCurrentMembership(), fetchAddresses(), fetchCards()])

    Aos.init()
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

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
