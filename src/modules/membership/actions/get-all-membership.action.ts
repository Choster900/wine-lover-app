import backendApi from '@/api/backendApi'
import type { Membership } from '../interfaces/membership.interface'

export const getAllMemberships = async (): Promise<Membership[] | null> => {
    try {
        const response = await backendApi.get(
            '/public/catalogs/membership',
        )

        return response.data.data
    } catch (error) {
        console.error('Error al registrar la tarjeta:', error)
        return null
    }
}
