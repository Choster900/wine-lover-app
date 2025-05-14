import backendApi from '@/api/backendApi'
import type { ProductoResponse } from '../interfaces/all-products-response.interface'
import type { Product } from '../interfaces/product.interface'

export const fetchProductsAction = async (): Promise<ProductoResponse> => {
    try {
        const { data } = await backendApi.get<ProductoResponse>('/public/product')
        return data
    } catch (error: any) {
        console.error('Error al obtener los productos:', error)
        throw new Error('No se pudieron cargar los productos')
    }
}

export const fetchProductByIdAction = async (productId: string): Promise<{ data: Product }> => {
    try {
        const { data } = await backendApi.get<{ data: Product }>(`/public/product/${productId}`)
        return data
    } catch (error: any) {
        console.error(`Error al obtener el producto con ID ${productId}:`, error)
        throw new Error('No se pudo cargar el producto')
    }
}
