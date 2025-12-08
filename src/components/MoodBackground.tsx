import {motion} from 'framer-motion'
import {memo, useMemo} from 'react'

type MoodAnimationType = 'rain' | 'petals' | 'sparkles' | 'stars' | 'fire' | 'mist' | 'none'

interface MoodAnimation {
    type: MoodAnimationType
    colors: string[]
}

interface MoodBackgroundProps {
    mood: string
}

// 배경 색상
const DARK_BACKGROUND = ['#1a1a2e', '#16213e', '#0f3460']

// 배경 그라디언트 기본 설정
const BACKGROUND_OPACITY = 0.8
const GRADIENT_ANGLE = '135deg'

// 애니메이션 설정 상수
const ANIMATION_CONFIG = {
    rain: {count: 50, height: '20px'},
    stars: {count: 50},
    petals: {count: 30, size: '12px'},
    sparkles: {count: 40, size: '8px'},
    fire: {count: 25},
    mist: {count: 6, pulseCount: 3},
} as const

// AI 감정 레이블을 사용자 선택 감정으로 매핑
const AI_EMOTION_TO_MOOD: Record<string, string> = {
    행복: '행복한',
    기쁨: '기쁜',
    슬픔: '슬픈',
    우울: '우울한',
    불안: '불안한',
    분노: '화나는',
    평온: '평범한',
    피곤: '피곤한',
} as const

const MOOD_ANIMATIONS: Record<string, MoodAnimation> = {
    행복한: {
        type: 'petals',
        colors: DARK_BACKGROUND,
    },
    기쁜: {
        type: 'sparkles',
        colors: DARK_BACKGROUND,
    },
    평범한: {
        type: 'none',
        colors: DARK_BACKGROUND,
    },
    피곤한: {
        type: 'stars',
        colors: DARK_BACKGROUND,
    },
    슬픈: {
        type: 'rain',
        colors: DARK_BACKGROUND,
    },
    우울한: {
        type: 'rain',
        colors: DARK_BACKGROUND,
    },
    화나는: {
        type: 'fire',
        colors: DARK_BACKGROUND,
    },
    불안한: {
        type: 'mist',
        colors: DARK_BACKGROUND,
    },
} as const

const defaultMood: MoodAnimation = {
    type: 'none',
    colors: DARK_BACKGROUND,
}

// 공통 배경 그라디언트 컴포넌트
interface BackgroundGradientProps {
    colors: string[]
    opacity?: number
}

function BackgroundGradient({colors, opacity = BACKGROUND_OPACITY}: BackgroundGradientProps) {
    const gradientStyle = useMemo(
        () => ({
            background: `linear-gradient(${GRADIENT_ANGLE}, ${colors[0]}, ${colors[1]}, ${colors[2] || colors[0]})`,
            opacity,
        }),
        [colors, opacity]
    )

    return <div className="absolute inset-0" style={gradientStyle}/>
}

