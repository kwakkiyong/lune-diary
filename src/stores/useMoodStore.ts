import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MoodState {
  selectedMood: string
  setSelectedMood: (mood: string) => void
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set) => ({
      selectedMood: '행복한',
      setSelectedMood: (mood) => set({ selectedMood: mood }),
    }),
    {
      name: 'lune-diary-mood',
    }
  )
)

