<template>
    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
        <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Tipo de Calidad</h4>
        <div v-if="isLoading" class="text-sm text-gray-500">Cargando tipos de calidad...</div>
        <div v-else class="grid gap-5">
            <label
                v-for="quality in qualities"
                :key="quality.id"
                class="categoryies-iteem flex items-center gap-[10px] cursor-pointer"
            >
                <input
                    class="appearance-none hidden"
                    type="radio"
                    name="item-type"
                    :value="quality.id"
                    :checked="selectedQuality === quality.id"
                    @change="handleQualityChange(quality.id)"
                >
                <span
                    class="w-[18px] h-[18px] rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                    <svg
                        class="duration-300"
                        :class="selectedQuality === quality.id ? 'opacity-100' : 'opacity-0'"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="10" height="10" rx="5" fill="#BB976D" />
                    </svg>
                </span>
                <span
                    class="sm:text-lg text-title duration-300 dark:text-white block sm:leading-none transform translate-y-[1px] select-none text">
                    {{ quality.name }}
                </span>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQualityProductsQuery } from '../composable/useQualityProductsQuery'

interface Props {
  modelValue?: number
}

interface Emits {
  (e: 'update:modelValue', value: number | undefined): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { data: qualities, isLoading } = useQualityProductsQuery()

const selectedQuality = ref<number | undefined>(props.modelValue)

const handleQualityChange = (qualityId: number) => {
  selectedQuality.value = selectedQuality.value === qualityId ? undefined : qualityId
  emit('update:modelValue', selectedQuality.value)
}

// Watch para sincronizar con props
watch(() => props.modelValue, (newValue) => {
  selectedQuality.value = newValue
})
</script>
