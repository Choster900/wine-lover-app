// stores/auth.ts
import { defineStore } from 'pinia'
import type { User } from '@/modules/auth/interfaces'

interface AuthState {
    user: User | null
    token: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        setUser(user: User, token: string) {
            this.user = user
            this.token = token
        },
        logout() {
            this.user = null
            this.token = null
        },
        initAuthFromStorage() {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('user')
            if (token && user) {
                try {
                    this.setUser(JSON.parse(user), token)
                } catch {
                    this.logout()
                }
            }
        }
    },
})
