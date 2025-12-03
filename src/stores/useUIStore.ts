import { create } from 'zustand'
import type { UIState } from '@/types'

interface UIStore extends UIState {
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  setTheme: (theme: 'dark' | 'light') => void
}

export const useUIStore = create<UIStore>((set) => ({
  isLoading: false,
  error: null,
  theme: 'dark',
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setTheme: (theme) => set({ theme }),
}))

