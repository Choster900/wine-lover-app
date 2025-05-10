import type { RouteRecordRaw } from 'vue-router'
import Cart from '../views/Cart.vue'

const MainShopLayout = () => import('@/modules/common/components/MainShopLayout.vue')


export const cartRoutes: RouteRecordRaw = {
    path: '/cart',
    component: MainShopLayout, // Componente base con <router-view />
    children: [
        {
            path: '',
            name: 'cart',
            component: Cart,
            meta: {
                title: 'Carrito de Compras'
            }
        },
        /* {
            path: 'checkout',
            name: 'checkout',
            component: CheckoutPage,
            meta: {
                title: 'Resumen de Orden'
            }
        },
        {
            path: 'payment',
            name: 'payment',
            component: PaymentPage,
            meta: {
                title: 'Pago'
            }
        },
        {
            path: 'confirmation',
            name: 'confirmation',
            component: ConfirmationPage,
            meta: {
                title: 'Confirmación de Compra'
            }
        } */
    ]
}
