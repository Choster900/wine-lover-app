
export interface Product {
    id:               number;
    name:             string;
    description:      string;
    state:            boolean;
    category_product: YProduct;
    quality_product:  YProduct;
    presentations:    Presentation[];
    images:           Image[];
}

export interface YProduct {
    id:          number;
    name:        Name;
    description: string;
}

export enum Name {
    Deluxe = "Deluxe",
    Premiumn = "Premiumn",
    Standard = "Standard",
    Vino = "Vino",
    Licor = "Licor",
}

export interface Image {
    id:        number;
    url_image: string;
    state:     boolean;
}

export interface Presentation {
    id:               number;
    amount:           string;
    unit_measurement: UnitMeasurement;
    stock:            number;
    unit_price:       string;
}

export enum UnitMeasurement {
    L = "l",
    Ml = "ml",
}

export interface Manufacturer {
    id: number
    name: string
    city: string
    country: string
    description: string
}
