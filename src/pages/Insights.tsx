import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEntryStore } from '@/stores/useEntryStore'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type DateRange = '7days' | '30days' | 'all'

export function Insights() {
  const { entries } = useEntryStore()
  const [dateRange, setDateRange] = useState<DateRange>('30days')

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
    return Object.entries(emotionCount).map(([name, value]) => ({ name, value }))
  }, [filteredEntries])

  const scoreData = useMemo(() => {
    return filteredEntries
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((entry) => ({
        date: new Date(entry.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
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
      .map(([name, value]) => ({ name, value }))
  }, [filteredEntries])

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#0088fe', '#ff00ff']

  if (filteredEntries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">아직 기록된 감정 일기가 없습니다.</p>
        <p className="text-sm text-muted-foreground mt-2">Home 페이지에서 첫 일기를 작성해보세요!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">감정 통계</h1>
          <p className="text-muted-foreground mt-1">나의 감정 패턴을 분석해보세요</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={dateRange === '7days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('7days')}
          >
            7일
          </Button>
          <Button
            variant={dateRange === '30days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('30days')}
          >
            30일
          </Button>
          <Button
            variant={dateRange === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('all')}
          >
            전체
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>감정별 비율</CardTitle>
            <CardDescription>기간 내 감정 분포</CardDescription>
          </CardHeader>
          <CardContent>
            {emotionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emotionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-12">데이터가 없습니다</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>감정 점수 추이</CardTitle>
            <CardDescription>시간에 따른 감정 점수 변화</CardDescription>
          </CardHeader>
          <CardContent>
            {scoreData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-12">데이터가 없습니다</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>키워드 빈도</CardTitle>
          <CardDescription>가장 자주 등장한 키워드</CardDescription>
        </CardHeader>
        <CardContent>
          {keywordData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={keywordData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-12">데이터가 없습니다</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

