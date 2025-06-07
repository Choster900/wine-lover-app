import type { Presentation, Product } from "@/modules/products/interfaces/product.interface";

export interface AuthResponseLogin {
    data: UserWithToken;
}

export interface AuthResponseRegister {
    data: {
        user: User;
        client: ClientExtended;
        token: string;
    };
}

export interface GetInfoResponse {
    data: User;
}

export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at: string | null;
    profile: Profile;
    state: boolean | null;
    permissions: string[];
    client: ClientExtended;
}

export interface UserWithToken extends User {
    token: string;
}

export interface Profile {
    id: number;
    name: string;
    description: string;
}

export interface Client {
    id: number;
    names: string;
    surnames: string;
    identity_number: string;
    birthday_date: string | Date;
    phone: string;
    membership: string | null;
    current_cashback: number | null;
}

export interface ClientExtended extends Client {
    orders: Order[];
    cashback_history: CashbackHistory[];
}

export interface Order {
    id: number
    code: string
    subtotal: number
    total_discount: number
    total: number
    cashback_generated: number
    address: string
    order_status: string
    transaction_id: string
    items: OrderItem[]
}

export interface OrderItem {
    product: Product
    presentation: Presentation
    amount: number
    unit_price: number
    discount: number
    subtotal_item: number
}

export interface CashbackHistory {
    id: number
    amount: number
    transaction_code: string
    type: string
    created_at: string
}
