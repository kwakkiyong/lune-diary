import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './calendar.css'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {useEntryStore} from '@/stores/useEntryStore'
import {formatLocalDate} from '@/lib/utils'
import {useState} from 'react'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface CalendarSectionProps {
    selectedDate: Date
    onDateChange: (date: Date) => void
}

export function CalendarSection({selectedDate, onDateChange}: CalendarSectionProps) {
    const {entries} = useEntryStore()
    const [activeStartDate, setActiveStartDate] = useState<Date>(new Date())

    // 달력에 표시할 날짜에 일기가 있는지 확인
    const hasEntry = (date: Date) => {
        const dateString = formatLocalDate(date)
        return entries.some((entry) => entry.date === dateString)
    }

    // 타일 클래스 커스터마이징
    const tileClassName = ({date, view}: { date: Date; view: string }) => {
        if (view === 'month') {
            if (hasEntry(date)) {
                return 'has-entry'
            }
        }
        return null
    }

    const handleDateChange = (value: Value) => {
        if (value instanceof Date) {
            onDateChange(value)
            setActiveStartDate(value) // 선택한 날짜의 월로 달력 이동
        } else if (Array.isArray(value) && value[0]) {
            onDateChange(value[0])
            setActiveStartDate(value[0]) // 선택한 날짜의 월로 달력 이동
        }
    }

    const handleTodayClick = () => {
        const today = new Date()
        onDateChange(today)
        setActiveStartDate(today) // 오늘 날짜의 월로 달력 이동
    }

    return (
        <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader>
                <CardTitle className="text-foreground">달력</CardTitle>
                <CardDescription>일기가 있는 날짜는 강조 표시됩니다</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="w-full max-w-md mx-auto relative">
                    <ReactCalendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        activeStartDate={activeStartDate}
                        onActiveStartDateChange={({activeStartDate}) => {
                            if (activeStartDate) {
                                setActiveStartDate(activeStartDate)
                            }
                        }}
                        tileClassName={tileClassName}
                        className="w-full"
                        formatMonthYear={(_locale, date) => {
                            return date.toLocaleDateString('ko-KR', {year: 'numeric', month: 'long'})
                        }}
                        formatShortWeekday={(_locale, date) => {
                            const weekdays = ['일', '월', '화', '수', '목', '금', '토']
                            return weekdays[date.getDay()]
                        }}
                        formatDay={(_locale, date) => {
                            return date.getDate().toString()
                        }}
                    />
                    <button
                        onClick={handleTodayClick}
                        className="calendar-today-button"
                        type="button"
                    >
                        오늘
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
