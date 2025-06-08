<template>
    <!-- Header Banner -->
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Historial de Órdenes</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Inicio</router-link></li>
                <li>/</li>
                <li><router-link to="/my-profile">Mi Cuenta</router-link></li>
                <li>/</li>
                <li class="text-primary">Historial de Órdenes</li>
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
                                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <i class="fas fa-shopping-bag"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold text-title dark:text-white">Mis Órdenes</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Historial completo de tus compras</p>
                                </div>
                            </div>
                            
                            <!-- Filtros -->
                            <div class="flex items-center gap-3">
                                <select 
                                    v-model="selectedStatusId" 
                                    @change="handleStatusFilter"
                                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-secondary text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option :value="undefined">Todos los estados</option>
                                    <option 
                                        v-for="status in orderStatuses" 
                                        :key="status.id" 
                                        :value="status.id"
                                    >
                                        {{ status.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- Loading State -->
                        <div v-if="isLoading" class="flex justify-center items-center py-20">
                            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>

                        <!-- Empty State -->
                        <div v-else-if="!orders.length" class="text-center py-20">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <i class="fas fa-shopping-bag text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No hay órdenes</h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-6">
                                {{ selectedStatusId ? 'No se encontraron órdenes con este estado' : 'Aún no has realizado ninguna compra' }}
                            </p>
                            <router-link 
                                to="/products" 
                                class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300"
                            >
                                <i class="fas fa-shopping-cart"></i>
                                <span>Comenzar a Comprar</span>
                            </router-link>
                        </div>

                        <!-- Orders List -->
                        <div v-else class="space-y-4">
                            <div 
                                v-for="order in orders" 
                                :key="order.id"
                                class="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                            >
                                <!-- Order Header -->
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-start gap-4">
                                        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <i class="fas fa-receipt"></i>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-title dark:text-white">Orden #{{ order.code }}</h4>
                                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {{ formatDate(order.created_at) }}
                                            </p>
                                            <div class="flex items-center gap-2 mt-2">
                                                <span 
                                                    :class="getStatusColor(order.order_status)"
                                                    class="px-2 py-1 rounded-full text-xs font-medium"
                                                >
                                                    {{ order.order_status }}
                                                </span>
                                                <span class="text-sm text-gray-500">•</span>
                                                <span class="text-sm text-gray-600 dark:text-gray-400">
                                                    {{ order.items.length }} {{ order.items.length === 1 ? 'producto' : 'productos' }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="text-right">
                                        <div class="text-lg font-semibold text-title dark:text-white">
                                            ${{ order.total }}
                                        </div>
                                        <div v-if="order.cashback_generated > 0" class="text-sm text-green-600">
                                            +${{ order.cashback_generated }} cashback
                                        </div>
                                    </div>
                                </div>

                                <!-- Order Items Preview -->
                                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        <div 
                                            v-for="item in order.items.slice(0, 3)" 
                                            :key="item.product.id"
                                            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                        >
                                            <img 
                                                :src="getProductImage(item.product)" 
                                                :alt="item.product.name"
                                                class="w-12 h-12 object-cover rounded"
                                            >
                                            <div class="flex-1 min-w-0">
                                                <h5 class="font-medium text-sm text-title dark:text-white truncate">
                                                    {{ item.product.name }}
                                                </h5>
                                                <p class="text-xs text-gray-500">
                                                    {{ item.amount }} × ${{ item.unit_price }}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <!-- More items indicator -->
                                        <div 
                                            v-if="order.items.length > 3"
                                            class="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500"
                                        >
                                            <span class="text-sm">+{{ order.items.length - 3 }} más</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Order Actions -->
                                <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div class="text-sm text-gray-600 dark:text-gray-400">
                                        <i class="fas fa-map-marker-alt mr-1"></i>
                                        {{ order.address?.neighborhood || '' }}, {{ order.address?.street || '' }} #{{ order.address?.number || '' }}, {{ order.address?.district || '' }}
                                    </div>
                                    
                                    <div class="flex items-center gap-2">
                                        <button
                                            @click="viewOrderDetails(order)"
                                            class="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                                        >
                                            Ver Detalles
                                        </button>
                                        
                                        <button
                                            v-if="canReorder(order.order_status)"
                                            @click="reorderItems(order)"
                                            class="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300"
                                        >
                                            Reordenar
                                        </button>
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

    <!-- Order Details Modal -->
    <div 
        v-if="selectedOrder" 
        class="order-modal fixed inset-0 bg-opacity-90 flex items-center justify-center p-4"
        style="z-index: 9999 !important;"
        @click="closeOrderDetails"
    >
        <div 
            class="bg-white dark:bg-dark-secondary rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            @click.stop
        >
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-semibold text-title dark:text-white">
                        Detalles de la Orden #{{ selectedOrder.code }}
                    </h3>
                    <button 
                        @click="closeOrderDetails"
                        class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <!-- Order Summary -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h4 class="font-semibold text-title dark:text-white mb-2">Estado</h4>
                        <span 
                            :class="getStatusColor(selectedOrder.order_status)"
                            class="px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {{ selectedOrder.order_status }}
                        </span>
                    </div>
                    
                    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h4 class="font-semibold text-title dark:text-white mb-2">Total</h4>
                        <p class="text-lg font-semibold text-primary">${{ selectedOrder.total }}</p>
                    </div>
                    
                    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h4 class="font-semibold text-title dark:text-white mb-2">Cashback</h4>
                        <p class="text-lg font-semibold text-green-600">
                            ${{ selectedOrder.cashback_generated }}
                        </p>
                    </div>
                </div>

                <!-- Order Items -->
                <div class="mb-6">
                    <h4 class="font-semibold text-title dark:text-white mb-4">Productos</h4>
                    <div class="space-y-3">
                        <div 
                            v-for="item in selectedOrder.items" 
                            :key="item.product.id"
                            class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                            <img 
                                :src="getProductImage(item.product)" 
                                :alt="item.product.name"
                                class="w-16 h-16 object-cover rounded"
                            >
                            <div class="flex-1">
                                <h5 class="font-medium text-title dark:text-white">{{ item.product.name }}</h5>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    {{ item.presentation.amount }} {{ item.presentation.unit_measurement.abbreviation }}
                                </p>
                                <p class="text-sm text-gray-500">
                                    Cantidad: {{ item.amount }} × ${{ item.unit_price }}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="font-semibold text-title dark:text-white">
                                    ${{ item.subtotal_item }}
                                </p>
                                <p v-if="item.discount > 0" class="text-sm text-green-600">
                                    -${{ item.discount }} descuento
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Totals -->
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div class="space-y-2 max-w-sm ml-auto">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
                            <span class="font-medium">${{ selectedOrder.subtotal }}</span>
                        </div>
                        <div v-if="selectedOrder.total_discount > 0" class="flex justify-between text-sm">
                            <span class="text-gray-600 dark:text-gray-400">Descuento:</span>
                            <span class="font-medium text-green-600">-${{ selectedOrder.total_discount }}</span>
                        </div>
                        <div class="flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-2">
                            <span>Total:</span>
                            <span class="text-primary">${{ selectedOrder.total }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import ProfileTab from './ProfileTab.vue'
import TablePagination from '@/modules/common/components/TablePagination.vue'
import { getOrders, getOrderStatuses } from '../actions/fetch-orders.action'
import { useCartStore } from '@/modules/products/stores/cart'
import type { Order } from '@/modules/auth/interfaces'
import type { Product } from '@/modules/products/interfaces/product.interface'
import type { OrderStatuses } from '@/modules/orders/interfaces/orders.interface'
import type { GetOrderParams } from '@/modules/orders/interfaces/get-order-params.interface'

const router = useRouter()
const cartStore = useCartStore()

const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL

// Estados
const orders = ref<Order[]>([])
const orderStatuses = ref<OrderStatuses[]>([])
const isLoading = ref(true)
const isLoadingStatuses = ref(true)
const selectedOrder = ref<Order | null>(null)
const selectedStatusId = ref<number | undefined>(undefined)
const currentPage = ref(1)

// Paginación
const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    from: 0,
    to: 0
})

// Cargar estados de órdenes
const fetchOrderStatuses = async () => {
    isLoadingStatuses.value = true
    try {
        const response = await getOrderStatuses()
        if (response) {
            orderStatuses.value = response
        }
    } catch (error) {
        console.error('Error al cargar estados de órdenes:', error)
    } finally {
        isLoadingStatuses.value = false
    }
}

// Cargar órdenes
const fetchOrders = async (page: number = 1, statusId?: number) => {
    isLoading.value = true
    try {
        const params: GetOrderParams = {
            page,
            paginate: true,
            per_page: 1
        }
        
        if (statusId) {
            params.order_status_id = statusId
        }
        
        const response = await getOrders(params)
        if (response) {
            orders.value = response.data
            pagination.value = {
                currentPage: response.meta.current_page,
                totalPages: response.meta.last_page,
                total: response.meta.total,
                from: response.meta.from || 0,
                to: response.meta.to || 0
            }
        }
    } catch (error) {
        console.error('Error al cargar órdenes:', error)
    } finally {
        isLoading.value = false
    }
}

// Manejar cambio de página
const handlePageChange = (page: number) => {
    currentPage.value = page
    fetchOrders(page, selectedStatusId.value)
}

// Manejar filtro de estado
const handleStatusFilter = () => {
    currentPage.value = 1
    fetchOrders(1, selectedStatusId.value)
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

const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('pendiente') || statusLower.includes('pending')) {
        return 'bg-yellow-100 text-yellow-800'
    } else if (statusLower.includes('procesando') || statusLower.includes('processing')) {
        return 'bg-blue-100 text-blue-800'
    } else if (statusLower.includes('enviado') || statusLower.includes('shipped')) {
        return 'bg-purple-100 text-purple-800'
    } else if (statusLower.includes('entregado') || statusLower.includes('delivered')) {
        return 'bg-green-100 text-green-800'
    } else if (statusLower.includes('cancelado') || statusLower.includes('cancelled')) {
        return 'bg-red-100 text-red-800'
    }
    return 'bg-gray-100 text-gray-800'
}

const getProductImage = (product: Product): string => {
    if (product.images && product.images.length > 0) {
        return `${baseUrl}/${product.images[0].url_image}`
    }
    return '/placeholder.svg?height=80&width=80'
}

const canReorder = (status: string): boolean => {
    const statusLower = status.toLowerCase()
    return statusLower.includes('entregado') || statusLower.includes('delivered') || 
           statusLower.includes('cancelado') || statusLower.includes('cancelled')
}

// Acciones
const viewOrderDetails = (order: Order) => {
    console.log('Clicking Ver Detalles for order:', order.id);
    console.log('Current selectedOrder before:', selectedOrder.value);
    selectedOrder.value = JSON.parse(JSON.stringify(order)); // Deep copy to force reactivity
    console.log('Current selectedOrder after:', selectedOrder.value);
    
    // Force DOM update
    nextTick(() => {
        console.log('Modal should be visible now');
        const modal = document.querySelector('.order-modal');
        console.log('Modal element found:', modal);
    });
}

const closeOrderDetails = () => {
    selectedOrder.value = null
}

const reorderItems = (order: Order) => {
    // Agregar todos los items de la orden al carrito
    order.items.forEach(item => {
        cartStore.addToCart({
            productId: item.product.id,
            presentationId: item.presentation.id,
            quantity: item.amount,
            price: item.unit_price
        })
    })
    
    // Mostrar mensaje de éxito
    alert(`Se agregaron ${order.items.length} productos al carrito`)
    
    // Redirigir al carrito
    router.push('/cart')
}

onMounted(async () => {
    // Cargar estados y órdenes en paralelo
    await Promise.all([
        fetchOrderStatuses(),
        fetchOrders()
    ])
    
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

/* Modal animations */
.modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
    opacity: 0;
}

.order-modal {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 9999 !important;
    display: flex !important;
    backdrop-filter: blur(2px);
    transition: all 0.3s ease;
}

.order-modal .bg-white {
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}
</style>
