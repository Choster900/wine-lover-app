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
    </div><!-- TODO: hacer componente esto -->

    <div class="s-py-100" data-aos="fade-up">
        <div class="container ">
            <div class="flex xl:flex-row flex-col gap-[30px] lg:gap-[30px] xl:gap-[70px]">
                <div class="flex-1 overflow-auto">
                    <div class="overflow-x-auto  ">
                        <table id="cart-table" class="responsive nowrap table-wrapper" style="width:100%">
                            <thead class="   ">
                                <tr>
                                    <th class="text-lg px-4 py-3 text-left font-semibold text-title dark:text-white">
                                        Product
                                        Info</th>
                                    <th class="text-lg px-4 py-3 text-left font-semibold text-title dark:text-white">
                                        Price</th>
                                    <th class="text-lg px-4 py-3 text-left font-semibold text-title dark:text-white">
                                        Quantity
                                    </th>
                                    <th class="text-lg px-4 py-3 text-left font-semibold text-title dark:text-white">
                                        Total</th>
                                    <th class="text-lg px-4 py-3 text-center font-semibold text-title dark:text-white">
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="item in getUserCartItems" :key="item.id"
                                    class="hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                                    <td class="px-4 py-3 w-[42%]">
                                    <td class="w-[42%]">
                                        <div class="flex items-center gap-3 md:gap-4 lg:gap-6 cart-product">
                                            <div class="w-14 sm:w-20 flex-none py-3">
                                                <img :src="(() => {
                                                    const product = products.find(product => product && product.id === item.productId)
                                                    return product ? `${baseUrl}/storage/${product.images[0].url_image}` : '/images/default-product.jpg'
                                                })()" alt="product">
                                            </div>
                                            <div class="flex-1">
                                                <h6 class="leading-none font-medium">{{
                                                    (() => {
                                                        const product = products.find(product => product && product.id ===
                                                            item.productId)
                                                        return product ? product.name : 'Producto no encontrado'
                                                    })()
                                                }}</h6>
                                                <h5 class="font-semibold leading-none mt-2">
                                                    <router-link to="#">
                                                        {{
                                                            (() => {
                                                                const product = products.find(product => product && product.id
                                                                    ===
                                                                    item.productId)
                                                                return product ? product.description : 'Producto no encontrado'
                                                            })()
                                                        }}
                                                    </router-link>
                                                </h5>
                                            </div>
                                        </div>
                                    </td>
                                    </td>
                                    <td class="px-4 py-3">
                                        <span class="font-semibold text-title dark:text-white">${{ item.price }}</span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <IncrementDecrement :initialCount="item.quantity"
                                            @update:count="newCount => handleCountUpdate(newCount, item.cartItemId)" />
                                    </td>
                                    <td class="px-4 py-3">
                                        <span class="font-semibold text-title dark:text-white">
                                            ${{ (item.quantity * item.price).toFixed(2) }}
                                        </span>
                                    </td>
                                    <td class="px-8 py-3 text-center">
                                        <button @click="removeFromCart(item.cartItemId)"
                                            class="w-8 h-8 bg-[#E8E9EA] dark:bg-dark-secondary flex items-center justify-center ml-auto duration-300 text-title dark:text-white">
                                            <svg class="fill-current " width="12" height="12" viewBox="0 0 12 12"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0.546875 1.70822L1.70481 0.550293L5.98646 4.83195L10.2681 0.550293L11.3991 1.6813L7.11746 5.96295L11.453 10.2985L10.295 11.4564L5.95953 7.12088L1.67788 11.4025L0.546875 10.2715L4.82853 5.98988L0.546875 1.70822Z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div>
                    <div class="mb-[30px]">
                        <h4 class="text-lg md:text-xl font-semibold leading-none text-title dark:text-white mb-[15px]">
                            Promo Code
                        </h4>
                        <div class="flex xs:flex-row flex-col gap-3">
                            <input
                                class="h-12 md:h-14 bg-snow dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300 placeholder:text-title dark:placeholder:text-white flex-1"
                                type="text" placeholder="Coupon Code">
                            <button class="btn btn-solid" data-text="Apply">
                                <span>Apply</span>
                            </button>
                        </div>
                    </div>
                    <div
                        class="bg-[#FAFAFA] dark:bg-dark-secondary pt-[30px] md:pt-[40px] px-[30px] md:px-[40px] pb-[30px] border border-[#17243026] border-opacity-15 rounded-xl">
                        <div class="text-right flex justify-end flex-col w-full ml-auto mr-0">
                            <div
                                class="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium">
                                <span>Sub Total:</span>
                                <span>$870</span>
                            </div>
                            <div
                                class="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <span>Coupon Discount:</span>
                                <span>-$20</span>
                            </div>
                            <div
                                class="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <span>VAT:</span>
                                <span> $5</span>
                            </div>

                        </div>
                        <div class="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk">
                            <div
                                class="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <div>
                                    <label class="flex items-center gap-[10px] categoryies-iteem">
                                        <input class="appearance-none hidden" type="radio" name="item-type">
                                        <span
                                            class="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            <svg class="duration-300 opacity-0" width="8" height="8" viewBox="0 0 10 10"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="10" height="10" rx="5" fill="#BB976D" />
                                            </svg>
                                        </span>
                                        <span
                                            class="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">Free
                                            Shipping:</span>
                                    </label>
                                </div>
                                <span> $0</span>
                            </div>
                            <div
                                class="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <div>
                                    <label class="flex items-center gap-[10px] categoryies-iteem">
                                        <input class="appearance-none hidden" type="radio" name="item-type">
                                        <span
                                            class="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            <svg class="duration-300 opacity-0" width="8" height="8" viewBox="0 0 10 10"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="10" height="10" rx="5" fill="#BB976D" />
                                            </svg>
                                        </span>
                                        <span
                                            class="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">
                                            Fast Shipping:</span>
                                    </label>
                                </div>
                                <span>$10</span>
                            </div>
                            <div
                                class="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <div>
                                    <label class="flex items-center gap-[10px] categoryies-iteem">
                                        <input class="appearance-none hidden" type="radio" name="item-type">
                                        <span
                                            class="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            <svg class="duration-300 opacity-0" width="8" height="8" viewBox="0 0 10 10"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="10" height="10" rx="5" fill="#BB976D" />
                                            </svg>
                                        </span>
                                        <span
                                            class="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">
                                            Local Pickup:</span>
                                    </label>
                                </div>
                                <span>$15</span>
                            </div>
                        </div>
                        <div class="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk">
                            <div class="flex justify-between flex-wrap font-semibold leading-none text-2xl">
                                <span>Total:</span>
                                <span>&nbsp;$850</span>
                            </div>
                        </div>
                    </div>
                    <div class="sm:mt-[10px] py-5 flex items-end gap-3 flex-wrap justify-end">
                        <router-link to="/shop-v1"
                            class="btn btn-sm btn-outline !text-title hover:!text-white before:!z-[-1] dark:!text-white dark:hover:!text-title">
                            Continue Shopping
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
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/auth'
import { useQueries } from '@tanstack/vue-query'
import { fetchProductByIdAction } from '@/modules/products/actions/fetch-products.action'
import Aos from 'aos'
import IncrementDecrement from '@/modules/products/components/IncrementDecrement.vue';
import bg from '@/assets/images/shortcode/breadcumb.jpg'

