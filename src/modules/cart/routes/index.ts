import type { RouteRecordRaw } from 'vue-router'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

const MainShopLayout = () => import('@/modules/common/components/MainShopLayout.vue')


export const cartRoutes: RouteRecordRaw = {
    path: '/cart',
    component: MainShopLayout,
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'cart',
            component: Cart,
            meta: {
                title: 'Carrito de Compras'
            }
        },
        {
            path: 'checkout',
            name: 'checkout',
            component: Checkout,
            meta: {
                title: 'Checkout'
            }
        },
    ]
}
