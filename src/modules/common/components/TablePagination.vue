<template>
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
        <!-- Botón anterior -->
        <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Anterior
        </button>

        <!-- Números de página -->
        <template v-for="page in visiblePages" :key="page">
            <button
                v-if="page !== '...'"
                @click="goToPage(page as number)"
                :class="[
                    'px-3 py-2 rounded-md border',
                    currentPage === page
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                ]"
            >
                {{ page }}
            </button>
            <span v-else class="px-3 py-2 text-gray-500">...</span>
        </template>

        <!-- Botón siguiente -->
        <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Siguiente
        </button>
    </div>

    <!-- Información de resultados -->
    <div v-if="total > 0" class="text-center mt-4 text-sm text-gray-600">
        Mostrando {{ from }} - {{ to }} de {{ total }} elementos
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  total: number
  from: number
  to: number
}

interface Emits {
  (e: 'page-change', page: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const { currentPage, totalPages } = props

  if (totalPages <= 7) {
    // Si hay 7 páginas o menos, mostrar todas
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Lógica para mostrar páginas con puntos suspensivos
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages)
    } else if (currentPage >= totalPages - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages)
    }
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>
