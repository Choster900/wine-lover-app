// actions/login.action.ts
import backendApi from '@/api/backendApi'
import type { AuthResponse } from '../interfaces'
import { useAuthStore } from '../stores/auth'

export const loginAction = async (email: string, password: string): Promise<void> => {
    const authStore = useAuthStore() // Obtener instancia del store

    try {
        const { data } = await backendApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        })

        console.log(data)

        const { token, user } = data.data

        // Guarda el token y el usuario en el estado de Pinia
        authStore.setUser(user, token)

        // Guarda los datos en localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

    } catch (error: any) {
        if (error.response?.data?.errors) {
            console.error('Errores de validación:', error.response.data.errors)
        } else {
            console.error('Error durante el registro:', error.response?.data || error.message)
        }
        throw error
    }

}
