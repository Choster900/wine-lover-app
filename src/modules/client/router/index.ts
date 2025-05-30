import type { RouteRecordRaw } from 'vue-router'
import Profile from '../views/Profile.vue'
import MainShopLayout from '@/modules/common/components/MainShopLayout.vue'
import PaymentMethod from '../components/PaymentMethod.vue'
import OrderHistory from '../components/OrderHistory.vue'
import CurrentMembreship from '../components/CurrentMembreship.vue'
import ListAddress from '../components/ListAddress.vue'

export const clientRoutes: RouteRecordRaw = {
    path: '/client',
    component: MainShopLayout,
    meta: { requiresAuth: true },
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
            path: 'membership',
            name: 'membership',
            component: CurrentMembreship,
            meta: {
                title: 'Membresia Actual',
            },
        },
        {
            path: 'address',
            name: 'address',
            component: ListAddress,
            meta: {
                title: 'Mis Direcciones',
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
        {
            path: 'cashback-history',
            name: 'cashback-history',
            component: OrderHistory,
            meta: {
                title: 'Historial de cashback',
            },
        },
    ],
}
