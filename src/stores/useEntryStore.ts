import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DiaryEntry } from '@/types'

interface EntryState {
  entries: DiaryEntry[]
  addEntry: (entry: DiaryEntry) => void
  removeEntry: (id: string) => void
  getEntriesByDateRange: (startDate: string, endDate: string) => DiaryEntry[]
}

export const useEntryStore = create<EntryState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, entry],
        })),
      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
      getEntriesByDateRange: (startDate, endDate) => {
        const entries = get().entries
        return entries.filter(
          (entry) => entry.date >= startDate && entry.date <= endDate
        )
      },
    }),
    {
      name: 'lune-diary-entries',
    }
  )
)

