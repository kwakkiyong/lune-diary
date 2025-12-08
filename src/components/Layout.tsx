import {Link, useLocation} from 'react-router-dom'
import {Moon, Home, BarChart3, Settings, Calendar, Menu, X} from 'lucide-react'
import {MusicPlayerFooter} from './MusicPlayerFooter'
import {MoodBackground} from './MoodBackground'
import {useAnalysisStore} from '@/stores/useAnalysisStore'
import {useState} from 'react'
import {Button} from '@/components/ui/button'

export function Layout({children}: { children: React.ReactNode }) {
    const location = useLocation()
    const {currentAnalysis} = useAnalysisStore()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                <div className="container mx-auto px-4 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-foreground"
                        >
                            <Moon className="h-5 w-5 sm:h-6 sm:w-6"/>
                            <span>LuneDiary</span>
                        </Link>
                        {/* 데스크톱 네비게이션 */}
                        <nav className="hidden md:flex gap-2 lg:gap-4">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = location.pathname === item.path
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-md transition-colors text-foreground text-sm lg:text-base ${
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
                        {/* 모바일 메뉴 버튼 */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                        </Button>
                    </div>
                    {/* 모바일 네비게이션 */}
                    {isMobileMenuOpen && (
                        <nav className="md:hidden mt-4 pb-2 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = location.pathname === item.path
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
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
                    )}
                </div>
            </header>
            <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 pb-20 sm:pb-24 lg:pb-28">
                {children}
            </main>
            <MusicPlayerFooter/>
        </div>
    )
}

