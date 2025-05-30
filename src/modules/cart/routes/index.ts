import type { RouteRecordRaw } from 'vue-router'
import Cart from '../views/Cart.vue'

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
    ]
}
