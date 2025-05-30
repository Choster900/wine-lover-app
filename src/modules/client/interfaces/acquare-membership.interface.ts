export interface ResponseAcquire {
    data: AcquireMembershipResponse;
}

export interface AcquireMembershipResponse {
    transaction_id: string;
    monto: string;
}

export interface AcquareMembershipPayload {
    automatic_renewal: boolean
    card_token_id: number
    address_id: number
    membership_id: number
    plan_id: number
    payment_method_id: number

}

export interface CurrentMembership {
    id: number
    end_date: string
    refund_amount: number
    price: number
    cashback_percentage: number
    automatic_renewal: boolean
    membership: string
    plan: string
    payment_track: PaymentTrack[]
}

export interface PaymentTrack {
    payment_method: string
    payment_status: string
    amount_paid: number
    transaction_id: string
    created_at: string
}

export interface Membership {
    id: number
    name: string
    description: string
    plans: MembershipPlan[]
}

export interface MembershipPlan {
    plan: Plan
    price: number
    cashback_percentage: number
}

export interface Plan {
    id: number
    name: string
    months: number
    description: string
}
