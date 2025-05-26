import type { RouteRecordRaw } from 'vue-router'
import Cart from '../views/Cart.vue'
import PaymentConfirmation from '../views/PaymentConfirmation.vue'

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
        {
            path: 'payment-confirmation/:type/:membershipId?/:membershipType?',
            name: 'confirmacion-de-compra',
            component: PaymentConfirmation,
            meta: {
                title: 'Confirmación de Pago'
            }
        }


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
