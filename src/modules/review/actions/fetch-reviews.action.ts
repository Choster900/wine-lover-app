import backendApi from '@/api/backendApi'
import type { Review, ReviewByIdResponse, ReviewResponse } from '../interfaces/reviews.interface'
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
