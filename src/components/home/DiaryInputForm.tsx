import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Loader2, Sparkles, AlertCircle} from 'lucide-react'
import {useUIStore} from '@/stores/useUIStore'

interface DiaryInputFormProps {
    entryText: string
    onEntryTextChange: (text: string) => void
    onAnalyze: () => void
    isLoading: boolean
}

export function DiaryInputForm({
                                   entryText,
                                   onEntryTextChange,
                                   onAnalyze,
                                   isLoading,
                               }: DiaryInputFormProps) {
    const {error, clearError} = useUIStore()

    return (
        <Card>
            <CardHeader>
                <CardTitle>감정 일기</CardTitle>
                <CardDescription>오늘 하루를 기록하고 AI가 감정을 분석해드립니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea
                    placeholder="오늘 하루 어떤 일이 있었나요? 감정과 생각을 자유롭게 적어보세요..."
                    value={entryText}
                    onChange={(e) => {
                        onEntryTextChange(e.target.value)
                        clearError()
                    }}
                    rows={10}
                    className="resize-none text-sm sm:text-base"
                    disabled={isLoading}
                />
                <Button
                    onClick={onAnalyze}
                    disabled={isLoading || entryText.trim().length < 10}
                    className="w-full"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            AI 분석 중...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4"/>
                            AI 분석하기
                        </>
                    )}
                </Button>
                {error && (
                    <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                        <AlertCircle className="h-4 w-4"/>
                        <span>{error}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