const CART_KEY = 'cart'
const authStore = useAuthStore()
const userCartItems = ref<any[]>([])
const baseUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Inicializar desde localStorage al recargar
authStore.initAuthFromStorage()

onMounted(() => {
    Aos.init()
    const storedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    userCartItems.value = storedCart.filter((item: any) => item.userId === authStore.user?.id)
})


// 🔄 Obtener productos del carrito del usuario autenticado
const getUserCartItems = computed(() => {
    return userCartItems.value
})


const productIds = computed(() => {
    return [...new Set(getUserCartItems.value.map(item => item.productId))]
})


// ✅ Lanzar múltiples consultas en paralelo con useQueries
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

// 📦 Productos cargados exitosamente
const products = computed(() =>
    productQueries.value
        .map(q => q.data)
        .filter(Boolean) // elimina `undefined`
)

// 🔄 Estado de carga global (si alguna query está cargando)
const loading = computed(() =>
    productQueries.value.some(q => q.isLoading)
)

const handleCountUpdate = (newCount: number, cartItemId: string) => {

    /*  if (newCount <= 1) return */

    console.log('Nuevo valor:', newCount)

    const storedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')

    const updatedCart = storedCart.map((item: any) => {
        if (item.cartItemId === cartItemId) {
            return {
                ...item,
                quantity: newCount
            }
        }
        return item
    })

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart))

    // ⚠️ Solo actualiza los del usuario actual
    userCartItems.value = updatedCart.filter((item: any) => item.userId === authStore.user?.id)
}

const removeFromCart = (cartItemId: string) => {
    const storedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')

    const updatedCart = storedCart.filter((item: any) => item.cartItemId !== cartItemId)

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart))

    // Actualiza el carrito del usuario actual
    userCartItems.value = updatedCart.filter((item: any) => item.userId === authStore.user?.id)
}

</script>
