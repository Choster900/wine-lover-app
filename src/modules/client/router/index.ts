import type { RouteRecordRaw } from 'vue-router'
import Profile from '../views/Profile.vue'
import MainShopLayout from '@/modules/common/components/MainShopLayout.vue'
import PaymentMethod from '../components/PaymentMethod.vue'
import OrderHistory from '../components/OrderHistory.vue'

export const clientRoutes: RouteRecordRaw = {
    path: '/client',
    component: MainShopLayout,
    children: [
        {
            path: 'my-profile',
            name: 'my-profile',
            component: Profile,
            meta: {
                title: 'Mi perfil',
            },
        },
        {
            path: 'method-payment',
            name: 'method-payment',
            component: PaymentMethod,
            meta: {
                title: 'Mi perfil',
            },
        },
        {
            path: 'order-history',
            name: 'order-history',
            component: OrderHistory,
            meta: {
                title: 'Mis ordenes',
            },
        },
    ],
}
