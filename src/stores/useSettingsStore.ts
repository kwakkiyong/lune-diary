import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  emotionPromptTemplate: string
  updatePromptTemplate: (template: string) => void
  resetPromptTemplate: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      emotionPromptTemplate: DEFAULT_PROMPT_TEMPLATE,
      updatePromptTemplate: (template) =>
        set({
          emotionPromptTemplate: template,
        }),
      resetPromptTemplate: () =>
        set({
          emotionPromptTemplate: DEFAULT_PROMPT_TEMPLATE,
        }),
    }),
    {
      name: 'lune-diary-settings',
    }
  )
)

