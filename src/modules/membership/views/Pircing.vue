<template>

    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white tQext-8 md:text-[40px] font-normal leading-none text-center">Pricing</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Home</router-link></li>
                <li>/</li>
                <li class="text-primary">Pricing</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100">
        <div class="container">
            <div class="max-w-xl mx-auto mb-8 text-center" data-aos="fade-up">
                <div>
                    <img :src="about" class="w-16 mx-auto" alt="">
                </div>
                <h3 class="font-medium leading-none mt-4 md:mt-6 text-2xl md:text-3xl">Choose Price Plan</h3>
                <p class="mt-3">Discover the ideal plan to suit your budget and requirements. Choose flexibility and
                    affordability with our tailored pricing options.</p>
            </div>
            <div class="mb-8 flex items-center justify-center">
                <div
                    class="switch-wrapper p-[5px] bg-[#F7F7F7] dark:bg-dark-card-bg border border-title/10 dark:border-white/10 rounded-[70px] mx-auto relative inline-flex">
                    <input id="monthly" type="radio" name="switch" checked @change="onInputChange()">
                    <input id="yearly" type="radio" name="switch" @change="onInputChange()">
                    <label for="monthly">Monthly</label>
                    <label for="yearly">Yearly</label>
                    <span class="highlighter"></span>
                </div>
            </div>
            <div
                class="flex flex-wrap justify-center lg:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[30px] max-w-[1342px] mx-auto">
                <div v-for="(item, index) in pricingData" :key="index"
                    class="w-full sm:w-[47%] lg:w-auto flex flex-col justify-between bg-primary bg-opacity-10 px-7 md:px-10 py-8 md:py-12 group"
                    data-aos="fade-up" data-aos-delay="100">
                    <div>
                        <h4 class="font-normal leading-none">{{ item.name }}</h4>
                        <span v-if="price"
                            class="block text-title dark:text-white text-4xl md:text-5xl font-bold leading-none mt-4 md:mt-6 duration-300 price"
                            data-monthly="9" data-yearly="99">{{ item.plans?.[0]?.price }}</span>
                        <span v-if="!price"
                            class="block text-title dark:text-white text-4xl md:text-5xl font-bold leading-none mt-4 md:mt-6 duration-300 price"
                            data-monthly="9" data-yearly="99">{{ item.plans?.[3]?.price }}</span>
                        <ul class="mt-4 md:mt-6 flex flex-col gap-[15px]">
                            <p>{{ item.description }}</p>
                        </ul>
                    </div>
                    <div class="mt-4 md:mt-6">
                        <router-link class="btn btn-theme-outline duration-300 group-hover:border-primary"
                            :to="`/cart/payment-confirmation/membership/${item.id}/${price ? 'monthly' : 'annual'}`"
                            data-text="Subscribe">
                            <span class="duration-300 group-hover:text-primary">Subscribe</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="py-12 bg-[#F3F3F3] dark:bg-dark-secondary">
        <div class="container">
            <Partner />
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import bg from '@/assets/images/shortcode/breadcumb.jpg'
import about from '@/assets/images/svg/about.svg'

import Aos from 'aos';

import Partner from '@/modules/shop/components/Partner.vue';
import { getAllMemberships } from '../actions/get-all-membership.action';
import { type Membership, type Plan } from '../interfaces/membership.interface';


const pricingData = ref<Membership[]>()
const fetchCards = async () => {
    const data = await getAllMemberships()
    if (data) {
        console.log(data);

        pricingData.value = data

    } else {
        alert('❌ Error al obtener las tarjetas.')
    }
}

onMounted(() => {
    Aos.init()
    fetchCards()
})

const price = ref(true)

const onInputChange = () => {
    price.value = !price.value
}
</script>

<style lang="scss" scoped></style>
