import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { EmotionAnalysis } from '@/types'

interface AnalysisResultCardProps {
  analysis: EmotionAnalysis
}

export function AnalysisResultCard({ analysis }: AnalysisResultCardProps) {
  return (
    <Card className="backdrop-blur-sm bg-card/80">
      <CardHeader>
        <CardTitle>감정 분석 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">감정</p>
            <p className="text-xl sm:text-2xl font-bold break-words">{analysis.emotionLabel}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">감정 점수</p>
            <p className="text-xl sm:text-2xl font-bold">{analysis.emotionScore}점</p>
          </div>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">한 줄 요약</p>
          <p className="text-base sm:text-lg break-words">{analysis.summary}</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">키워드</p>
          <div className="flex gap-2 flex-wrap">
            {analysis.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 bg-primary/20 text-primary rounded-full text-xs sm:text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


