import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Trash2} from 'lucide-react'
import {cn} from '@/lib/utils'
import type {DiaryEntry} from '@/types'
import {emotionColors} from '@/utils/emotionColors'

interface DiaryEntryCardProps {
    entry: DiaryEntry
    onDelete: (id: string) => void
    onClick: () => void
}

export function DiaryEntryCard({entry, onDelete, onClick}: DiaryEntryCardProps) {
    const emotionColor = emotionColors[entry.emotionLabel] || 'bg-primary/20 text-primary'

    return (
        <Card
            className="relative backdrop-blur-sm bg-card/80 cursor-pointer hover:bg-card/90 transition-colors"
            onClick={onClick}
        >
            <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
                            <span className={cn('px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium', emotionColor)}>
                                {entry.emotionLabel}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground">
                                {entry.emotionScore}점
                            </span>
                        </div>
                        <CardTitle className="text-base sm:text-lg text-foreground break-words">{entry.summary}</CardTitle>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete(entry.id)
                        }}
                    >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
                <p className="text-xs sm:text-sm text-foreground line-clamp-3 min-h-[3.5rem] sm:min-h-[4.5rem] leading-relaxed break-words">
                    {entry.text}
                </p>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                    {entry.keywords.map((keyword, index) => (
                        <span
                            key={index}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted text-muted-foreground rounded-md text-xs"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </CardContent>
        </Card>
    )
}


