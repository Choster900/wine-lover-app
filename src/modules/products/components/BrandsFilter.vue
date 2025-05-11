<template>
    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
        <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Choose Brand</h4>
        <div class="nice-select select-active select-white" :class="isOpen ? 'open' : ''" @click="toggleDropdown">
            <span class="current">{{ selectedOption }}</span>
            <ul class="list">
                <li v-for="(item, index) in options" :key="index" data-value="1" class="option"
                    @click="handleSelect(item, $event)">
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';


const isOpen = ref(false)

const selectedOption = ref('Navana Furniture')


const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const options = [
    "Navana Furniture",
    "RFL Furniture",
    "Gazi Furniture",
    "Plastic Furniture",
    "Luxury Furniture",
];

const handleSelect = (option: string, event: MouseEvent) => {
    event.stopPropagation()
    selectedOption.value = option
    isOpen.value = false
}

</script>

<style lang="scss" scoped></style>
