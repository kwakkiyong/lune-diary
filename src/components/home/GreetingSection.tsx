import { useAnalysisStore } from '@/stores/useAnalysisStore'
import { getGreetingWithMood } from '@/utils/moodUtils'

export function GreetingSection() {
  const { currentAnalysis } = useAnalysisStore()
  const activeMood = currentAnalysis?.emotionLabel || null
  const { mood, rest } = getGreetingWithMood(activeMood)

  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">
        {mood} {rest}
      </h1>
      <p className="text-muted-foreground">오늘 하루를 기록하고 AI가 감정을 분석해드립니다.</p>
    </div>
  )
}


