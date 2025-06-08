<template>
    <div class="flex items-center gap-4 sm:gap-6">
        <router-link
            v-if="!auth.user"
            to="/auth/login"
            class="text-lg leading-none text-title dark:text-white transition-all duration-300 hover:text-primary hidden lg:block"
        >
            Login
        </router-link>
        <router-link
            v-if="!auth.user"
            to="/auth/register"
            class="text-lg leading-none text-title dark:text-white transition-all duration-300 hover:text-primary hidden lg:block"
        >
            Registro
        </router-link>

        <button class="relative hdr_cart_btn" @click="cartList = !cartList">
            <span
                v-if="cartStore.cart.length > 0"
                class="absolute w-[22px] h-[22px] bg-secondary top-[0px] -right-[11px] rounded-full flex items-center justify-center text-xs leading-none text-white"
                >{{ cartStore.cart.length }}</span
            >
            <span
                class="mdi mdi-shopping-outline text-3xl dark:text-white text-[24px] sm:text-[28px]"
            ></span>
        </button>

        <div
            v-if="cartList"
            class="hdr_cart_popup w-80 md:w-96 absolute z-50 top-full right-0 sm:right-10 xl:right-0 bg-white dark:bg-title p-5 md:p-[30px] border border-primary shadow-lg rounded-lg"
        >
            <div class="flex items-center justify-between mb-4">
                <h4 class="font-medium text-xl md:text-2xl">Mi Carrito</h4>
                <span class="text-sm text-gray-500 dark:text-gray-400"
                    >{{ cartStore.cart.length }}
                    {{ cartStore.cart.length === 1 ? 'producto' : 'productos' }}</span
                >
            </div>

            <!-- Lista de productos vacía -->
            <div v-if="cartStore.cart.length === 0" class="py-8 text-center">
                <div
                    class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400"
                >
                    <span class="mdi mdi-cart-outline text-3xl"></span>
                </div>
                <p class="text-gray-500 dark:text-gray-400 mb-4">Tu carrito está vacío</p>
                <router-link
                    to="/products"
                    class="btn btn-theme-solid btn-sm"
                    data-text="Ver Productos"
                >
                    <span>Ver Productos</span>
                </router-link>
            </div>

            <!-- Lista de productos -->
            <div v-else>
                <div v-if="isLoadingProducts" class="py-8 text-center">
                    <div
                        class="w-10 h-10 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"
                    ></div>
                    <p class="text-gray-500 dark:text-gray-400">Cargando productos...</p>
                </div>

                <div v-else class="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    <div
                        v-for="item in cartStore.cart"
                        :key="item.cartItemId"
                        class="flex gap-3 relative py-3 group"
                    >
                        <!-- Imagen del producto -->
                        <div class="relative w-16 h-16 flex-shrink-0">
                            <img
                                class="w-full h-full object-cover rounded-md"
                                :src="getProductImage(item.productId)"
                                :alt="getProductName(item.productId)"
                                @error="(e) => (e.target.src = '/images/default-product.jpg')"
                            />
                        </div>

                        <!-- Detalles del producto -->
                        <div class="flex-1 min-w-0">
                            <!-- Nombre y precio -->
                            <div class="flex items-start justify-between">
                                <h6
                                    class="font-medium text-sm text-title dark:text-white truncate pr-4"
                                >
                                    {{ getProductName(item.productId) }}
                                </h6>
                                <span class="text-sm font-semibold text-primary"
                                    >${{ item.price * item.quantity }}</span
                                >
                            </div>

                            <!-- Presentación -->
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {{ getProductPresentation(item.productId, item.presentationId) }}
                            </p>

                            <!-- Precio unitario -->
                            <div class="flex items-center justify-between mt-2">
                                <span class="text-xs text-gray-500 dark:text-gray-400">
                                    ${{ item.price }} × {{ item.quantity }}
                                </span>

                                <!-- Botón eliminar -->
                                <button
                                    @click.stop="removeCartItem(item.cartItemId)"
                                    class="text-red-500 hover:text-red-700 transition-colors text-sm flex items-center gap-1"
                                >
                                    <span class="mdi mdi-delete-outline"></span>
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Subtotal y botones -->
                <div
                    v-if="!isLoadingProducts"
                    class="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700"
                >
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-gray-600 dark:text-gray-300">Subtotal:</span>
                        <span class="font-semibold text-lg text-title dark:text-white"
                            >${{ cartStore.getTotal.toFixed(2) }}</span
                        >
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <router-link
                            to="/cart"
                            class="btn btn-outline btn-sm"
                            data-text="Ver Carrito"
                            @click="cartList = false"
                        >
                            <span>Ver Carrito</span>
                        </router-link>
                        <router-link
                            to="/cart/checkout"
                            class="btn btn-theme-solid btn-sm"
                            data-text="Pagar"
                            @click="cartList = false"
                        >
                            <span>Pagar</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <button class="hamburger" :class="toggle ? 'opened' : ''" @click="handleToggle">
            <svg class="stroke-current text-title dark:text-white" width="40" viewBox="0 0 100 100">
                <path
                    class="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path class="line line2" d="M 20,50 H 80" />
                <path
                    class="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                />
            </svg>
        </button>
        <router-link v-if="auth.user" aria-label="" to="/client/my-profile">
            <i class="mdi mdi-account text-3xl dark:text-white text-[24px] sm:text-[28px]"></i>
        </router-link>

        <div class="w-[1px] bg-title/20 dark:bg-white/20 h-7 hidden sm:block"></div>

        <SwitcherS />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import { useAuthStore } from '@/modules/auth/stores/auth'
