import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    name: '',
    email: '',
    accessToken: '',
    accessTokenExpireIn: 0,
    refreshToken: '',
    role: '',
  }),
  actions: {
    login(payload: {
      name?: string
      email?: string
      accessToken?: string
      accessTokenExpireIn?: number
      refreshToken?: string
      role?: string
    }) {
      this.isLoggedIn = true
      this.name = payload.name || ''
      this.email = payload.email || ''
      this.accessToken = payload.accessToken || ''
      this.accessTokenExpireIn = payload.accessTokenExpireIn || 0
      this.refreshToken = payload.refreshToken || ''
      this.role = payload.role || ''
    },
    logout() {
      this.isLoggedIn = false
      this.name = ''
      this.email = ''
      this.accessToken = ''
      this.accessTokenExpireIn = 0
      this.refreshToken = ''
      this.role = ''
    },
    updateSession(payload: {
      name?: string
      email?: string
      accessToken?: string
      accessTokenExpireIn?: number
      refreshToken?: string
      role?: string
    }) {
      if (payload.name) this.name = payload.name
      if (payload.email) this.email = payload.email
      if (payload.accessToken) this.accessToken = payload.accessToken
      if (payload.accessTokenExpireIn) this.accessTokenExpireIn = payload.accessTokenExpireIn
      if (payload.refreshToken) this.refreshToken = payload.refreshToken
      if (payload.role) this.role = payload.role
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
