import { create } from 'zustand'

import { createSelectors } from '@/store/create-selector'
import { User } from '@/types/user'

type AuthState = {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
  user: User | null
  setUser: (user: User) => void
}

export const useAuthStore = createSelectors(
  create<AuthState>(set => ({
    token: localStorage.getItem('token'),
    setToken: (token: string) => {
      localStorage.setItem('token', token)
      set({ token })
    },
    clearToken: () => {
      localStorage.removeItem('token')
      set({ user: null })
      set({ token: null })
    },
    user: null,
    setUser: (user: User) => set({ user })
  }))
)
