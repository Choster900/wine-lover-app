<template>
    <!-- Header Banner -->
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Métodos de Pago</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li><router-link to="/my-profile">Mi Cuenta</router-link></li>
                <li>/</li>
                <li class="text-primary">Métodos de Pago</li>
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
                        <!-- Add New Card Form -->
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <i class="fas fa-credit-card"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">Agregar Nueva Tarjeta</h3>
                            </div>

                            <!-- Card Preview -->
                            <div class="relative mb-8 w-full h-[200px] rounded-xl overflow-hidden perspective-card">
                                <div class="absolute inset-0 w-full h-full card-face card-front" :class="{'rotate-card': showCardBack}">
                                    <div class="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary rounded-xl p-6 flex flex-col justify-between">
                                        <div class="flex justify-between items-start">
                                            <div class="text-white text-sm">Tarjeta de Crédito/Débito</div>
                                            <div class="text-white text-xl">
                                                <i class="fab" :class="getCardBrandIcon(paymentMethod.card.number)"></i>
                                            </div>
                                        </div>
                                        <div class="text-white text-xl tracking-wider font-mono">
                                            {{ formatCardNumber(paymentMethod.card.number || '•••• •••• •••• ••••') }}
                                        </div>
                                        <div class="flex justify-between items-end">
                                            <div class="text-white text-sm">
                                                <div class="opacity-70 text-xs mb-1">Válida hasta</div>
                                                {{ formatExpiryDate(paymentMethod.card.expiration_month, paymentMethod.card.expiration_year) || 'MM/YY' }}
                                            </div>
                                            <div class="text-white text-sm">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/EMV_chip.svg/1200px-EMV_chip.svg.png" alt="Chip" class="w-10 h-8 object-contain" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 w-full h-full card-face card-back" :class="{'rotate-card': !showCardBack}">
                                    <div class="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex flex-col">
                                        <div class="w-full h-12 bg-gray-800 mt-6"></div>
                                        <div class="px-6 mt-6">
                                            <div class="bg-white/80 h-10 flex items-center justify-end px-4">
                                                <span class="font-mono">{{ paymentMethod.card.cvv || 'CVV' }}</span>
                                            </div>
                                            <div class="mt-4 text-white/70 text-xs text-right">
                                                El código de seguridad es necesario para completar transacciones en línea
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Form -->
                            <form @submit.prevent="submitForm" class="space-y-5">
                                <div>
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                        Número de Tarjeta
                                    </label>
                                    <div class="relative">
                                        <input
                                            v-model="paymentMethod.card.number"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 pl-10 outline-none transition-all duration-300"
                                            type="text"
                                            placeholder="5555 5555 5555 4444"
                                            maxlength="19"
                                            @input="formatCardNumberInput"
                                        >

                                        <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <i class="fab text-lg" :class="getCardBrandIcon(paymentMethod.card.number)"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-3 mt-5 gap-4">
                                    <div class="col-span-1">
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Mes
                                        </label>
                                        <select
                                            v-model="paymentMethod.card.expiration_month"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                        >
                                            <option value="" disabled selected>MM</option>
                                            <option v-for="month in 12" :key="month" :value="padZero(month)">
                                                {{ padZero(month) }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-span-1">
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            Año
                                        </label>
                                        <select
                                            v-model="paymentMethod.card.expiration_year"
                                            class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                        >
                                            <option value="" disabled selected>YYYY</option>
                                            <option v-for="year in getYearOptions()" :key="year" :value="year">
                                                {{ year }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-span-1">
                                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                            CVV
                                        </label>
                                        <div class="relative">
                                            <input
                                                v-model="paymentMethod.card.cvv"
                                                class="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-title dark:text-white focus:border-primary focus:ring-1 focus:ring-primary px-4 outline-none transition-all duration-300"
                                                type="text"
                                                placeholder="123"
                                                maxlength="4"
                                                @focus="showCardBack = true"
                                                @blur="showCardBack = false"
                                            >
                                            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" @click="showCardBack = !showCardBack">
                                                <i class="far fa-question-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="pt-4">
                                    <button
                                        type="submit"
                                        class="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i class="fas fa-save"></i>
                                        <span>Guardar Tarjeta</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Saved Cards -->
                        <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-title dark:text-white">Tarjetas Guardadas</h3>
                            </div>

                            <div v-if="isLoading" class="flex justify-center items-center py-12">
                                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>

                            <div v-else-if="cards.length === 0" class="py-12 text-center">
                                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <i class="fas fa-credit-card text-2xl"></i>
                                </div>
                                <h4 class="text-lg font-medium text-gray-600 dark:text-gray-400">No hay tarjetas guardadas</h4>
                                <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                    Agrega una tarjeta para realizar pagos más rápido
                                </p>
                            </div>

                            <div v-else class="space-y-4">
                                <div
                                    v-for="card in cards"
                                    :key="card.id"
                                    class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary hover:shadow-md transition-all duration-300"
                                >
                                    <div class="flex justify-between items-center">
                                        <div class="flex items-center gap-3">
                                            <div class="text-2xl" :class="getCardBrandColor(card.brand)">
                                                <i :class="getCardBrandIconByName(card.brand)"></i>
                                            </div>
                                            <div>
                                                <div class="font-mono text-lg font-medium text-title dark:text-white">
                                                    {{ card.masked_number }}
                                                </div>
                                                <div class="text-xs text-gray-500">
                                                    {{ card.brand }}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                                                @click="deleteCard(card.id)"
                                            >
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <i class="fas fa-shield-alt text-green-500"></i>
                                    <span>Tus datos de pago están protegidos con encriptación de nivel bancario</span>
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
import { ref, onMounted } from 'vue'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'

import { addCard, getCardsToken, removeCard } from '../actions/fetch-card.action'
import type { CardToken } from '../interfaces/card-token.interface'
import ProfileTab from './ProfileTab.vue'

const paymentMethod = ref({
    card: {
        number: '',
        cvv: '',
        expiration_month: '',
        expiration_year: ''
    }
})

const cards = ref<CardToken[]>([])
const isLoading = ref(true)
const showCardBack = ref(false)

// Función para formatear el número de tarjeta en grupos de 4
const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return ''
    return cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
}

// Función para formatear el número de tarjeta mientras se escribe
const formatCardNumberInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '')

    // Limitar a 16 dígitos
    if (value.length > 16) {
        value = value.slice(0, 16)
    }

    // Formatear en grupos de 4
    paymentMethod.value.card.number = value.replace(/(.{4})/g, '$1 ').trim()
}

