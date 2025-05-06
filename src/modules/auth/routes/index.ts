import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw = {
    path: '/login',
    name: 'auth',
    component: () => import('../views/Login.vue')
}
