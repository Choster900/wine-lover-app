import backendApi from '@/api/backendApi'
import type { Membership, Plan } from '../interfaces/membership.interface'

export const getMembershipsById = async (id: number): Promise<Membership | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.get(
            '/public/catalogs/membership/' + id,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data.data
    } catch (error) {
        console.error('Error al registrar la tarjeta:', error)
        return null
    }
}
