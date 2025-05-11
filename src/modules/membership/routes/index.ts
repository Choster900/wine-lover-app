import type { RouteRecordRaw } from 'vue-router'
import Pircing from '../views/Pircing.vue'
import MainShopLayout from '@/modules/common/components/MainShopLayout.vue'


export const membershipRoutes: RouteRecordRaw = {
    path: '/membership',
    component: MainShopLayout,
    children: [
        {
            path: '',
            name: 'pircing-page',
            component: Pircing,
            meta: {
                title: 'Pircing'
            }
        },

    ]

}
