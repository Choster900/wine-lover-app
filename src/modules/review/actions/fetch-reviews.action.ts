import backendApi from '@/api/backendApi'
import type { CommentRequest, CommentResponse, Review, ReviewByIdResponse, ReviewResponse } from '../interfaces/reviews.interface'
import type { PaginationParams } from '../../common/interfaces/pagination-params.interface'

export const fetchReviewsAction = async (
    params: PaginationParams,
): Promise<ReviewResponse> => {
    const config = {
        params,
    }

    try {
        const { data } = await backendApi.get<ReviewResponse>('/public/review', config)
        return data
    } catch (error: any) {
        console.error('Error al obtener las reviews:', error)
        throw new Error('No se pudieron cargar las reviews')
    }
}

export const fetchReviewByIdAction = async (
    id: number,
): Promise<Review> => {
    try {
        const { data } = await backendApi.get<ReviewByIdResponse>(`/client/review/${id}`)
        return data.data
    } catch (error: any) {
        console.error('Error al obtener la review:', error)

        if (error.response.status === 403) {
            throw new Error('❌ Debe tener una membresia activa')
        }

        throw new Error('No se pudieron cargar la review')
    }
}

export const createCommentAction = async (
    reviewId: number,
    commentData: CommentRequest
): Promise<CommentResponse> => {
    try {
        const { data } = await backendApi.post<CommentResponse>(
            `/client/review/${reviewId}/comment`,
            commentData
        )
        return data
    } catch (error: any) {
        console.error('Error al crear el comentario:', error)

        if (error.response?.status === 401) {
            throw new Error('Debe iniciar sesión para comentar')
        }

        if (error.response?.status === 403) {
            throw new Error('No tiene permisos para comentar en esta reseña')
        }

        if (error.response?.status === 422) {
            throw new Error('El contenido del comentario es requerido')
        }

        throw new Error('Error al enviar el comentario. Inténtelo de nuevo.')
    }
}
