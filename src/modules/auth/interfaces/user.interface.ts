export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at: null;
    profile: Profile;
    state: boolean;
    permissions?: string[];
    client: Client;

}
export interface Client {
    id: number;
    names: string;
    surnames: string;
    identity_number: string;
    birthday_date: Date;
    phone: string;
    membership: null;
    current_cashback: string;
}

export interface Profile {
    id: number;
    name: string;
    description: string;
}

