import type { DiaryEntry } from '@/types'

const STORAGE_KEY = 'lune-diary-entries'

export const localStorageClient = {
  getEntries: (): DiaryEntry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Failed to get entries from localStorage:', error)
      return []
    }
  },

  saveEntry: (entry: DiaryEntry): void => {
    try {
      const entries = localStorageClient.getEntries()
      entries.push(entry)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch (error) {
      console.error('Failed to save entry to localStorage:', error)
    }
  },

  removeEntry: (id: string): void => {
    try {
      const entries = localStorageClient.getEntries()
      const filtered = entries.filter((entry) => entry.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error('Failed to remove entry from localStorage:', error)
    }
  },

  getEntriesByDateRange: (startDate: string, endDate: string): DiaryEntry[] => {
    const entries = localStorageClient.getEntries()
    return entries.filter(
      (entry) => entry.date >= startDate && entry.date <= endDate
    )
  },
}

