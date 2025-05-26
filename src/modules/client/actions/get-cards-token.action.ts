import backendApi from '@/api/backendApi'
import type { CardToken } from '../interfaces/card-token.interface'

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
