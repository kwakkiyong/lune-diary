import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import type {DiaryEntry} from '@/types'
import {DiaryEntryCard} from './DiaryEntryCard'

interface DiaryEntryListProps {
    selectedDateString: string
    entries: DiaryEntry[]
    onEntryClick: (entry: DiaryEntry) => void
    onDelete: (id: string) => void
}

export function DiaryEntryList({
                                   selectedDateString,
                                   entries,
                                   onEntryClick,
                                   onDelete,
                               }: DiaryEntryListProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <CardTitle className="text-lg sm:text-xl text-foreground">{selectedDateString}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        {entries.length > 0
                            ? `${entries.length}개의 일기가 있습니다`
                            : '이 날짜에는 일기가 없습니다'}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden flex flex-col px-3 sm:px-5">
                {entries.length > 0 ? (
                    <div
                        className="space-y-3 sm:space-y-4 overflow-y-auto flex-1 pr-2 pb-4 sm:pb-5"
                        style={{
                            maxHeight: '545px',
                        }}
                    >
                        {entries.map((entry) => (
                            <DiaryEntryCard
                                key={entry.id}
                                entry={entry}
                                onDelete={onDelete}
                                onClick={() => onEntryClick(entry)}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="flex items-center justify-center h-full min-h-[300px] sm:min-h-[400px] text-center text-muted-foreground px-4">
                        <div>
                            <p className="text-sm sm:text-base">이 날짜에는 기록된 일기가 없습니다.</p>
                            <p className="text-xs sm:text-sm mt-2">Home 페이지에서 일기를 작성해보세요!</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}


