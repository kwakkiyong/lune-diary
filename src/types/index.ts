export interface DiaryEntry {
  id: string
  date: string
  text: string
  emotionLabel: string
  emotionScore: number
  summary: string
  keywords: string[]
  createdAt: string
}

export interface EmotionAnalysis {
  emotionLabel: string
  emotionScore: number
  summary: string
  keywords: string[]
}

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  channelTitle: string
  videoId: string
}

export interface Settings {
  openaiApiKey: string
  youtubeApiKey: string
  emotionPromptTemplate: string
}

export interface UIState {
  isLoading: boolean
  error: string | null
  theme: 'dark' | 'light'
}

