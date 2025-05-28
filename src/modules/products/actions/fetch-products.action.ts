import backendApi from '@/api/backendApi'
import type { ProductoResponse } from '../interfaces/all-products-response.interface'
import type { Product } from '../interfaces/product.interface'
import type { GetProductParams } from '../interfaces/get-product-params.interface'

export const fetchProductsAction = async (params: GetProductParams): Promise<ProductoResponse> => {
    const config = {
        params
    }

    try {
        const { data } = await backendApi.get<ProductoResponse>('/public/product', config)
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
