import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#0088fe', '#ff00ff']

interface EmotionPieChartProps {
    data: Array<{name: string; value: number}>
}

export function EmotionPieChart({data}: EmotionPieChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>감정별 비율</CardTitle>
                <CardDescription>기간 내 감정 분포</CardDescription>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({name, percent}) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-muted-foreground py-12">데이터가 없습니다</p>
                )}
            </CardContent>
        </Card>
    )
}

