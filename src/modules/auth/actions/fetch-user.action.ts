import backendApi from '@/api/backendApi'
import type { User } from '../interfaces'
import { useAuthStore } from '../stores/auth'

export const fetchUserAction = async (): Promise<void> => {
    const authStore = useAuthStore()

    const token = localStorage.getItem('token')
    if (!token) return

    try {
        const { data } = await backendApi.get<{ data: User }>('/auth/info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const user = data.data

        console.log(user);

        authStore.setUser(user, token)

        // Asegurarte que también esté sincronizado en localStorage
        localStorage.setItem('user', JSON.stringify(user))

    } catch (error: any) {
        console.error('Error al obtener información del usuario:', error)
        authStore.logout()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}
