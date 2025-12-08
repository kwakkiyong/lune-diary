import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DiaryEntry } from '@/types'
import { emotionColors, getEmotionScoreColor } from '@/utils/emotionColors'

interface DiaryEntryModalProps {
    entry: DiaryEntry | null
    isOpen: boolean
    onClose: () => void
    onDelete: (id: string) => void
}

export function DiaryEntryModal({ entry, isOpen, onClose, onDelete }: DiaryEntryModalProps) {
    if (!entry) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] flex flex-col p-0">
                <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border flex-shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <div className="flex items-baseline gap-1">
                            <span className={cn('text-2xl sm:text-3xl font-bold', getEmotionScoreColor(entry.emotionScore))}>
                                {entry.emotionScore}
                            </span>
                            <span className="text-base sm:text-lg text-muted-foreground font-medium">점</span>
                        </div>
                        <span
                            className={cn(
                                'px-2 py-1 rounded-full text-xs font-medium w-fit',
                                emotionColors[entry.emotionLabel] || 'bg-primary/20 text-primary'
                            )}
                        >
                            {entry.emotionLabel}
                        </span>
                    </div>
                    <DialogTitle className="text-foreground text-lg sm:text-xl font-bold border-l-4 border-primary pl-2 sm:pl-3 py-2 break-words">
                        {entry.summary}
                    </DialogTitle>
                    <DialogDescription>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                            {new Date(entry.createdAt).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto py-2 px-4 sm:px-6">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm sm:text-base text-foreground whitespace-pre-wrap leading-relaxed break-words">
                                {entry.text}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 p-4 sm:p-6 border-t border-border flex-shrink-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        {entry.keywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-md text-xs sm:text-sm"
                            >
                                # {keyword}
                            </span>
                        ))}
                    </div>
                    <Button variant="destructive" onClick={() => onDelete(entry.id)} className="w-full sm:w-auto">
                        <Trash2 className="h-4 w-4 mr-2" />
                        삭제
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


