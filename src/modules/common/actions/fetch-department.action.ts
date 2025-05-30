import backendApi from '@/api/backendApi'
import type { Department } from '../interfaces/department.interface'

export const getDepartments = async (): Promise<Department[] | null> => {

    try {
        const response = await backendApi.get('/public/catalogs/department')

        return response.data.data
    } catch (error) {
        console.error('Error al registrar la tarjeta:', error)
        return null
    }
}
