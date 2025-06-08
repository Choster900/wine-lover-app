import backendApi from '@/api/backendApi'
import type { PaginationParams } from '@/modules/common/interfaces/pagination-params.interface'
import type { CurrentCashbackHistory } from '../interfaces/cashback-history.interface'

export const getOrders = async (params: PaginationParams): Promise<CurrentCashbackHistory | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    const config = {
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await backendApi.get('/client/cashback', config)

        return response.data
    } catch (error) {
        console.error('Error al obtener el historial de cashback:', error)
        return null
    }
}
