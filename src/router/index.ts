import { authRoutes } from '@/modules/auth/routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../modules/shop/views/HomeView.vue'),
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => null,
            meta: { requiresAdmin: true }
        },
        authRoutes
    ],
})

export default router

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const isAdminRoute = to.meta.requiresAdmin

    if (isAdminRoute && !token) {
        return next({ path: '/auth' }) // redirige al login si no hay token
    }

    next()
})
