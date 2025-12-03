import {useState, useMemo, useEffect} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {useEntryStore} from '@/stores/useEntryStore'
import type {DiaryEntry} from '@/types'
import {Trash2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {cn, formatLocalDate} from '@/lib/utils'
import {CalendarSection} from '@/components/calendar/CalendarSection'
import CalendarTitle from "@/components/calendar/CalendarTitle.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

export function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const {entries, removeEntry} = useEntryStore()

    // 선택한 날짜의 일기 목록
    const selectedDateEntries = useMemo(() => {
        const dateString = formatLocalDate(selectedDate)
        return entries.filter((entry) => entry.date === dateString)
    }, [entries, selectedDate])

    const handleDateChange = (date: Date) => {
        setSelectedDate(date)
    }

    const handleDeleteEntry = (id: string) => {
        if (confirm('이 일기를 삭제하시겠습니까?')) {
            removeEntry(id)
            if (selectedEntry?.id === id) {
                setIsDialogOpen(false)
                setSelectedEntry(null)
            }
        }
    }

    // 모달이 열릴 때 body 스크롤 방지
    useEffect(() => {
        if (isDialogOpen) {
            // 현재 스크롤 위치 저장
            const scrollY = window.scrollY
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = '100%'
            document.body.style.overflow = 'hidden'
            
            return () => {
                // 모달이 닫힐 때 원래 스크롤 위치로 복원
                document.body.style.position = ''
                document.body.style.top = ''
                document.body.style.width = ''
                document.body.style.overflow = ''
                window.scrollTo(0, scrollY)
            }
        }
    }, [isDialogOpen])

    const handleEntryClick = (entry: DiaryEntry) => {
        setSelectedEntry(entry)
        setIsDialogOpen(true)
    }

    const selectedDateString = selectedDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="space-y-6">
            <CalendarTitle/>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
                {/* 달력 */}
                <CalendarSection selectedDate={selectedDate} onDateChange={handleDateChange}/>

                {/* 선택한 날짜의 일기 목록 */}
                <Card className="backdrop-blur-sm bg-card/80 flex flex-col">
                    <CardHeader>
                        <div className='flex gap-4'>
                            <CardTitle className="text-foreground">{selectedDateString}</CardTitle>
                            <CardDescription>
                                {selectedDateEntries.length > 0
                                    ? `${selectedDateEntries.length}개의 일기가 있습니다`
                                    : '이 날짜에는 일기가 없습니다'}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden flex flex-col pb-5 px-5">
                        {selectedDateEntries.length > 0 ? (
                            <div
                                className="space-y-4 overflow-y-auto flex-1 pr-2"
                                style={{
                                    maxHeight: '545px', // 일기 카드 약 2개 높이
                                }}
                            >
                                {selectedDateEntries.map((entry) => (
                                    <DiaryEntryCard
                                        key={entry.id}
                                        entry={entry}
                                        onDelete={handleDeleteEntry}
                                        onClick={() => handleEntryClick(entry)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div
                                className="flex items-center justify-center h-full min-h-[400px] text-center text-muted-foreground">
                                <div>
                                    <p>이 날짜에는 기록된 일기가 없습니다.</p>
                                    <p className="text-sm mt-2">Home 페이지에서 일기를 작성해보세요!</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* 일기 상세 모달 */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0">
                    {selectedEntry && (
                        <>
                            <DialogHeader className="p-6 pb-4 border-b border-border flex-shrink-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-baseline gap-1">
                                        <span className={cn(
                                            "text-3xl font-bold",
                                            selectedEntry.emotionScore >= 80 ? "text-green-500" :
                                                selectedEntry.emotionScore >= 60 ? "text-yellow-500" :
                                                    selectedEntry.emotionScore >= 40 ? "text-orange-500" :
                                                        "text-red-500"
                                        )}>
                                            {selectedEntry.emotionScore}
                                        </span>
                                        <span className="text-lg text-muted-foreground font-medium">점</span>
                                    </div>
                                    <span className={cn(
                                        'px-2 py-1 rounded-full text-xs font-medium',
                                        emotionColors[selectedEntry.emotionLabel] || 'bg-primary/20 text-primary'
                                    )}>
                                        {selectedEntry.emotionLabel}
                                    </span>
                                </div>
                                <DialogTitle
                                    className="text-foreground text-xl font-bold border-l-4 border-primary pl-3 py-2">
                                    {selectedEntry.summary}
                                </DialogTitle>
                                <DialogDescription>
                                    <span className="text-sm text-muted-foreground ml-auto">
                                        {new Date(selectedEntry.createdAt).toLocaleString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto py-2 px-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                                            {selectedEntry.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between p-6 border-t border-border flex-shrink-0">
                                <div className='flex items-center gap-2'>
                                    <div className="flex gap-2 flex-wrap">
                                        {selectedEntry.keywords.map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm"
                                            >
                                                    # {keyword}
                                                </span>
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        handleDeleteEntry(selectedEntry.id)
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2"/>
                                    삭제
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

const emotionColors: Record<string, string> = {
    행복: 'bg-yellow-500/20 text-yellow-500',
    기쁨: 'bg-orange-500/20 text-orange-500',
    슬픔: 'bg-blue-500/20 text-blue-500',
    우울: 'bg-purple-500/20 text-purple-500',
    불안: 'bg-cyan-500/20 text-cyan-500',
    분노: 'bg-red-500/20 text-red-500',
    평온: 'bg-green-500/20 text-green-500',
    피곤: 'bg-gray-500/20 text-gray-500',
}

interface DiaryEntryCardProps {
    entry: DiaryEntry
    onDelete: (id: string) => void
    onClick: () => void
}

function DiaryEntryCard({entry, onDelete, onClick}: DiaryEntryCardProps) {
    const emotionColor = emotionColors[entry.emotionLabel] || 'bg-primary/20 text-primary'

    return (
        <Card
            className="relative backdrop-blur-sm bg-card/80 cursor-pointer hover:bg-card/90 transition-colors"
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
              <span className={cn('px-2 py-1 rounded-full text-xs font-medium', emotionColor)}>
                {entry.emotionLabel}
              </span>
                            <span className="text-sm text-muted-foreground">
                {entry.emotionScore}점
              </span>
                        </div>
                        <CardTitle className="text-lg text-foreground">{entry.summary}</CardTitle>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete(entry.id)
                        }}
                    >
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-foreground line-clamp-3 min-h-[4.5rem] leading-relaxed">{entry.text}</p>
                <div className="flex gap-2 flex-wrap">
                    {entry.keywords.map((keyword, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
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

