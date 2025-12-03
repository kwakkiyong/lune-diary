import { motion } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

interface MoodBackgroundProps {
  mood: string
}

// 사용자가 직접 선택한 감정 또는 AI가 분석한 감정에 사용되는 배경 애니메이션
// 모든 배경색을 어두운 색으로 통일
const DARK_BACKGROUND = ['#1a1a2e', '#16213e', '#0f3460']

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
}

const MOOD_ANIMATIONS: Record<string, { type: 'rain' | 'petals' | 'sparkles' | 'stars' | 'fire' | 'lightning' | 'mist' | 'none'; colors: string[] }> = {
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
}

const defaultMood = {
  type: 'none' as const,
  colors: DARK_BACKGROUND,
}

function MoodBackgroundComponent({ mood }: MoodBackgroundProps) {
  // AI 감정 레이블을 사용자 선택 감정으로 변환
  const normalizedMood = AI_EMOTION_TO_MOOD[mood] || mood
  
  const [animation, setAnimation] = useState<{ type: 'rain' | 'petals' | 'sparkles' | 'stars' | 'fire' | 'lightning' | 'mist' | 'none'; colors: string[] }>(() => {
    return MOOD_ANIMATIONS[normalizedMood] || defaultMood
  })

  useEffect(() => {
    const normalized = AI_EMOTION_TO_MOOD[mood] || mood
    const moodAnimation = MOOD_ANIMATIONS[normalized] || defaultMood
    setAnimation((prev) => {
      // 타입이 변경될 때만 상태 업데이트
      if (moodAnimation.type !== prev.type) {
        return moodAnimation
      }
      return prev
    })
  }, [mood])

  // 애니메이션 없음 (평범한)
  if (animation.type === 'none') {
    return (
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${animation.colors[0]}, ${animation.colors[1]}, ${animation.colors[2] || animation.colors[0]})`,
            opacity: 0.8,
          }}
        />
      </div>
    )
  }

  // 비 애니메이션 (슬픈, 우울한)
  if (animation.type === 'rain') {
    return (
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${animation.colors[0]}, ${animation.colors[1]}, ${animation.colors[2] || animation.colors[0]})`,
            opacity: 0.8,
          }}
        />
        {/* 비 방울 효과 */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-0.5 bg-white/30"
            style={{
              left: `${(i * 7) % 100}%`,
              height: '20px',
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 1 + 0.5,
              repeat: Infinity,
              delay: Math.random() * 2,
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
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${animation.colors[0]}, ${animation.colors[1]}, ${animation.colors[2] || animation.colors[0]})`,
            opacity: 0.9,
          }}
        />
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 5.7) % 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
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
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${animation.colors[0]}, ${animation.colors[1]}, ${animation.colors[2] || animation.colors[0]})`,
            opacity: 0.8,
          }}
        />
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute"
            style={{
              left: `${(i * 10) % 100}%`,
              top: '-20px',
              width: '12px',
              height: '12px',
            }}
            animate={{
              y: ['0vh', '100vh'],
              x: [
                0,
                Math.sin(i * 0.5) * 100,
                Math.cos(i * 0.3) * 150,
                Math.sin(i * 0.7) * 100,
              ],
              rotate: [0, 180, 360, 540],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
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
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${animation.colors[0]}, ${animation.colors[1]}, ${animation.colors[2] || animation.colors[0]})`,
            opacity: 0.8,
          }}
        />
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2"
            style={{
              left: `${(i * 8) % 100}%`,
              top: `${(i * 6) % 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 1.5 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
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
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${animation.colors[0]}, ${animation.colors[1]}, ${animation.colors[2] || animation.colors[0]})`,
            opacity: 0.8,
          }}
        />
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`fire-${i}`}
            className="absolute"
            style={{
              left: `${(i * 15) % 100}%`,
              bottom: '0',
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 30 + 20}px`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50, -Math.random() * 150 - 100],
              x: [
                0,
                Math.sin(i * 0.5) * 30,
                Math.cos(i * 0.3) * 50,
              ],
              opacity: [0.8, 0.6, 0],
              scale: [1, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 1.5 + 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
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
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${animation.colors[0]}, ${animation.colors[1]}, ${animation.colors[2] || animation.colors[0]})`,
            opacity: 0.8,
          }}
        />
        {/* 부드럽게 떠다니는 안개 효과 */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`mist-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${(i * 16.6) % 100}%`,
              top: `${(i * 15) % 100}%`,
              width: `${200 + Math.random() * 150}px`,
              height: `${150 + Math.random() * 100}px`,
            }}
            animate={{
              x: [
                0,
                Math.sin(i * 0.5) * 100,
                Math.cos(i * 0.3) * 80,
                Math.sin(i * 0.7) * 120,
                0,
              ],
              y: [
                0,
                Math.cos(i * 0.4) * 80,
                Math.sin(i * 0.6) * 100,
                Math.cos(i * 0.8) * 90,
                0,
              ],
              opacity: [0.08, 0.15, 0.12, 0.18, 0.08],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
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
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 25}%`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
            }}
            animate={{
              opacity: [0.05, 0.12, 0.05],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
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
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${animation.colors[0]}, ${animation.colors[1]}, ${animation.colors[2] || animation.colors[0]})`,
          opacity: 0.8,
        }}
      />
    </div>
  )
}

export const MoodBackground = memo(MoodBackgroundComponent)
