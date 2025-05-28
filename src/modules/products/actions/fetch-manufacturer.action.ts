import backendApi from '@/api/backendApi'
import type { ManufacturerResponse } from '../interfaces/all-products-response.interface'

export const fetchManufacturerAction = async (): Promise<ManufacturerResponse> => {

    try {
        const { data } = await backendApi.get<ManufacturerResponse>('/public/catalogs/manufacturer')
        return data
    } catch (error: any) {
        console.error('Error al obtener las categorias:', error)
        throw new Error('No se pudieron cargar los productos')
    }
}
