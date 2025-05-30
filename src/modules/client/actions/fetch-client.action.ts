import backendApi from '@/api/backendApi'
import type { ClientPayload, UpdateClientResponse } from '../interfaces/update-client-info.interface'

export const updateClientInfo = async (payload: ClientPayload): Promise<UpdateClientResponse | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.post(
            '/client/update',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data.data
    } catch (error) {
        console.error('Error al actualizar la informacion del cliente:', error)
        return null
    }
}
