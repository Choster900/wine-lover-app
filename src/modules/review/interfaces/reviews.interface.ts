export interface ReviewResponse {
    data: Review[]
    links: Links
    meta: Meta
}

export interface ReviewByIdResponse {
    data: Review
}

export interface Review {
    id: number
    title: string
    content?: string
    cover_image: string
    comments_available?: boolean
    username?: string
    comments?: Comment[]
    created_at: string
}

export interface Comment {
    id: number
    content: string
    banned: string
    parent: string
    review: string
    by: string
    created_at: string
}

export interface Links {
    first: string
    last: string
    prev: null
    next: string
}

export interface Meta {
    current_page: number
    from: number
    last_page: number
    links: Link[]
    path: string
    per_page: number
    to: number
    total: number
}

export interface Link {
    url: null | string
    label: string
    active: boolean
}

export interface CommentRequest {
    content: string
}

export interface CommentResponse {
    message: string
    data?: any
}
