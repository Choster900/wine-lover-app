export interface MembershipResponse {
    data: Membership[];
}

export interface Membership {
    id: number;
    name: string;
    description: string;
    plans: MembershipPlan[];
}

export interface MembershipPlan {
    plan: PlanType;
    price: string;
    cashback_percentage: number;
}

export interface PlanType {
    id: number;
    name: string;
    months: number;
    description: string;
}
