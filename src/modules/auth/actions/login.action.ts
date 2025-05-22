import backendApi from '@/api/backendApi'

import { useAuthStore } from '../stores/auth'
import type { AuthResponseLogin, User } from '../interfaces'

export const loginAction = async (email: string, password: string): Promise<void> => {
    const authStore = useAuthStore()

    try {
        const { data } = await backendApi.post<AuthResponseLogin>('/auth/login', {
            email,
            password,
        })

        const user: User = {
            id: data.data.id,
            username: data.data.username,
            email: data.data.email,
            email_verified_at: data.data.email_verified_at,
            profile: data.data.profile,
            state: data.data.state,
            permissions: data.data.permissions,
            client: data.data.client,
        }

        const token = data.data.token

        authStore.setUser(user, token)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

    } catch (error: any) {
        if (error.response?.data?.errors) {
            console.error('Errores de validación:', error.response.data.errors)
        } else {
            console.error('Error durante el login:', error.response?.data || error.message)
        }
        throw error
    }
}
