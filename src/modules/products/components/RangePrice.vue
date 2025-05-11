<template>
    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
        <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Price Range</h4>
        <div class="price-filter">
            <div style="max-width: 500px; margin: auto">
                <MultiRangeSlider :min="0" :max="100" :step="1" :ruler="false" :label="false" :minValue="barMinValue"
                    :maxValue="barMaxValue" @input="UpdateValues" />
            </div>
            <div class="price-filter-content mt-5">
                <div class="flex items-center gap-1">
                    <span class="text-[15px] leading-none">Price: ${{ barMinValue }} - ${{
                        barMaxValue }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface RangeEvent {
    minValue: number
    maxValue: number
}

import MultiRangeSlider from "multi-range-slider-vue";
import { ref } from "vue";


const barMinValue = ref(10)
const barMaxValue = ref(90)

const UpdateValues = (e: RangeEvent) => {
    barMinValue.value = e.minValue;
    barMaxValue.value = e.maxValue;
}

</script>

<style lang="scss" scoped></style>
