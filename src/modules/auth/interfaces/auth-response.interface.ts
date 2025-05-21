import type { Client, User } from "./user.interface";

export interface AuthResponse {
    data: Data;
}

export interface Data {
    user: User;
    client?: Client;
    token: string;
}
