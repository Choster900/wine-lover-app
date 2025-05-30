import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { DateTime } from 'luxon'

import type { User, ClientExtended } from '@/modules/auth/interfaces'

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token,
    client: (state) => state.user!.client || null,
    permissions: (state): string[] => state.user?.permissions || [],
    username: (state): string => state.user?.username || ''
  },

  actions: {
    setUser(user: User, token: string) {
      this.user = user
      this.token = token
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
    },

    initAuthFromStorage() {
      const token = localStorage.getItem('auth.token')
      const user = localStorage.getItem('auth.user')
      if (token && user) {
        try {
          this.setUser(JSON.parse(user), token)
        } catch {
          this.logout()
        }
      }
    },

    updateUserInfo(payload: { user: User; client: ClientExtended }) {
      if (this.user) {
        this.user = {
          ...this.user,
          ...payload.user,
          client: payload.client
        }
      }
    },

    checkAuthentication(): boolean {
      if (!this.token) return false
      const decoded = jwtDecode(this.token)
      const now = DateTime.now().toUnixInteger()
      return decoded.exp ? now <= decoded.exp : false
    },

    isAuthenticated(): boolean {
      return this.checkAuthentication()
    },
  },

  persist: {
    key: 'auth',
    storage: localStorage
  }
})
