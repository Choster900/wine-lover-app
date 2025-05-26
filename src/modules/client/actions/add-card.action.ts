import backendApi from '@/api/backendApi'
import type { CardToken } from '../interfaces/card-token.interface'

interface CardPayload {
    number: string
    cvv: string
    expiration_month: string
    expiration_year: string
}

export const addCard = async (card: CardPayload): Promise<CardToken | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.post<{ data: CardToken }>(
            '/client/card/token',
            { card },
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
