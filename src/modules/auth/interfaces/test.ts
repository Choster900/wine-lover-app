export interface Test {
    data: Data;
}

export interface Data {
    user:   User;
    client: Client;
    token:  string;
}

export interface Client {
    id:               number;
    names:            string;
    surnames:         string;
    identity_number:  string;
    birthday_date:    Date;
    phone:            string;
    membership:       null;
    current_cashback: null | string;
    orders:           any[];
    cashback_history: any[];
}

export interface User {
    id:                number;
    username:          string;
    email:             string;
    email_verified_at: null;
    profile:           Profile;
    state:             null;
    permissions:       string[];
    client:            Client;
}

export interface Profile {
    id:          number;
    name:        string;
    description: string;
}
