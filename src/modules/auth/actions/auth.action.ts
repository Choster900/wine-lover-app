// modules/auth/actions/auth.action.ts
import backendApi from '@/api/backendApi'
import { useAuthStore } from '../stores/auth'
import type { User } from '../interfaces'

export const fetchUserFromToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
        const { data } = await backendApi.get<{ data: User }>('/auth/info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const authStore = useAuthStore()

        authStore.setUser(data.data, token)

    } catch (error) {
        console.error('Token inválido o expirado', error)
        const authStore = useAuthStore()
        authStore.logout()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}
