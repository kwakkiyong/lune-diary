import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

interface EmotionScoreLineChartProps {
    data: Array<{date: string; score: number; emotion: string}>
}

export function EmotionScoreLineChart({data}: EmotionScoreLineChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>감정 점수 추이</CardTitle>
                <CardDescription>시간에 따른 감정 점수 변화</CardDescription>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis domain={[0, 100]}/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-muted-foreground py-12">데이터가 없습니다</p>
                )}
            </CardContent>
        </Card>
    )
}

