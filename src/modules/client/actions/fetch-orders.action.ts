import backendApi from '@/api/backendApi'
import type { CurrentOrders, OrderStatuses } from '../interfaces/orders.interface'
import type { GetOrderParams } from '../interfaces/get-order-params.interface'

export const getOrders = async (params: GetOrderParams): Promise<CurrentOrders | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    const config = {
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await backendApi.get('/client/order', config)

        return response.data
    } catch (error) {
        console.error('Error al obtener ordenes:', error)
        return null
    }
}

export const getOrderStatuses = async (): Promise<OrderStatuses | null> => {
    try {
        const response = await backendApi.get('/public/catalogs/order-status')

        return response.data.data
    } catch (error) {
        console.error('Error al obtener estados de las ordenes:', error)
        return null
    }
}
