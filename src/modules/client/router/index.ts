import type { RouteRecordRaw } from 'vue-router'
import Profile from '../views/Profile.vue'
import MainShopLayout from '@/modules/common/components/MainShopLayout.vue'
import Pircing from '@/modules/membership/views/Pircing.vue'
import PaymentMethod from '../components/PaymentMethod.vue'


export const clientRoutes: RouteRecordRaw = {
    path: '/client',
    component: MainShopLayout,
    children: [
        {
            path: 'my-profile',
            name: 'my-profile',
            component: Profile,
            meta: {
                title: 'Mi perfil'
            }
        },
        {
            path: 'method-payment',
            name: 'method-payment',
            component: PaymentMethod,
            meta: {
                title: 'Mi perfil'
            }
        },
        /*  {
             path: ':id',
             name: 'product-detail',
             component: ProductDetail,
             props: true,
             meta: {
                 title: 'Detalle del producto'
             }
         } */
    ]
}
