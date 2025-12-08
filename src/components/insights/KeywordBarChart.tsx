import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

interface KeywordBarChartProps {
    data: Array<{name: string; value: number}>
}

export function KeywordBarChart({data}: KeywordBarChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>키워드 빈도</CardTitle>
                <CardDescription>가장 자주 등장한 키워드</CardDescription>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="value" fill="#8884d8"/>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-muted-foreground py-12">데이터가 없습니다</p>
                )}
            </CardContent>
        </Card>
    )
}

