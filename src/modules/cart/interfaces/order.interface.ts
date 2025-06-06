import type { Order } from "@/modules/auth/interfaces"

export interface CreateOrderPayload {
    products: ProductOrder[],
    address_id: number
    card_token_id: number
    payment_method_id: number
}

export interface CreateOrderResponse {
    data: Order
}

export interface ProductOrder {
    product_id: number
    presentation_id: number
    amount: number
}
