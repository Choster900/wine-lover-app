import backendApi from '@/api/backendApi'
import type { CategoryResponse } from '../interfaces/all-products-response.interface'

export const fetchCategoryProductsAction = async (): Promise<CategoryResponse> => {

    try {
        const { data } = await backendApi.get<CategoryResponse>('/public/catalogs/category-product')
        return data
    } catch (error: any) {
        console.error('Error al obtener las categorias:', error)
        throw new Error('No se pudieron cargar los productos')
    }
}
