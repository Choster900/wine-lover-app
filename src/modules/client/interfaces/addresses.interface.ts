export interface Data {
    data: Address[];
}

export interface Address {
    id:           number;
    name:         string;
    neighborhood: string;
    street:       string;
    number:       string;
    reference:    null;
    district:     string;
}

export interface AddressPayload {
    name: string
    neighborhood: string
    street: string
    number: string
    reference: string
    district_id: number
}
