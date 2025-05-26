import backendApi from '@/api/backendApi'
import type { CardToken } from '../interfaces/card-token.interface'
import type { ResponseAcquire } from '../interfaces/response-acquare-membership.interface'

interface Payload {
    automatic_renewal: boolean
    card_token_id: number
    address_id: number
    membership_id: number
    plan_id: number
    payment_method_id: number

}

export const acquireMembership = async (payload: Payload): Promise<ResponseAcquire | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.post(
            '/client/membership/acquire',
            payload, // 👈 AQUÍ el cambio
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
