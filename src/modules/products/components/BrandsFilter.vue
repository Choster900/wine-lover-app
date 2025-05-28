<template>
    <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
        <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Fabricante</h4>
        <div v-if="isLoading" class="text-sm text-gray-500">Cargando fabricantes...</div>
        <div v-else class="nice-select select-active select-white" :class="isOpen ? 'open' : ''" @click="toggleDropdown">
            <span class="current">{{ selectedManufacturerName || 'Seleccionar fabricante' }}</span>
            <ul class="list">
                <li
                    class="option"
                    :class="{ 'selected': !selectedManufacturer }"
                    @click="handleSelect(undefined, $event)"
                >
                    Todos los fabricantes
                </li>
                <li
                    v-for="manufacturer in manufacturers"
                    :key="manufacturer.id"
                    class="option"
                    :class="{ 'selected': selectedManufacturer === manufacturer.id }"
                    @click="handleSelect(manufacturer.id, $event)"
                >
                    {{ manufacturer.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useManufacturersQuery } from '../composable/useManufacturersQuery'

interface Props {
  modelValue?: number
}

interface Emits {
  (e: 'update:modelValue', value: number | undefined): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { data: manufacturers, isLoading } = useManufacturersQuery()

const isOpen = ref(false)
const selectedManufacturer = ref<number | undefined>(props.modelValue)

const selectedManufacturerName = computed(() => {
  if (!selectedManufacturer.value || !manufacturers.value) return null
  const manufacturer = manufacturers.value.find(m => m.id === selectedManufacturer.value)
  return manufacturer?.name || null
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleSelect = (manufacturerId: number | undefined, event: MouseEvent) => {
  event.stopPropagation()
  selectedManufacturer.value = manufacturerId
  isOpen.value = false
  emit('update:modelValue', manufacturerId)
}

// Watch para sincronizar con props
watch(() => props.modelValue, (newValue) => {
  selectedManufacturer.value = newValue
})
</script>
