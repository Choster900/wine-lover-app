export interface ResponseAcquire {
    data: MembershipResponse;
}

export interface MembershipResponse {
    transaction_id: string;
    monto: string;
}
