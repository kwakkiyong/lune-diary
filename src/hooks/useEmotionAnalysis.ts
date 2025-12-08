import { useState } from 'react'
import { analyzeEmotion } from '@/lib/openaiClient'
import { getMusicByEmotion } from '@/lib/youtubeClient'
import { useEntryStore } from '@/stores/useEntryStore'
import { useMusicStore } from '@/stores/useMusicStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { useUIStore } from '@/stores/useUIStore'
import { useAnalysisStore } from '@/stores/useAnalysisStore'
import type { EmotionAnalysis, YouTubeVideo } from '@/types'

export function useEmotionAnalysis() {
  const [analysis, setAnalysis] = useState<EmotionAnalysis | null>(null)
  const [musicVideos, setMusicVideos] = useState<YouTubeVideo[]>([])
  
  const { setCurrentAnalysis } = useAnalysisStore()
  const { addEntry } = useEntryStore()
  const { setPlaylist } = useMusicStore()
  const { emotionPromptTemplate } = useSettingsStore()
  const { isLoading, error, setLoading, setError, clearError } = useUIStore()

  // .env에서 API 키 읽기
  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY || ''

  const handleAnalyze = async (entryText: string, today: string) => {
    // 유효성 검사
    if (entryText.trim().length < 10) {
      setError('일기를 최소 10자 이상 입력해주세요.')
      return
    }

    if (!openaiApiKey) {
      setError('OpenAI API 키가 설정되지 않았습니다. .env 파일에 VITE_OPENAI_API_KEY를 설정해주세요.')
      return
    }

    clearError()
    setLoading(true)
    setAnalysis(null)
    setMusicVideos([])
    setCurrentAnalysis(null) // 분석 시작 시 이전 분석 결과 초기화

    try {
      // 감정 분석
      const emotionAnalysis = await analyzeEmotion(
        entryText,
        emotionPromptTemplate,
        openaiApiKey
      )
      setAnalysis(emotionAnalysis)
      setCurrentAnalysis(emotionAnalysis) // 전역 상태에 저장하여 Layout에서 사용

      // 음악 추천 (YouTube API 키가 있는 경우)
      if (youtubeApiKey) {
        try {
          const videos = await getMusicByEmotion(emotionAnalysis.emotionLabel, youtubeApiKey)
          setMusicVideos(videos)
          setPlaylist(videos) // 전역 플레이리스트에 저장
        } catch (error) {
          console.error('음악 추천 실패:', error)
          // 음악 추천 실패는 무시하고 계속 진행
        }
      }

      // 일기 저장
      const newEntry = {
        id: `entry-${Date.now()}`,
        date: today,
        text: entryText,
        ...emotionAnalysis,
        createdAt: new Date().toISOString(),
      }
      addEntry(newEntry)

      return emotionAnalysis
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      setError(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    analysis,
    musicVideos,
    isLoading,
    error,
    handleAnalyze,
  }
}


