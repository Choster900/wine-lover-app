export interface Data {
    data: Membership[];
}

export interface Plan {
    plan:                Membership;
    price:               string;
    cashback_percentage: number;
}

export interface Membership {
    id:          number;
    name:        string;
    description: string;
    plans?:      Plan[];
    months?:     number;
}
