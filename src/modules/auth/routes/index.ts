import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw = {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Login.vue')
}