import { useCartStore } from '@/modules/products/stores/cart'
import { Product } from '@/modules/products/stores/products'
import { fetchProductByIdAction } from '@/modules/products/actions/fetch-products.action.ts'

const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL
const products = ref<Product[]>([])

const cartList = ref(false)
const isLoadingProducts = ref(true)

import SwitcherS from './Switcher-s.vue'

const emit = defineEmits(['toggle-change'])

const props = defineProps({
    toggle: Boolean,
})

function handleToggle() {
    emit('toggle-change', !props.toggle)
}

const auth = useAuthStore()
const cartStore = useCartStore()

// Cerrar el carrito al hacer clic fuera
const closeCartOnClickOutside = (event: MouseEvent) => {
    const cartPopup = document.querySelector('.hdr_cart_popup')
    const cartBtn = document.querySelector('.hdr_cart_btn')

    if (
        cartList.value &&
        cartPopup &&
        !cartPopup.contains(event.target as Node) &&
        cartBtn &&
        !cartBtn.contains(event.target as Node)
    ) {
        cartList.value = false
    }
}

// Obtener imagen del producto
const getProductImage = (productId: number): string => {
    const product = products.value.find((p) => p && p.id === productId)
    if (product && product.images && product.images.length > 0) {
        return `${baseUrl}/${product.images[0].url_image}`
    }
    return '/images/default-product.jpg'
}

// Obtener nombre del producto
const getProductName = (productId: number): string => {
    const product = products.value.find((p) => p && p.id === productId)
    return product ? product.name : 'Producto no disponible'
}

// Obtener presentación del producto
const getProductPresentation = (productId: number, presentationId: number): string => {
    const product = products.value.find((p) => p && p.id === productId)
    if (product && product.presentations) {
        const presentation = product.presentations.find((p) => p.id === presentationId)
        if (presentation) {
            return `${presentation.amount} ${presentation.unit_measurement}`
        }
    }
    return ''
}

// Eliminar producto del carrito
const removeCartItem = (cartItemId: string) => {
    cartStore.removeItemById(cartItemId)
}

// Cargar productos
const loadProducts = async () => {
    try {
        isLoadingProducts.value = true
        const productIds = cartStore.cart.map((item) => item.productId)
        if (productIds.length > 0) {
            for (const id of productIds) {
                const { data: productResponse } = await fetchProductByIdAction(id)
                products.value.push(productResponse)
            }
        }
    } catch (error) {
        console.error('Error al cargar productos:', error)
    } finally {
        isLoadingProducts.value = false
    }
}

onMounted(() => {
    loadProducts()
    document.addEventListener('click', closeCartOnClickOutside)
})

// Limpiar event listener
onUnmounted(() => {
    document.removeEventListener('click', closeCartOnClickOutside)
})
</script>

<style lang="scss" scoped>
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.5);
        border-radius: 20px;
    }
}

.hdr_cart_popup {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
}
</style>
