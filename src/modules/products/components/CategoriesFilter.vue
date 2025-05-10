<template>
    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
        <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Categories</h4>
        <div class="grid gap-5">
            <label class="flex items-center gap-[10px] cursor-pointer">
                <input type="checkbox" class="hidden" v-model="selectedCategories" :value="'Chair'" />
                <span
                    class="w-4 h-4 rounded-[5px] border border-title dark:border-white flex items-center justify-center duration-300">
                    <svg v-if="selectedCategories.includes('Chair')" class="duration-300" width="9" height="8"
                        viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.05203 7.04122C2.87283 7.04122 2.69433 6.97322 2.5562 6.83864L0.532492 4.8553C0.253409 4.58189 0.249159 4.13351 0.522576 3.85372C0.796701 3.57393 1.24578 3.57039 1.52416 3.84309L3.05203 5.34122L7.61512 0.868804C7.89491 0.595387 8.34328 0.59822 8.6167 0.87872C8.89082 1.1578 8.88657 1.60689 8.60749 1.8803L3.54787 6.83864C3.40974 6.97322 3.23124 7.04122 3.05203 7.04122Z"
                            fill="#BB976D" />
                    </svg>
                </span>
                <span class="text-title dark:text-white select-none">Chair (6)</span>
            </label>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedCategories = ref([])
</script>
