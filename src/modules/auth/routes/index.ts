import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw = {
    path: '/auth',
    name: 'auth',
    children: [
        {
            path: 'login',
            component: () => import('../views/Login.vue'),
            meta: {
                title: 'Todos los productos'
            }
        },
        {
            path: 'register',
            component: () => import('../views/Register.vue'),
            props: true,
            meta: {
                title: 'Detalle del producto'
            }
        }
    ]
}
