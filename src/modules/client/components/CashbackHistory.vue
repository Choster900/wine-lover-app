<template>
    <!-- Header Banner -->
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Historial de Cashback</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li><router-link to="/my-profile">Mi Cuenta</router-link></li>
                <li>/</li>
                <li class="text-primary">Historial de Cashback</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100" data-aos="fade-up">
        <div class="container-fluid">
            <div
                class="max-w-[1720px] mx-auto flex items-start gap-8 md:gap-12 2xl:gap-24 flex-col md:flex-row my-profile-navtab">
                <!-- Sidebar Navigation -->
                <div class="w-full md:w-[200px] lg:w-[300px] flex-none">
                    <ProfileTab />
                </div>

                <!-- Main Content -->
                <div class="w-full md:w-auto md:flex-1">
                    <div class="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                        <!-- Header -->
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <i class="fas fa-coins"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold text-title dark:text-white">Mi Cashback</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Historial completo de tus recompensas</p>
                                </div>
                            </div>
                            
                            <!-- Filtros -->
                            <div class="flex items-center gap-3">
                                <select 
                                    v-model="selectedType" 
                                    @change="handleTypeFilter"
                                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-secondary text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Todos los tipos</option>
                                    <option value="earned">Ganado</option>
                                    <option value="used">Usado</option>
                                    <option value="expired">Expirado</option>
                                </select>
                            </div>
                        </div>

                        <!-- Loading State -->
                        <div v-if="isLoading" class="flex justify-center items-center py-20">
                            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>

                        <!-- Empty State -->
                        <div v-else-if="!cashbackHistory.length" class="text-center py-20">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <i class="fas fa-coins text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No hay historial de cashback</h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-6">
                                {{ selectedType ? 'No se encontraron transacciones de este tipo' : 'Aún no has generado cashback' }}
                            </p>
                            <router-link 
                                to="/products" 
                                class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300"
                            >
                                <i class="fas fa-shopping-cart"></i>
                                <span>Comenzar a Comprar</span>
                            </router-link>
                        </div>

                        <!-- Cashback History List -->
                        <div v-else class="space-y-4">
                            <div 
                                v-for="transaction in cashbackHistory" 
                                :key="transaction.id"
                                class="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                            >
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-4">
                                        <div 
                                            :class="getTransactionIcon(transaction.type)"
                                            class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                        >
                                            <i :class="getTransactionIconClass(transaction.type)"></i>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-title dark:text-white">
                                                {{ getTransactionTitle(transaction.type) }}
                                            </h4>
                                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {{ formatDate(transaction.created_at) }}
                                            </p>
                                            <div class="flex items-center gap-2 mt-2">
                                                <span 
                                                    :class="getTransactionBadgeColor(transaction.type)"
                                                    class="px-2 py-1 rounded-full text-xs font-medium"
                                                >
                                                    {{ getTransactionTypeLabel(transaction.type) }}
                                                </span>
                                                <span class="text-sm text-gray-500">•</span>
                                                <span class="text-sm text-gray-600 dark:text-gray-400">
                                                    Código: {{ transaction.transaction_code }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="text-right">
                                        <div 
                                            :class="getAmountColor(transaction.type)"
                                            class="text-lg font-semibold"
                                        >
                                            {{ getAmountPrefix(transaction.type) }}${{ Math.abs(transaction.amount) }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ getTransactionDescription(transaction.type) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pagination -->
                        <TablePagination
                            v-if="pagination.totalPages > 1"
                            :current-page="pagination.currentPage"
                            :total-pages="pagination.totalPages"
                            :total="pagination.total"
                            :from="pagination.from"
                            :to="pagination.to"
                            @page-change="handlePageChange"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import ProfileTab from './ProfileTab.vue'
import TablePagination from '@/modules/common/components/TablePagination.vue'
import { getOrders } from '../actions/fetch-cashback-history.action'
import type { CashbackHistory } from '@/modules/auth/interfaces'
import type { PaginationParams } from '@/modules/common/interfaces/pagination-params.interface'

// Estados
const cashbackHistory = ref<CashbackHistory[]>([])
const isLoading = ref(true)
const selectedType = ref<string>('')
const currentPage = ref(1)

// Paginación
const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    from: 0,
    to: 0
})

// Cargar historial de cashback
const fetchCashbackHistory = async (page: number = 1, type?: string) => {
    isLoading.value = true
    try {
        const params: PaginationParams = {
            page,
            paginate: true,
            per_page: 2
        }
        
        const response = await getOrders(params)
        if (response) {
            // Filtrar por tipo en el frontend si es necesario
            let filteredData = response.data
            if (type) {
                filteredData = response.data.filter(transaction => 
                    getTransactionTypeFromAmount(transaction.amount, transaction.type) === type
                )
            }
            
            cashbackHistory.value = filteredData
            pagination.value = {
                currentPage: response.meta.current_page,
                totalPages: response.meta.last_page,
                total: response.meta.total,
                from: response.meta.from || 0,
                to: response.meta.to || 0
            }
        }
    } catch (error) {
        console.error('Error al cargar historial de cashback:', error)
    } finally {
        isLoading.value = false
    }
}

