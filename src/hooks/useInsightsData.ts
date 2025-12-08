import {useMemo} from 'react'
import type {DiaryEntry} from '@/types'

type DateRange = '7days' | '30days' | 'all'

interface UseInsightsDataProps {
    entries: DiaryEntry[]
    dateRange: DateRange
}

export function useInsightsData({entries, dateRange}: UseInsightsDataProps) {
    const filteredEntries = useMemo(() => {
        const now = new Date()
        let startDate: Date

        switch (dateRange) {
            case '7days':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                break
            case '30days':
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                break
            default:
                return entries
        }

        return entries.filter((entry) => new Date(entry.date) >= startDate)
    }, [entries, dateRange])

    const emotionData = useMemo(() => {
        const emotionCount: Record<string, number> = {}
        filteredEntries.forEach((entry) => {
            emotionCount[entry.emotionLabel] = (emotionCount[entry.emotionLabel] || 0) + 1
        })
        return Object.entries(emotionCount).map(([name, value]) => ({name, value}))
    }, [filteredEntries])

    const scoreData = useMemo(() => {
        return filteredEntries
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((entry) => ({
                date: new Date(entry.date).toLocaleDateString('ko-KR', {month: 'short', day: 'numeric'}),
                score: entry.emotionScore,
                emotion: entry.emotionLabel,
            }))
    }, [filteredEntries])

    const keywordData = useMemo(() => {
        const keywordCount: Record<string, number> = {}
        filteredEntries.forEach((entry) => {
            entry.keywords.forEach((keyword) => {
                keywordCount[keyword] = (keywordCount[keyword] || 0) + 1
            })
        })
        return Object.entries(keywordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([name, value]) => ({name, value}))
    }, [filteredEntries])

    return {
        filteredEntries,
        emotionData,
        scoreData,
        keywordData,
    }
}

