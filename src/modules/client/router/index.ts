import type { RouteRecordRaw } from 'vue-router'
import Profile from '../views/Profile.vue'
import MainShopLayout from '@/modules/common/components/MainShopLayout.vue'


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
