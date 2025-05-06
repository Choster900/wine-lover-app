import backendApi from '@/api/backendApi'
import type { AuthResponse } from '../interfaces'

export const loginAction = async (email: string, password: string): Promise<void> => {
    try {
        const { data } = await backendApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        })

        console.log(data);


        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
    } catch (error: any) {
        const message = error.response?.data?.message || 'Error al iniciar sesión'
        throw new Error(message)
    }
}
