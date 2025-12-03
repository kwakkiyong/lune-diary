import { create } from 'zustand'
import type { EmotionAnalysis } from '@/types'

interface AnalysisState {
  currentAnalysis: EmotionAnalysis | null
  setCurrentAnalysis: (analysis: EmotionAnalysis | null) => void
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  currentAnalysis: null,
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
}))

