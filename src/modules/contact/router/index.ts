import MainShopLayout from '@/modules/common/components/MainShopLayout.vue'
import type { RouteRecordRaw } from 'vue-router'
import ContactView from '../views/ContactView.vue'

export const contactRoutes: RouteRecordRaw = {
    path: '/contact',
    component: MainShopLayout,
    meta: { requiresAuth: false },
    children: [
        {
            path: '',
            name: 'contact',
            component: ContactView,
            meta: {
                title: 'Contacto',
            },
        },
    ],
}
