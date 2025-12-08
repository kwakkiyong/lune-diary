import {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Button} from '@/components/ui/button'
import {useSettingsStore} from '@/stores/useSettingsStore'
import {useUIStore} from '@/stores/useUIStore'
import {z} from 'zod'
import {useToast} from '@/hooks/use-toast'

const settingsSchema = z.object({
    openaiApiKey: z.string().min(1, 'OpenAI API 키를 입력해주세요.'),
    youtubeApiKey: z.string().optional(), // YouTube API 키는 선택사항
    emotionPromptTemplate: z.string().min(10, '프롬프트 템플릿을 입력해주세요.'),
})

export function Settings() {
    const {settings, updateSettings} = useSettingsStore()
    const {setError} = useUIStore()
    const {toast} = useToast()

    const [formData, setFormData] = useState({
        openaiApiKey: settings.openaiApiKey,
        youtubeApiKey: settings.youtubeApiKey,
        emotionPromptTemplate: settings.emotionPromptTemplate,
    })

    const handleSave = () => {
        try {
            settingsSchema.parse(formData)
            updateSettings(formData)
            toast({
                title: '설정 저장 완료',
                description: '설정이 성공적으로 저장되었습니다.',
            })
            setError(null)
        } catch (error) {
            if (error instanceof z.ZodError) {
                const firstError = error.issues[0]
                const errorMessage = firstError?.message || '설정 저장에 실패했습니다.'
                setError(errorMessage)
                toast({
                    title: '설정 저장 실패',
                    description: errorMessage,
                    variant: 'destructive',
                })
            }
        }
    }

    const handleReset = () => {
        setFormData({
            openaiApiKey: '',
            youtubeApiKey: '',
            emotionPromptTemplate: settings.emotionPromptTemplate,
        })
    }

    return (
        <div className="z-10 relative max-w-3xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold">설정</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">API 키 및 프롬프트 설정</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>OpenAI API 설정</CardTitle>
                    <CardDescription>
                        OpenAI API 키를 입력하세요.{' '}
                        <a
                            href="https://platform.openai.com/api-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            API 키 발급받기
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="openai-key">OpenAI API Key</Label>
                        <Input
                            id="openai-key"
                            type="password"
                            value={formData.openaiApiKey}
                            onChange={(e) => setFormData({...formData, openaiApiKey: e.target.value})}
                            placeholder="sk-..."
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>YouTube API 설정</CardTitle>
                    <CardDescription>
                        YouTube Data API v3 키를 입력하세요. (선택사항){' '}
                        <a
                            href="https://console.cloud.google.com/apis/credentials"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            API 키 발급받기
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="youtube-key">YouTube API Key</Label>
                        <Input
                            id="youtube-key"
                            type="password"
                            value={formData.youtubeApiKey}
                            onChange={(e) => setFormData({...formData, youtubeApiKey: e.target.value})}
                            placeholder="AIza..."
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button onClick={handleSave} className="flex-1 sm:flex-initial">
                    저장
                </Button>
                <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
                    초기화
                </Button>
            </div>
        </div>
    )
}

