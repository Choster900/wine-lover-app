<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Edit Account</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Home</router-link></li>
                <li>/</li>
                <li class="text-primary">Account</li>
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
                    <div class="w-full max-w-[951px] bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-8 lg:p-[50px]">
                        <div class="flex items-start flex-col lg:flex-row gap-5 sm:gap-6">
                            <div class="mt-10 border-t border-gray-300 pt-8">
                                <h3 class="text-xl font-semibold mb-6 text-title dark:text-white">Método de Pago</h3>
                                <div class="grid gap-5 sm:gap-6">
                                    <div>
                                        <label class="text-base md:text-lg text-title dark:text-white mb-2 block">Número
                                            de tarjeta</label>
                                        <input v-model="paymentMethod.card.number"
                                            class="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300"
                                            type="text" placeholder="5555 5555 5555 4444">
                                    </div>
                                    <div class="flex gap-4">
                                        <div class="w-1/2">
                                            <label
                                                class="text-base md:text-lg text-title dark:text-white mb-2 block">Mes
                                                de expiración</label>
                                            <input v-model="paymentMethod.card.expiration_month"
                                                class="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300"
                                                type="text" placeholder="MM">
                                        </div>
                                        <div class="w-1/2">
                                            <label
                                                class="text-base md:text-lg text-title dark:text-white mb-2 block">Año
                                                de expiración</label>
                                            <input v-model="paymentMethod.card.expiration_year"
                                                class="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300"
                                                type="text" placeholder="YYYY">
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            class="text-base md:text-lg text-title dark:text-white mb-2 block">CVV</label>
                                        <input v-model="paymentMethod.card.cvv"
                                            class="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300"
                                            type="text" placeholder="123">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-8 md:mt-12">
                            <button class="btn btn-solid" data-text="Save Change" @click="submitForm">
                                <span>Save Change</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="s-py-100">
            <div class="container">
                <div class="max-w-[800px] mx-auto">
                    <h3 class="font-semibold leading-none text-2xl md:text-3xl mb-[30px]">
                        Your Cards
                    </h3>
                    <div class="overflow-x-auto">
                        <table
                            class="min-w-full text-sm border-t border-t-dashed border-t-title pt-[30px] pb-[30px] border-b border-dashed border-title">
                            <thead>
                                <tr class="text-left text-paragraph dark:text-white font-semibold text-base sm:text-lg">
                                    <th class="py-2">Masked Number</th>
                                    <th class="py-2">Brand</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="card in cards" :key="card.id"
                                    class="text-title dark:text-white text-lg sm:text-xl font-medium">
                                    <td class="py-2">{{ card.masked_number }}</td>
                                    <td class="py-2">{{ card.brand }}</td>
                                </tr>
                                <tr v-if="cards.length === 0">
                                    <td colspan="2" class="text-center py-4 text-gray-500">No hay tarjetas registradas.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

import { addCard } from '../actions/add-card.action'
import type { CardToken } from '../interfaces/card-token.interface'
import { getCardsToken } from '../actions/get-cards-token.action'
import ProfileTab from './ProfileTab.vue'
import { getAddresses } from '../actions/get-addresses.action'
import type { Address } from '../interfaces/addresses.interface'

const paymentMethod = ref({
    card: {
        number: '',
        cvv: '',
        expiration_month: '',
        expiration_year: ''
    }
})

const cards = ref<CardToken[]>([])

const fetchCards = async () => {
    const data = await getCardsToken()
    if (data) {
        cards.value = data
    } else {
        alert('❌ Error al obtener las tarjetas.')
    }
}



const submitForm = async () => {
    const payload = paymentMethod.value.card
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
}

onMounted(() => {
    Aos.init()
    fetchCards()
})
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped></style>
