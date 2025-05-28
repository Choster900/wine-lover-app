import backendApi from '@/api/backendApi'
import type { QualityResponse } from '../interfaces/all-products-response.interface'

export const fetchQualityProductsAction = async (): Promise<QualityResponse> => {

    try {
        const { data } = await backendApi.get<QualityResponse>('/public/catalogs/quality-product')
        return data
    } catch (error: any) {
        console.error('Error al obtener las categorias:', error)
        throw new Error('No se pudieron cargar los productos')
    }
}
