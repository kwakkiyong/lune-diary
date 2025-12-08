import {useState} from 'react'
import {useEntryStore} from '@/stores/useEntryStore'
import {InsightsHeader} from '@/components/insights/InsightsHeader'
import {DateRangeFilter} from '@/components/insights/DateRangeFilter'
import {EmptyState} from '@/components/insights/EmptyState'
import {EmotionPieChart} from '@/components/insights/EmotionPieChart'
import {EmotionScoreLineChart} from '@/components/insights/EmotionScoreLineChart'
import {KeywordBarChart} from '@/components/insights/KeywordBarChart'
import {useInsightsData} from '@/hooks/useInsightsData'

type DateRange = '7days' | '30days' | 'all'

export function Insights() {
    const {entries} = useEntryStore()
    const [dateRange, setDateRange] = useState<DateRange>('30days')

    const {filteredEntries, emotionData, scoreData, keywordData} = useInsightsData({
        entries,
        dateRange,
    })

    if (filteredEntries.length === 0) {
        return <EmptyState/>
    }

    return (
        <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 relative">
                <InsightsHeader/>
                <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <EmotionPieChart data={emotionData}/>
                <EmotionScoreLineChart data={scoreData}/>
            </div>

            <KeywordBarChart data={keywordData}/>
        </div>
    )
}

