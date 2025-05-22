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
    client: Client;
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
    current_cashback: string | null;
}

export interface ClientExtended extends Client {
    orders: any[];
    cashback_history: any[];
}