// Función para formatear la fecha de expiración
const formatExpiryDate = (month: string, year: string) => {
    if (!month || !year) return ''
    return `${month}/${year.slice(-2)}`
}

// Función para agregar cero a números menores a 10
const padZero = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`
}

// Función para obtener opciones de años (actual + 10 años)
const getYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 0; i < 11; i++) {
        years.push(currentYear + i)
    }
    return years
}

// Función para determinar el ícono de la marca de tarjeta
const getCardBrandIcon = (cardNumber: string) => {
    const firstDigit = cardNumber.replace(/\D/g, '').charAt(0)

    if (cardNumber.replace(/\D/g, '').startsWith('34') || cardNumber.replace(/\D/g, '').startsWith('37')) {
        return 'fa-cc-amex text-blue-500'
    } else if (firstDigit === '4') {
        return 'fa-cc-visa text-blue-600'
    } else if (firstDigit === '5') {
        return 'fa-cc-mastercard text-orange-500'
    } else if (firstDigit === '6') {
        return 'fa-cc-discover text-orange-600'
    }

    return 'fa-credit-card text-gray-400'
}

// Función para obtener el ícono por nombre de marca
const getCardBrandIconByName = (brand: string) => {
    const brandLower = brand.toLowerCase()

    if (brandLower.includes('visa')) {
        return 'fab fa-cc-visa'
    } else if (brandLower.includes('mastercard')) {
        return 'fab fa-cc-mastercard'
    } else if (brandLower.includes('amex') || brandLower.includes('american')) {
        return 'fab fa-cc-amex'
    } else if (brandLower.includes('discover')) {
        return 'fab fa-cc-discover'
    }

    return 'fas fa-credit-card'
}

// Función para obtener el color de la marca
const getCardBrandColor = (brand: string) => {
    const brandLower = brand.toLowerCase()

    if (brandLower.includes('visa')) {
        return 'text-blue-600'
    } else if (brandLower.includes('mastercard')) {
        return 'text-orange-500'
    } else if (brandLower.includes('amex') || brandLower.includes('american')) {
        return 'text-blue-500'
    } else if (brandLower.includes('discover')) {
        return 'text-orange-600'
    }

    return 'text-gray-600'
}

const fetchCards = async () => {
    isLoading.value = true
    try {
        const data = await getCardsToken()
        if (data) {
            cards.value = data
        } else {
            console.error('Error al obtener las tarjetas')
        }
    } catch (error) {
        console.error('Error al obtener las tarjetas:', error)
    } finally {
        isLoading.value = false
    }
}

const submitForm = async () => {
    try {
        // Limpiar espacios del número de tarjeta
        const payload = {
            ...paymentMethod.value.card,
            number: paymentMethod.value.card.number.replace(/\s/g, '')
        }

        const tokenSaved = await addCard(payload)

        if (tokenSaved) {
            alert('✅ Tarjeta registrada exitosamente.')

            // Limpiar formulario
            paymentMethod.value.card = {
                number: '',
                cvv: '',
                expiration_month: '',
                expiration_year: ''
            }

            // Refrescar tarjetas
            await fetchCards()
        } else {
            alert('❌ Ocurrió un error al registrar la tarjeta. Intenta nuevamente.')
        }
    } catch (error) {
        console.error('Error al guardar la tarjeta:', error)
        alert('❌ Ocurrió un error al registrar la tarjeta. Intenta nuevamente.')
    }
}

const deleteCard = async (cardId: number) => {
    if (confirm('¿Estás seguro de eliminar esta tarjeta?')) {
        try {
            const result = await removeCard(cardId)
            if (result) {
                alert('✅ Tarjeta eliminada exitosamente.')
                await fetchCards()
            } else {
                alert('❌ Ocurrió un error al eliminar la tarjeta.')
            }
        } catch (error) {
            console.error('Error al eliminar la tarjeta:', error)
            alert('❌ Ocurrió un error al eliminar la tarjeta.')
        }
    }
}

onMounted(() => {
    Aos.init()
    fetchCards()
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
</style>
