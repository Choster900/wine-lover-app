import backendApi from '@/api/backendApi'
import { useAuthStore } from '../stores/auth'
import type { ClientRegistrationPayload } from '../interfaces/client-registration-payload'
import type { AuthResponseRegister } from '../interfaces'

export const registerAction = async (payload: ClientRegistrationPayload): Promise<void> => {
    try {
        const { data } = await backendApi.post<AuthResponseRegister>(
            '/public/client/register',
            payload
        )

        const authStore = useAuthStore()

        const { user, token } = data.data

        authStore.setUser(user, token)

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

    } catch (error: any) {
        console.error('Error durante el registro:', error.response?.data || error.message)
        throw error
    }
}
