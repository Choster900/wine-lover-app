<template>
    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
        <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Rango de Precio</h4>
        <div class="price-filter">
            <div style="max-width: 500px; margin: auto">
                <MultiRangeSlider
                    :min="0"
                    :max="1000"
                    :step="1"
                    :ruler="false"
                    :label="false"
                    :minValue="localMinValue"
                    :maxValue="localMaxValue"
                    @input="UpdateValues"
                />
            </div>
            <div class="price-filter-content mt-5">
                <div class="flex items-center gap-1">
                    <span class="text-[15px] leading-none">
                        Price: ${{ localMinValue }} - ${{ localMaxValue }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MultiRangeSlider from "multi-range-slider-vue"

interface RangeEvent {
    minValue: number
    maxValue: number
}

interface Props {
  minValue?: number
  maxValue?: number
}

interface Emits {
  (e: 'update:range', minValue: number, maxValue: number): void
}

const props = withDefaults(defineProps<Props>(), {
  minValue: 0,
  maxValue: 1000
})

const emit = defineEmits<Emits>()

const localMinValue = ref(props.minValue)
const localMaxValue = ref(props.maxValue)

const UpdateValues = (e: RangeEvent) => {
    localMinValue.value = e.minValue
    localMaxValue.value = e.maxValue
    emit('update:range', e.minValue, e.maxValue)
}

// Watch para sincronizar con props
watch(() => [props.minValue, props.maxValue], ([newMin, newMax]) => {
  localMinValue.value = newMin || 0
  localMaxValue.value = newMax || 1000
})
</script>
