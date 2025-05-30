<template>

    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Payment Confirmation</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Home</router-link></li>
                <li>/</li>
                <li class="text-primary">Payment</li>
            </ul>
        </div>
    </div>
    <pre>
  </pre>

    <div class="s-py-100">
        <div class="container">
            <div class="max-w-[800px] mx-auto">
                <h3 class="font-semibold leading-none text-2xl md:text-3xl mb-[30px]">
                    Confirm Your Payment
                </h3>

                <div class="overflow-x-auto">
                    <table
                        class="min-w-full text-sm border-t border-t-dashed border-t-title pt-[30px] pb-[30px] aos-init aos-animate payment-confirmation-meta-table block border-b border-dashed border-title aos-init aos-animate">
                        <tbody class="w-full">
                            <tr class="first-th-item pb-4 text-base sm:text-lg text-paragraph dark:text-white">
                                <th class="text-base sm:text-lg font-normal">Date</th>
                                <th class='text-base sm:text-lg font-normal'>Card Holder</th>
                                <th class='text-base sm:text-lg font-normal'>Direccion de envio
                                </th>
                            </tr>
                            <tr class="first-td-item pb-12 text-lg sm:text-xl text-title dark:text-white font-medium">
                                <td>{{ new Date().
                                    toLocaleDateString('EN', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    }) }}
                                </td>

                                <td> {{ user?.client.names }}
                                    {{ user?.client.surnames }}</td>
                                <td>

                                    <div class="nice-select select-active bg-snow dark:bg-dark-secondary"
                                        :class="isOpen ? 'open' : ''" @click="toggleDropdown">
                                        <span class="current">{{ selectedAddressName || 'Selecciona una dirección'
                                            }}</span>
                                        <ul class="list">
                                            <li v-for="item in addresses" :key="item.id" :data-value="item.id"
                                                class="option" @click="selectAddress(item)">
                                                {{ item.name }}
                                            </li>
                                        </ul>
                                    </div>

                                </td>
                            </tr>
                            <tr v-for="card in cards" :key="card.id"
                                class="text-title dark:text-white text-lg sm:text-xl font-medium">
                                <td class="py-2">

                                    <label class="flex items-center gap-[10px] categoryies-iteem">
                                        <input class="appearance-none hidden" type="radio" name="card" :value="card.id"
                                            v-model="selectedCardId" />
                                        <span
                                            class="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            <svg class="duration-300 opacity-0" width="8" height="8" viewBox="0 0 10 10"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="10" height="10" rx="5" fill="#BB976D" />
                                            </svg>
                                        </span>
                                        <span
                                            class="sm:text-lg text-title dark:text-white block sm:leading-none select-none">
                                            Seleccione:
                                        </span>
                                    </label>
                                </td>
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

                <div class="flex justify-between items-center flex-wrap gap-4 mt-[30px]">
                    <h4 class="text-xl font-medium leading-none mb-0">
                        Subtotal : {{ selectedPlan?.price }}
                    </h4>
                    <div class="flex gap-3">
                        <router-link to="#" class="btn btn-secondory-solid" data-text="Cancel Payment">
                            <span>Cancel Payment</span>
                        </router-link>
                        <button @click="subscribeToMembership" class="btn btn-solid" data-text="Confirm Payment">
                            <span>Confirm Payment</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import bg from '@/assets/images/shortcode/breadcumb.jpg'

import { getAddresses } from '@/modules/client/actions/fetch-addresses.action'
import { getCardsToken } from '@/modules/client/actions/fetch-card.action'
import { getMembershipsById } from '@/modules/membership/actions/get-all-membership.action copy'

import type { Address } from '@/modules/client/interfaces/addresses.interface'
import type { CardToken } from '@/modules/client/interfaces/card-token.interface'
import type { Membership } from '@/modules/membership/interfaces/membership.interface'
import { acquireMembership } from '@/modules/client/actions/fetch-membership.action'

const route = useRoute()

const isOpen = ref(false)
const selectedOption = ref('Navana Furniture')
const selectedAddressName = ref<string | null>(null)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const selectedPlan = computed(() => {
    if (!membership.value?.plans) return null

    return membershipType === 'annual'
        ? membership.value.plans.find(plan => plan.plan.id === 4)
        : membership.value.plans.find(plan => plan.plan.id === 1)
})


const selectAddress = (address: Address) => {
    selectedAddressId.value = address.id
    selectedAddressName.value = address.name
    isOpen.value = false
}


const user = ref<any>(null)
const addresses = ref<Address[]>([])
const cards = ref<CardToken[]>([])
const membership = ref<Membership | null>(null)
const selectedCardId = ref<number | null>(null)
const selectedAddressId = ref<number | null>(null)


const type = route.params.type as string
const membershipId = route.params.membershipId as string
const membershipType = route.params.membershipType as string

const initializePage = async () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
        user.value = JSON.parse(storedUser)
        console.log('✅ Usuario cargado:', user.value)
    }

    await Promise.all([loadCards(), loadAddresses()])

    if (type === 'membership') {
        console.log('🛒 Compra de membresía:')
        console.log('- ID:', membershipId)
        console.log('- Tipo:', membershipType === 'annual' ? 'annual' : 'monthly')

        if (membershipId) await loadMembership(parseInt(membershipId))
    } else if (type === 'cart') {
        console.log('🛒 Compra desde carrito')
    } else {
        console.warn('⚠️ Tipo de compra no reconocido:', type)
    }
}

const loadCards = async () => {
    const data = await getCardsToken()
    if (data) {
        cards.value = data
    } else {
        alert('❌ Error al obtener las tarjetas registradas.')
    }
}

const loadAddresses = async () => {
    const data = await getAddresses()
    if (data) {
        addresses.value = data
    } else {
        alert('❌ Error al obtener las direcciones.')
    }
}

const loadMembership = async (id: number) => {
    const data = await getMembershipsById(id)
    if (data) {
        membership.value = data
        console.log('📦 Membresía cargada:', data)
    } else {
        alert('❌ Error al obtener la membresía.')
    }
}

interface Payload {
    automatic_renewal: boolean
    card_token_id: number
    address_id: number
    membership_id: number
    plan_id: number
    payment_method_id: number

}

const subscribeToMembership = async () => {
    if (!selectedCardId.value || !selectedAddressId.value) {
        alert('Por favor selecciona una tarjeta y una dirección.')
        return
    }

    if (!membershipId) {
        alert('No se encontró la membresía seleccionada.')
        return
    }

    const payload: Payload = {
        automatic_renewal: true,
        card_token_id: selectedCardId.value,
        address_id: selectedAddressId.value,
        membership_id: parseInt(membershipId),
        plan_id: membershipType === 'annual' ? 4 : 1,
        payment_method_id: 1,
    }

    const response = await acquireMembership(payload)

    if (response) {
        alert('✅ Suscripción completada con éxito.')
        console.log('Respuesta:', response)
    } else {
        alert('❌ Hubo un error al procesar la suscripción.')
    }
}


onMounted(() => {
    initializePage()
})
</script>

<style lang="scss" scoped></style>
