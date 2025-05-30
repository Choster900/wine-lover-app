import type { RouteRecordRaw } from 'vue-router'
import Pircing from '../views/Pircing.vue'
import MainShopLayout from '@/modules/common/components/MainShopLayout.vue'
import PaymentConfirmation from '../views/PaymentConfirmation.vue'

export const membershipRoutes: RouteRecordRaw = {
    path: '/membership',
    component: MainShopLayout,
    meta: { requiresAuth: false },
    children: [
        {
            path: '',
            name: 'pircing-page',
            component: Pircing,
            meta: {
                title: 'Pircing',
            },
        },
        {
            path: 'payment-confirmation/:membershipId/:planId',
            name: 'payment-confirmation',
            component: PaymentConfirmation,
            meta: {
                title: 'Confirmación Pago de Membresia',
            },
        },
    ],
}
