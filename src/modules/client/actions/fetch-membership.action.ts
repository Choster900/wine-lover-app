import backendApi from '@/api/backendApi'
import type { AcquareMembershipPayload, CurrentMembership, Membership, ResponseAcquire } from '../interfaces/acquare-membership.interface'

export const getCurrentMembership = async (): Promise<CurrentMembership | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.get(
            '/client/membership',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data.data
    } catch (error) {
        console.error('Error al obtener membresia actual:', error)
        return null
    }
}

export const getMemberships = async (): Promise<Membership[] | null> => {

    try {
        const response = await backendApi.get(
            '/public/catalogs/membership',
        )

        return response.data.data
    } catch (error) {
        console.error('Error al obtener membresias:', error)
        return null
    }
}

export const acquireMembership = async (payload: AcquareMembershipPayload): Promise<ResponseAcquire | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.post(
            '/client/membership/acquire',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data
    } catch (error) {
        console.error('Error al registrar la membresía:', error)
        return null
    }
}
