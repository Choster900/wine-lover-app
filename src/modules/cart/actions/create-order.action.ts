import backendApi from '@/api/backendApi'
import type { CreateOrderPayload } from '../interfaces/order.interface'
import type { Order } from '@/modules/auth/interfaces'

export const createOrderAction = async (payload: CreateOrderPayload): Promise<Order | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.post(
            '/client/order/createOrder',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data.data
    } catch (error) {
        console.error('Error al crear la orden:', error)
        return null
    }
}
