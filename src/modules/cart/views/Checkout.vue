<template>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70"
        :style="{ backgroundImage: 'url(' + bg + ')' }">
        <div class="text-center w-full">
            <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">Checkout</h2>
            <ul
                class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                <li><router-link to="/">Home</router-link></li>
                <li>/</li>
                <li><router-link to="/cart">Cart</router-link></li>
                <li>/</li>
                <li class="text-primary">Checkout</li>
            </ul>
        </div>
    </div>

    <div class="s-py-100" data-aos="fade-up">
        <div class="container ">

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

const getProductById = (productId: number) => {
  return products.value.find(product => product && product.id === productId)
}

const getProductImage = (productId: number): string => {
  const product = getProductById(productId)
  if (product && product.images && product.images.length > 0) {
    return `${baseUrl}/${product.images[0].url_image}`
  }
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

const discount = computed(() => 0)

const total = computed(() => subtotal.value - discount.value)

const handleCountUpdate = (newCount: number, cartItemId: string) => {
  cartStore.updateQuantity(cartItemId, newCount)
}

const removeFromCart = (cartItemId: string) => {
  cartStore.removeItemById(cartItemId)
}

onMounted(() => {
  Aos.init()
})
</script>
