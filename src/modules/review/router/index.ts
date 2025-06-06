import MainShopLayout from '@/modules/common/components/MainShopLayout.vue'
import type { RouteRecordRaw } from 'vue-router'
import ReviewsView from '../views/ReviewsView.vue'
import ReviewView from '../views/ReviewView.vue'

export const reviewRoutes: RouteRecordRaw = {
    path: '/reviews',
    component: MainShopLayout,
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'reviews',
            component: ReviewsView,
            meta: {
                title: 'Reviews',
            },
        },
        {
            path: ':id',
            name: 'review',
            component: ReviewView,
            meta: {
                title: 'Review',
            },
        },
    ],
}
