import backendApi from '@/api/backendApi'
import type { ProductoResponse } from '../interfaces/all-products-response.interface'

export const fetchProductsAction = async (): Promise<ProductoResponse> => {
    try {
        const { data } = await backendApi.get<ProductoResponse>('/public/product')

        console.log(data);

        return data
    } catch (error: any) {
        console.error('Error al obtener los productos:', error)
        throw new Error('No se pudieron cargar los productos')
    }
}
