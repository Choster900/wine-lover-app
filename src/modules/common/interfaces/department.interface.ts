export interface Department {
    id: number
    name: string
    municipalities: Municipality[]
}

export interface Municipality {
    id: number
    name: string
    districts: District[]
}

export interface District {
    id: number
    name: string
}