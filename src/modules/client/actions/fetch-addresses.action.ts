import backendApi from '@/api/backendApi'
import type { Address, AddressPayload } from '../interfaces/addresses.interface'

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

export const addAddress = async (card: AddressPayload): Promise<Address | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.post<{ data: Address }>(
            '/client/address',
            { ...card },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data.data
    } catch (error) {
        console.error('Error al registrar la direccion:', error)
        return null
    }
}

export const updateAddress = async (cardId: number, card: AddressPayload): Promise<Address | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.put<{ data: Address }>(
            `/client/address/${cardId}`,
            { ...card },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data.data
    } catch (error) {
        console.error('Error al actualizar la direccion:', error)
        return null
    }
}

export const removeAddress = async (cardId: number): Promise<Address | null> => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await backendApi.delete<{ data: Address }>(
            `/client/address/${cardId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data.data
    } catch (error) {
        console.error('Error al eliminar la direccion:', error)
        return null
    }
}
