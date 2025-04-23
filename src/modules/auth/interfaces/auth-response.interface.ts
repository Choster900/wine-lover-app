import type { User } from "./user.interface";

export interface AuthResponse {
    data: Data;
}

export interface Data {
    user: User;
    token: string;
}