// Manejar cambio de página
const handlePageChange = (page: number) => {
    currentPage.value = page
    fetchCashbackHistory(page, selectedType.value)
}

// Manejar filtro de tipo
const handleTypeFilter = () => {
    currentPage.value = 1
    fetchCashbackHistory(1, selectedType.value)
}

// Funciones de utilidad
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getTransactionTypeFromAmount = (amount: number, type: string) => {
    if (amount > 0) return 'earned'
    if (amount < 0) return 'used'
    return type.toLowerCase()
}

const getTransactionIcon = (type: string) => {
    const transactionType = type.toLowerCase()
    if (transactionType.includes('earned') || transactionType.includes('ganado')) {
        return 'bg-green-100 text-green-600'
    } else if (transactionType.includes('used') || transactionType.includes('usado')) {
        return 'bg-blue-100 text-blue-600'
    } else if (transactionType.includes('expired') || transactionType.includes('expirado')) {
        return 'bg-red-100 text-red-600'
    }
    return 'bg-gray-100 text-gray-600'
}

const getTransactionIconClass = (type: string) => {
    const transactionType = type.toLowerCase()
    if (transactionType.includes('earned') || transactionType.includes('ganado')) {
        return 'fas fa-plus'
    } else if (transactionType.includes('used') || transactionType.includes('usado')) {
        return 'fas fa-minus'
    } else if (transactionType.includes('expired') || transactionType.includes('expirado')) {
        return 'fas fa-clock'
    }
    return 'fas fa-coins'
}

const getTransactionTitle = (type: string) => {
    const transactionType = type.toLowerCase()
    if (transactionType.includes('earned') || transactionType.includes('ganado')) {
        return 'Cashback Ganado'
    } else if (transactionType.includes('used') || transactionType.includes('usado')) {
        return 'Cashback Utilizado'
    } else if (transactionType.includes('expired') || transactionType.includes('expirado')) {
        return 'Cashback Expirado'
    }
    return 'Transacción de Cashback'
}

const getTransactionTypeLabel = (type: string) => {
    const transactionType = type.toLowerCase()
    if (transactionType.includes('earned') || transactionType.includes('ganado')) {
        return 'Ganado'
    } else if (transactionType.includes('used') || transactionType.includes('usado')) {
        return 'Usado'
    } else if (transactionType.includes('expired') || transactionType.includes('expirado')) {
        return 'Expirado'
    }
    return type
}

const getTransactionBadgeColor = (type: string) => {
    const transactionType = type.toLowerCase()
    if (transactionType.includes('earned') || transactionType.includes('ganado')) {
        return 'bg-green-100 text-green-800'
    } else if (transactionType.includes('used') || transactionType.includes('usado')) {
        return 'bg-blue-100 text-blue-800'
    } else if (transactionType.includes('expired') || transactionType.includes('expirado')) {
        return 'bg-red-100 text-red-800'
    }
    return 'bg-gray-100 text-gray-800'
}

const getAmountColor = (type: string) => {
    const transactionType = type.toLowerCase()
    if (transactionType.includes('earned') || transactionType.includes('ganado')) {
        return 'text-green-600'
    } else if (transactionType.includes('used') || transactionType.includes('usado')) {
        return 'text-blue-600'
    } else if (transactionType.includes('expired') || transactionType.includes('expirado')) {
        return 'text-red-600'
    }
    return 'text-gray-600'
}

const getAmountPrefix = (type: string) => {
    const transactionType = type.toLowerCase()
    if (transactionType.includes('earned') || transactionType.includes('ganado')) {
        return '+'
    } else if (transactionType.includes('used') || transactionType.includes('usado')) {
        return '-'
    }
    return ''
}

const getTransactionDescription = (type: string) => {
    const transactionType = type.toLowerCase()
    if (transactionType.includes('earned') || transactionType.includes('ganado')) {
        return 'Agregado a tu cuenta'
    } else if (transactionType.includes('used') || transactionType.includes('usado')) {
        return 'Descontado de tu cuenta'
    } else if (transactionType.includes('expired') || transactionType.includes('expirado')) {
        return 'Cashback expirado'
    }
    return 'Transacción procesada'
}

onMounted(async () => {
    await fetchCashbackHistory()
    Aos.init()
})
</script>

<style scoped>
.s-py-100 {
    padding: 100px 0;
}

.transition-all {
    transition: all 0.3s ease;
}

.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
