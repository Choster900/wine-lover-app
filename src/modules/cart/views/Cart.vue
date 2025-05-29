<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Cart</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Home</router-link></li>
                <li>/</li>
                <li class="text-primary">Cart</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100" data-aos="fade-up">
        <div class="container ">
            <div class="flex xl:flex-row flex-col gap-[30px] lg:gap-[30px] xl:gap-[70px]">
                <div class="flex-1 overflow-auto">
                    <div class="overflow-x-auto">
                        <table id="cart-table" class="responsive nowrap table-wrapper" style="width:100%">
                            <thead>
                                <tr>
                                <th class="text-lg px-4 py-3 text-left font-semibold text-title dark:text-white">Product Info</th>
                                <th class="text-lg px-4 py-3 text-left font-semibold text-title dark:text-white">Price</th>
                                <th class="text-lg px-4 py-3 text-left font-semibold text-title dark:text-white">Quantity</th>
                                <th class="text-lg px-4 py-3 text-left font-semibold text-title dark:text-white">Total</th>
                                <th class="text-lg px-4 py-3 text-center font-semibold text-title dark:text-white">Remove</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700" v-if="getUserCartItems.length > 0">
                                <tr
                                v-for="item in getUserCartItems"
                                :key="item.cartItemId"
                                class="hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                                >
                                <td class="px-4 py-3 w-[42%]">
                                    <div class="flex items-center gap-3 md:gap-4 lg:gap-6 cart-product">
                                    <div class="w-14 sm:w-20 flex-none py-3">
                                        <img
                                        :src="getProductImage(item.productId)"
                                        :alt="getProductName(item.productId)"
                                        class="w-full h-full object-cover rounded"
                                        >
                                    </div>
                                    <div class="flex-1">
                                        <h6 class="font-semibold leading-none mt-2">
                                        {{ getProductDisplayName(item.productId, item.presentationId) }}
                                        </h6>
                                    </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3">
                                    <span class="font-semibold text-title dark:text-white">${{ item.price }}</span>
                                </td>
                                <td class="px-4 py-3">
                                    <IncrementDecrement
                                    :initialCount="item.quantity"
                                    @update:count="newCount => handleCountUpdate(newCount, item.cartItemId)"
                                    />
                                </td>
                                <td class="px-4 py-3">
                                    <span class="font-semibold text-title dark:text-white">
                                    ${{ (item.quantity * item.price).toFixed(2) }}
                                    </span>
                                </td>
                                <td class="px-8 py-3 text-center">
                                    <button
                                    @click="removeFromCart(item.cartItemId)"
                                    class="w-8 h-8 bg-[#E8E9EA] dark:bg-dark-secondary flex items-center justify-center ml-auto duration-300 text-title dark:text-white"
                                    >
                                    <svg class="fill-current " width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.546875 1.70822L1.70481 0.550293L5.98646 4.83195L10.2681 0.550293L11.3991 1.6813L7.11746 5.96295L11.453 10.2985L10.295 11.4564L5.95953 7.12088L1.67788 11.4025L0.546875 10.2715L4.82853 5.98988L0.546875 1.70822Z" />
                                    </svg>
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                            <tbody v-else-if="isLoading">
                                <tr>
                                    <td colspan="5" class="text-center py-10 text-title dark:text-white">Cargando productos del carrito...</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="5" class="text-center py-10 text-title dark:text-white">Tu carrito está vacío</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div
                        class="bg-[#FAFAFA] dark:bg-dark-secondary pt-[30px] md:pt-[40px] px-[30px] md:px-[40px] pb-[30px] border border-[#17243026] border-opacity-15 rounded-xl">
                        <div class="text-right flex justify-end flex-col w-full ml-auto mr-0">
                            <div
                                class="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium">
                                <span>Subtotal:</span>
                                <span>${{ subtotal.toFixed(2) }}</span>
                            </div>
                            <div
                                class="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <span>Descuento:</span>
                                <span>${{ discount.toFixed(2) }}</span>
                            </div>
                        </div>

                        <div class="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk">
                            <div class="flex justify-between flex-wrap font-semibold leading-none text-2xl">
                                <span>Total:</span>
                                <span>&nbsp;${{ total.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="sm:mt-[10px] py-5 flex items-end gap-3 flex-wrap justify-end">
                        <router-link to="/products"
                            class="btn btn-sm btn-outline !text-title hover:!text-white before:!z-[-1] dark:!text-white dark:hover:!text-title">
                            Continuar Comprando
                        </router-link>
                        <router-link to="/checkout"
                            class="btn btn-sm btn-theme-solid !text-white hover:!text-primary before:!z-[-1]">
                            Checkout
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Aos from 'aos'
import bg from '@/assets/images/shortcode/breadcumb.jpg'
import { useCartStore } from '@/modules/products/stores/cart'
import { useAuthStore } from '@/modules/auth/stores/auth'
import { useQueries } from '@tanstack/vue-query'
import { fetchProductByIdAction } from '@/modules/products/actions/fetch-products.action'
import IncrementDecrement from '@/modules/products/components/IncrementDecrement.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()

const baseUrl = import.meta.env.VITE_BACKEND_STORAGE_URL

const getUserCartItems = computed(() => cartStore.cart)

const productIds = computed(() => {
  return [...new Set(getUserCartItems.value.map(item => item.productId))]
})

const productQueries = useQueries({
  queries: computed(() =>
    productIds.value.map(id => ({
      queryKey: ['product', id],
      queryFn: () => fetchProductByIdAction(String(id)).then(res => res.data),
      enabled: !!authStore.user && !!id,
      staleTime: 1000 * 60 * 5,
    }))
  )
})

const products = computed(() =>
  productQueries.value.map(q => q.data).filter(Boolean)
)

const isLoading = computed(() =>
  productQueries.value.some(q => q.isLoading) || products.value.length === 0
)

// Funciones helper para obtener información del producto de forma segura
const getProductById = (productId: number) => {
  return products.value.find(product => product && product.id === productId)
}

const getProductImage = (productId: number): string => {
  const product = getProductById(productId)
  if (product && product.images && product.images.length > 0) {
    return `${baseUrl}/${product.images[0].url_image}`
  }
  // Imagen placeholder si no hay imagen disponible
  return '/placeholder.svg?height=80&width=80'
}

const getProductName = (productId: number): string => {
  const product = getProductById(productId)
  return product?.name || 'Producto'
}

const getProductDisplayName = (productId: number, presentationId: number): string => {
  const product = getProductById(productId)
  if (!product) return 'Cargando...'

  const presentation = product.presentations?.find(p => p && p.id === presentationId)
  if (!presentation) return product.name

  // Manejar diferentes formatos de unit_measurement
  let unitText = ''
  if (typeof presentation.unit_measurement === 'string') {
    unitText = presentation.unit_measurement
  } else if (presentation.unit_measurement && typeof presentation.unit_measurement === 'object') {
    unitText = presentation.unit_measurement.abbreviation || presentation.unit_measurement.name || ''
  }

  return `${product.name} / ${presentation.amount} ${unitText}`
}

const subtotal = computed(() =>
  getUserCartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
)

const discount = computed(() => 0) // Aquí puedes cambiar la lógica de descuento si aplica

const total = computed(() => subtotal.value - discount.value)

const handleCountUpdate = (newCount: number, cartItemId: string) => {
  cartStore.updateQuantity(cartItemId, newCount)
}

const removeFromCart = (cartItemId: string) => {
  cartStore.removeItemById(cartItemId)
}

onMounted(() => {
  Aos.init()
  if (!authStore.user) {
    router.push('/auth/login')
  }
})
</script>
