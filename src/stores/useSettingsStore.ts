import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Settings } from '@/types'

const DEFAULT_PROMPT_TEMPLATE = `다음 일기 내용을 분석하여 감정을 파악해주세요.

응답 형식은 반드시 다음 JSON 형식으로 제공해주세요:
{
  "emotionLabel": "감정 이름 ('행복, 기쁨, 슬픔, 우울, 불안, 분노, 평온, 피곤' 중에 하나로 선택)",
  "emotionScore": 0-100 사이의 숫자,
  "summary": "한 줄 요약 (50자 이내)",
  "keywords": ["키워드1", "키워드2", "키워드3"]
}

일기 내용:
{text}`

interface SettingsState {
  settings: Settings
  updateSettings: (settings: Partial<Settings>) => void
  resetSettings: () => void
}

const defaultSettings: Settings = {
  openaiApiKey: '',
  youtubeApiKey: '',
  emotionPromptTemplate: DEFAULT_PROMPT_TEMPLATE,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () =>
        set({
          settings: defaultSettings,
        }),
    }),
    {
      name: 'lune-diary-settings',
    }
  )
)

