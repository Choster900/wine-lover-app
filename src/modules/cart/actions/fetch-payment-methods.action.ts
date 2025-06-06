import backendApi from '@/api/backendApi'
import type { PaymentMethod } from '../interfaces/payment-method.interface'

export const fetchPaymentMethodsAction = async (): Promise<PaymentMethod> => {
    try {
        const { data } = await backendApi.get<PaymentMethod>('/public/catalogs/payment-method')
        return data
    } catch (error: any) {
        console.error('Error al obtener las metodos de pago:', error)
        throw new Error('No se pudieron cargar los metodos de pago')
    }
}
