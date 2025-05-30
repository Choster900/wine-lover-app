import type { RouteRecordRaw } from 'vue-router'
import ShopLayout from '../layout/ShopLayout.vue'
import ProductListView from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'


export const productRoutes: RouteRecordRaw = {
    path: '/products',
    component: ShopLayout,
    meta: { requiresAuth: false },
    children: [
        {
            path: '',
            name: 'product-list',
            component: ProductListView,
            meta: {
                title: 'Todos los productos'
            }
        },
        {
            path: ':id',
            name: 'product-detail',
            component: ProductDetail,
            props: true,
            meta: {
                title: 'Detalle del producto'
            }
        }
    ]
}
