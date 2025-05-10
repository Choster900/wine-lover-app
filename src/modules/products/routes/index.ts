import type { RouteRecordRaw } from 'vue-router'
import ShopLayout from '../layout/ShopLayout.vue'
import ProductListView from '../views/ProductListView.vue'

export const productRoutes: RouteRecordRaw = {
    path: '/products',
    name: 'products',
    component: ShopLayout,
    children: [
        {
            path: '',
            name: 'product-list',
            component: ProductListView,
            meta: {
                title: 'Todos los productos'
            }
        }
    ]
}
