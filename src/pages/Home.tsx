import {useState} from 'react'
import {GreetingSection} from '@/components/home/GreetingSection'
import {DiaryInputForm} from '@/components/home/DiaryInputForm'
import {AnalysisResultCard} from '@/components/home/AnalysisResultCard'
import {MusicRecommendationCard} from '@/components/home/MusicRecommendationCard'
import {useEmotionAnalysis} from '@/hooks/useEmotionAnalysis'
import {formatLocalDate} from '@/lib/utils'

export function Home() {
    const [entryText, setEntryText] = useState('')
    const {analysis, musicVideos, isLoading, handleAnalyze} = useEmotionAnalysis()

    const today = formatLocalDate(new Date())

    // AI 분석하기 버튼 클릭
    const handleAnalyzeClick = async () => {
        await handleAnalyze(entryText, today)
        setEntryText('') // 분석 성공 후 입력 필드 초기화
    }

    return (
        <div className="relative min-h-[calc(100vh-200px)]">
            <div className="relative z-10">
                <div className="max-w-4xl mx-auto space-y-6 mt-10">
                    <GreetingSection/>

                    <DiaryInputForm
                        entryText={entryText}
                        onEntryTextChange={setEntryText}
                        onAnalyze={handleAnalyzeClick}
                        isLoading={isLoading}
                    />

                    {analysis && <AnalysisResultCard analysis={analysis}/>}

                    <MusicRecommendationCard videos={musicVideos}/>
                </div>
            </div>
        </div>
    )
}

