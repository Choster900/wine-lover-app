import backendApi from '@/api/backendApi'
import type { CardPayload, CardToken } from '../interfaces/card-token.interface'

export const getCardsToken = async (): Promise<CardToken[] | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.get<{ data: CardToken[] }>(
            '/client/card/token',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        console.log(response.data.data);

        return response.data.data
    } catch (error) {
        console.error('Error al obtener las tarjetas:', error)
        return null
    }
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

export const removeCard = async (cardId: number): Promise<CardToken | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.delete<{ data: CardToken }>(
            `/client/card/token/${cardId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data.data
    } catch (error) {
        console.error('Error al eliminar la tarjeta:', error)
        return null
    }
}
