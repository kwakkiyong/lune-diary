import {Link, useLocation} from 'react-router-dom'
import {Moon, Home, BarChart3, Settings, Calendar} from 'lucide-react'
import {MusicPlayerFooter} from './MusicPlayerFooter'
import {MoodBackground} from './MoodBackground'
import {useAnalysisStore} from '@/stores/useAnalysisStore'

export function Layout({children}: { children: React.ReactNode }) {
    const location = useLocation()
    const {currentAnalysis} = useAnalysisStore()

    const navItems = [
        {path: '/', label: 'Home', icon: Home},
        {path: '/calendar', label: 'Calendar', icon: Calendar},
        {path: '/insights', label: 'Insights', icon: BarChart3},
        {path: '/settings', label: 'Settings', icon: Settings},
    ]

    // AI 분석 결과가 있으면 그 감정을 사용, 없으면 기본값 '평온' (평범한 하루)
    const activeMood = currentAnalysis?.emotionLabel || '평온'

    return (
        <div className="min-h-screen bg-transparent">
            <MoodBackground mood={activeMood}/>
            <header className="border-b border-border bg-background/80 backdrop-blur-sm relative z-20">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
                        <Moon className="h-6 w-6"/>
                        <span>LuneDiary</span>
                    </Link>
                    <nav className="flex gap-4">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = location.pathname === item.path
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-foreground ${
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                >
                                    <Icon className="h-4 w-4"/>
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 pb-24">{children}</main>
            <MusicPlayerFooter/>
        </div>
    )
}

