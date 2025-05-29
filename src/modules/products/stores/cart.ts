import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { useAuthStore } from '@/modules/auth/stores/auth'

interface CartItem {
  cartItemId: string
  productId: string
  presentationId: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as CartItem[]
  }),

  actions: {
    addItem(productId: string, presentationId: string, price: number, quantity: number) {
      const existingItem = this.cart.find(
        item => item.productId === productId && item.presentationId === presentationId
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.cart.push({
          cartItemId: nanoid(),
          productId,
          presentationId,
          price,
          quantity
        })
      }
    },

    updateQuantity(cartItemId: string, quantity: number) {
        const item = this.cart.find(i => i.cartItemId === cartItemId)
        if (item) item.quantity = quantity
    },

    removeItemById(cartItemId: string) {
        this.cart = this.cart.filter(i => i.cartItemId !== cartItemId)
    },

    clearCart() {
      this.cart = []
    }
  },

  getters: {
    getItems: (state) => state.cart,
    getItemCount: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    getTotal: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  persist: {
    key: () => {
      const authStore = useAuthStore()
      return `cart_user_${authStore.user?.id ?? 'guest'}`
    },
    storage: localStorage
  }
})
