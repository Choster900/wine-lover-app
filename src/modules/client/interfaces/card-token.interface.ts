export interface Data {
    data: Data;
}

export interface CardToken {
    id: number;
    token: string;
    masked_number: string;
    brand: string;
}

export interface CardPayload {
    number: string
    cvv: string
    expiration_month: string
    expiration_year: string
}