function MoodBackgroundComponent({mood}: MoodBackgroundProps) {
    // AI 감정 레이블을 사용자 선택 감정으로 변환
    const normalizedMood = useMemo(() => AI_EMOTION_TO_MOOD[mood] || mood, [mood])

    // 애니메이션 종류를 직접 계산 (useState/useEffect 제거)
    const animation = useMemo(() => {
        return MOOD_ANIMATIONS[normalizedMood] || defaultMood
    }, [normalizedMood])

    // 모든 애니메이션 데이터를 상단에서 미리 계산 (hooks 규칙 준수)
    const rainDrops = useMemo(() => {
        return Array.from({length: ANIMATION_CONFIG.rain.count}, (_, i) => ({
            id: i,
            left: (i * 7) % 100,
            duration: 0.5 + (i % 3) * 0.3,
            delay: (i % 4) * 0.5,
        }))
    }, [])

    const stars = useMemo(() => {
        return Array.from({length: ANIMATION_CONFIG.stars.count}, (_, i) => ({
            id: i,
            left: (i * 7.3) % 100,
            top: (i * 5.7) % 100,
            duration: 1 + (i % 3) * 0.7,
            delay: (i % 5) * 0.4,
        }))
    }, [])

    const petals = useMemo(() => {
        return Array.from({length: ANIMATION_CONFIG.petals.count}, (_, i) => ({
            id: i,
            left: (i * 10) % 100,
            xOffset1: Math.sin(i * 0.5) * 100,
            xOffset2: Math.cos(i * 0.3) * 150,
            xOffset3: Math.sin(i * 0.7) * 100,
            duration: 4 + (i % 4) * 0.75,
            delay: (i % 6) * 0.5,
        }))
    }, [])

    const sparkles = useMemo(() => {
        return Array.from({length: ANIMATION_CONFIG.sparkles.count}, (_, i) => ({
            id: i,
            left: (i * 8) % 100,
            top: (i * 6) % 100,
            duration: 1 + (i % 3) * 0.5,
            delay: (i % 4) * 0.5,
        }))
    }, [])

    const flames = useMemo(() => {
        return Array.from({length: ANIMATION_CONFIG.fire.count}, (_, i) => ({
            id: i,
            left: (i * 15) % 100,
            width: 10 + (i % 5) * 4,
            height: 20 + (i % 4) * 3,
            y1: -(50 + (i % 3) * 20),
            y2: -(100 + (i % 4) * 15),
            x1: Math.sin(i * 0.5) * 30,
            x2: Math.cos(i * 0.3) * 50,
            duration: 1.5 + (i % 3) * 0.5,
            delay: (i % 4) * 0.5,
        }))
    }, [])

    const mistClouds = useMemo(() => {
        return Array.from({length: ANIMATION_CONFIG.mist.count}, (_, i) => ({
            id: i,
            left: (i * 16.6) % 100,
            top: (i * 15) % 100,
            width: 200 + (i % 3) * 50,
            height: 150 + (i % 2) * 50,
            x1: Math.sin(i * 0.5) * 100,
            x2: Math.cos(i * 0.3) * 80,
            x3: Math.sin(i * 0.7) * 120,
            y1: Math.cos(i * 0.4) * 80,
            y2: Math.sin(i * 0.6) * 100,
            y3: Math.cos(i * 0.8) * 90,
            duration: 15 + i * 2,
            delay: i * 1.5,
        }))
    }, [])

    const pulses = useMemo(() => {
        return Array.from({length: ANIMATION_CONFIG.mist.pulseCount}, (_, i) => ({
            id: i,
            left: 30 + i * 20,
            top: 20 + i * 25,
            size: 300 + i * 100,
            duration: 8 + i * 2,
            delay: i * 2,
        }))
    }, [])

    // 애니메이션 없음 (평범한)
    if (animation.type === 'none') {
        return (
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                <BackgroundGradient colors={animation.colors}/>
            </div>
        )
    }

    // 비 애니메이션 (슬픈, 우울한)
    if (animation.type === 'rain') {
        return (
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                <BackgroundGradient colors={animation.colors}/>
                {/* 비 방울 효과 */}
                {rainDrops.map((drop) => (
                    <motion.div
                        key={`rain-${drop.id}`}
                        className="absolute w-0.5 bg-white/30"
                        style={{
                            left: `${drop.left}%`,
                            height: ANIMATION_CONFIG.rain.height,
                            top: '-20px',
                        }}
                        animate={{
                            y: ['0vh', '100vh'],
                            opacity: [0, 0.5, 0.5, 0],
                        }}
                        transition={{
                            duration: drop.duration,
                            repeat: Infinity,
                            delay: drop.delay,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>
        )
    }

    // 별 애니메이션 (피곤한)
    if (animation.type === 'stars') {
        return (
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                <BackgroundGradient colors={animation.colors} opacity={0.9}/>
                {stars.map((star) => (
                    <motion.div
                        key={`star-${star.id}`}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                        }}
                    />
                ))}
            </div>
        )
    }

    // 꽃잎 애니메이션 (행복한)
    if (animation.type === 'petals') {
        return (
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                <BackgroundGradient colors={animation.colors}/>
                {petals.map((petal) => (
                    <motion.div
                        key={`petal-${petal.id}`}
                        className="absolute"
                        style={{
                            left: `${petal.left}%`,
                            top: '-20px',
                            width: ANIMATION_CONFIG.petals.size,
                            height: ANIMATION_CONFIG.petals.size,
                        }}
                        animate={{
                            y: ['0vh', '100vh'],
                            x: [0, petal.xOffset1, petal.xOffset2, petal.xOffset3],
                            rotate: [0, 180, 360, 540],
                            opacity: [0, 0.6, 0.6, 0],
                        }}
                        transition={{
                            duration: petal.duration,
                            repeat: Infinity,
                            delay: petal.delay,
                            ease: 'easeInOut',
                        }}
                    >
                        <div
                            className="w-full h-full rounded-full"
                            style={{
                                background: `radial-gradient(circle, rgba(255,182,193,0.8) 0%, rgba(255,105,180,0.6) 50%, rgba(255,20,147,0.4) 100%)`,
                                filter: 'blur(1px)',
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        )
    }

    // 반짝이 애니메이션 (기쁜)
    if (animation.type === 'sparkles') {
        return (
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                <BackgroundGradient colors={animation.colors}/>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={`sparkle-${sparkle.id}`}
                        className="absolute w-2 h-2"
                        style={{
                            left: `${sparkle.left}%`,
                            top: `${sparkle.top}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: sparkle.duration,
                            repeat: Infinity,
                            delay: sparkle.delay,
                            ease: 'easeInOut',
                        }}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,215,0,0.8) 50%, transparent 100%)`,
                                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        )
    }

    // 불꽃 애니메이션 (화나는)
    if (animation.type === 'fire') {
        return (
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                <BackgroundGradient colors={animation.colors}/>
                {flames.map((flame) => (
                    <motion.div
                        key={`fire-${flame.id}`}
                        className="absolute"
                        style={{
                            left: `${flame.left}%`,
                            bottom: '0',
                            width: `${flame.width}px`,
                            height: `${flame.height}px`,
                        }}
                        animate={{
                            y: [0, flame.y1, flame.y2],
                            x: [0, flame.x1, flame.x2],
                            opacity: [0.8, 0.6, 0],
                            scale: [1, 0.8, 0.3],
                        }}
                        transition={{
                            duration: flame.duration,
                            repeat: Infinity,
                            delay: flame.delay,
                            ease: 'easeOut',
                        }}
                    >
                        <div
                            className="w-full h-full rounded-t-full"
                            style={{
                                background: `linear-gradient(to top, rgba(255,69,0,0.9) 0%, rgba(255,140,0,0.7) 50%, rgba(255,215,0,0.5) 100%)`,
                                filter: 'blur(2px)',
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        )
    }

    // 안개/미스트 애니메이션 (불안) - 부드럽고 눈에 편안한 효과
    if (animation.type === 'mist') {
        return (
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                <BackgroundGradient colors={animation.colors}/>
                {/* 부드럽게 떠다니는 안개 효과 */}
                {mistClouds.map((cloud) => (
                    <motion.div
                        key={`mist-${cloud.id}`}
                        className="absolute rounded-full"
                        style={{
                            left: `${cloud.left}%`,
                            top: `${cloud.top}%`,
                            width: `${cloud.width}px`,
                            height: `${cloud.height}px`,
                        }}
                        animate={{
                            x: [0, cloud.x1, cloud.x2, cloud.x3, 0],
                            y: [0, cloud.y1, cloud.y2, cloud.y3, 0],
                            opacity: [0.08, 0.15, 0.12, 0.18, 0.08],
                            scale: [1, 1.2, 0.9, 1.1, 1],
                        }}
                        transition={{
                            duration: cloud.duration,
                            repeat: Infinity,
                            delay: cloud.delay,
                            ease: 'easeInOut',
                        }}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                background: `radial-gradient(ellipse, rgba(150,150,200,0.15) 0%, rgba(100,100,150,0.1) 50%, transparent 100%)`,
                                filter: 'blur(40px)',
                            }}
                        />
                    </motion.div>
                ))}
                {/* 미묘한 펄스 효과 */}
                {pulses.map((pulse) => (
                    <motion.div
                        key={`pulse-${pulse.id}`}
                        className="absolute rounded-full"
                        style={{
                            left: `${pulse.left}%`,
                            top: `${pulse.top}%`,
                            width: `${pulse.size}px`,
                            height: `${pulse.size}px`,
                        }}
                        animate={{
                            opacity: [0.05, 0.12, 0.05],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: pulse.duration,
                            repeat: Infinity,
                            delay: pulse.delay,
                            ease: 'easeInOut',
                        }}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                background: `radial-gradient(circle, rgba(120,120,180,0.1) 0%, transparent 70%)`,
                                filter: 'blur(30px)',
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        )
    }

    // 기본 (없어서는 안 됨)
    return (
        <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
            <BackgroundGradient colors={animation.colors}/>
        </div>
    )
}

export const MoodBackground = memo(MoodBackgroundComponent)
