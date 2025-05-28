<template>
    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
        <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Categorias</h4>
        <div v-if="isLoading" class="text-sm text-gray-500">Cargando categorías...</div>
        <div v-else class="grid gap-5">
            <label
                v-for="category in categories"
                :key="category.id"
                class="flex items-center gap-[10px] cursor-pointer"
            >
                <input
                    type="checkbox"
                    class="hidden"
                    :value="category.id"
                    :checked="selectedCategories.includes(category.id)"
                    @change="handleCategoryChange(category.id, $event)"
                />
                <span
                    class="w-4 h-4 rounded-[5px] border border-title dark:border-white flex items-center justify-center duration-300">
                    <svg
                        v-if="selectedCategories.includes(category.id)"
                        class="duration-300"
                        width="9"
                        height="8"
                        viewBox="0 0 9 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.05203 7.04122C2.87283 7.04122 2.69433 6.97322 2.5562 6.83864L0.532492 4.8553C0.253409 4.58189 0.249159 4.13351 0.522576 3.85372C0.796701 3.57393 1.24578 3.57039 1.52416 3.84309L3.05203 5.34122L7.61512 0.868804C7.89491 0.595387 8.34328 0.59822 8.6167 0.87872C8.89082 1.1578 8.88657 1.60689 8.60749 1.8803L3.54787 6.83864C3.40974 6.97322 3.23124 7.04122 3.05203 7.04122Z"
                            fill="#BB976D" />
                    </svg>
                </span>
                <span class="text-title dark:text-white select-none">
                    {{ category.name }}
                </span>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCategoryProductsQuery } from '../composable/useCategoryProductsQuery'

interface Props {
  modelValue?: number[]
}

interface Emits {
  (e: 'update:modelValue', value: number[]): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
})

const emit = defineEmits<Emits>()

const { data: categories, isLoading } = useCategoryProductsQuery()

const selectedCategories = ref<number[]>([...props.modelValue])

const handleCategoryChange = (categoryId: number, event: Event) => {
  const target = event.target as HTMLInputElement

  if (target.checked) {
    if (!selectedCategories.value.includes(categoryId)) {
      selectedCategories.value.push(categoryId)
    }
  } else {
    selectedCategories.value = selectedCategories.value.filter(id => id !== categoryId)
  }

  emit('update:modelValue', selectedCategories.value)
}

// Watch para sincronizar con props
watch(() => props.modelValue, (newValue) => {
  selectedCategories.value = [...newValue]
}, { deep: true })
</script>
