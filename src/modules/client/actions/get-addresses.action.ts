import backendApi from '@/api/backendApi'
import type { CardToken } from '../interfaces/card-token.interface'
import type { Address } from '../interfaces/addresses.interface'



export const getAddresses = async (): Promise<Address[] | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.get(
            '/client/address',
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
