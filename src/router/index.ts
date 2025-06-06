import { authRoutes } from '@/modules/auth/routes'
import { useAuthStore } from '@/modules/auth/stores/auth'
import { cartRoutes } from '@/modules/cart/routes'
import { clientRoutes } from '@/modules/client/router'
import { contactRoutes } from '@/modules/contact/router'
import { membershipRoutes } from '@/modules/membership/routes'
import { productRoutes } from '@/modules/products/routes'
import { reviewRoutes } from '@/modules/review/router'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../modules/shop/views/HomeView.vue'),
            meta: { requiresAuth: false }
        },
        authRoutes,
        productRoutes,
        cartRoutes,
        membershipRoutes,
        clientRoutes,
        reviewRoutes,
        contactRoutes,
    ],
})

export default router

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated()) {
        if (to.meta.requiresAuth) {
            return next({ path: '/auth/login' })
        } else {
            return next()
        }
    }

    if (authStore.user && authStore.user.profile.name !== 'Member') {
        authStore.logout()
        window.location.href = import.meta.env.VITE_FRONT_ADMIN_URL
        return
    }

    next()
})
