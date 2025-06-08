import type { Order } from '@/modules/auth/interfaces'
import type { Links, Meta } from '@/modules/products/interfaces/all-products-response.interface'

export interface CurrentOrders {
    data: Order[]
    links: Links
    meta: Meta
}

export interface OrderStatuses {
    id: number
    name: string
}
