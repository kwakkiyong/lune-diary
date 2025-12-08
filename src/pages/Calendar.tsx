import {useState, useMemo} from 'react'
import {useEntryStore} from '@/stores/useEntryStore'
import type {DiaryEntry} from '@/types'
import {formatLocalDate} from '@/lib/utils'
import {CalendarSection} from '@/components/calendar/CalendarSection'
import CalendarTitle from '@/components/calendar/CalendarTitle'
import {DiaryEntryList} from '@/components/calendar/DiaryEntryList'
import {DiaryEntryModal} from '@/components/calendar/DiaryEntryModal'
import {useModalScrollLock} from '@/hooks/useModalScrollLock'

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
    useModalScrollLock(isDialogOpen)

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
        <div className="space-y-4 sm:space-y-6">
            <CalendarTitle/>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4 sm:gap-6">
                {/* 달력 */}
                <CalendarSection selectedDate={selectedDate} onDateChange={handleDateChange}/>

                {/* 선택한 날짜의 일기 목록 */}
                <DiaryEntryList
                    selectedDateString={selectedDateString}
                    entries={selectedDateEntries}
                    onEntryClick={handleEntryClick}
                    onDelete={handleDeleteEntry}
                />
            </div>

            {/* 일기 상세 모달 */}
            <DiaryEntryModal
                entry={selectedEntry}
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false)
                    setSelectedEntry(null)
                }}
                onDelete={handleDeleteEntry}
            />
        </div>
    )
}


