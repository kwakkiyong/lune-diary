import {Button} from '@/components/ui/button'

type DateRange = '7days' | '30days' | 'all'

interface DateRangeFilterProps {
    dateRange: DateRange
    onDateRangeChange: (range: DateRange) => void
}

export function DateRangeFilter({dateRange, onDateRangeChange}: DateRangeFilterProps) {
    return (
        <div className="flex gap-2 w-full sm:w-auto">
            <Button
                variant={dateRange === '7days' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onDateRangeChange('7days')}
                className="flex-1 sm:flex-initial"
            >
                7일
            </Button>
            <Button
                variant={dateRange === '30days' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onDateRangeChange('30days')}
                className="flex-1 sm:flex-initial"
            >
                30일
            </Button>
            <Button
                variant={dateRange === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onDateRangeChange('all')}
                className="flex-1 sm:flex-initial"
            >
                전체
            </Button>
        </div>
    )
}

