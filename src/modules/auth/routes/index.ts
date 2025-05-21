import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw = {
    path: '/auth',
    name: 'auth',
    children: [
        {
            path: 'login',
            name: 'product-list',
            component: () => import('../views/Login.vue'),
            meta: {
                title: 'Todos los productos'
            }
        },
        {
            path: ':id',
            name: 'register',
            component: () => import('../views/Register.vue'),
            props: true,
            meta: {
                title: 'Detalle del producto'
            }
        }
    ]
}
