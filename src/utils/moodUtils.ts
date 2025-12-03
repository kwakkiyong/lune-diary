/**
 * 감정 관련 유틸리티 함수들
 */

/**
 * 시간대에 따른 인사말 반환
 */
export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 6) return '새벽이네요 🌙'
  if (hour < 12) return '아침이에요 ☀️'
  if (hour < 18) return '오후에요 🌤️'
  if (hour < 22) return '저녁이에요 🌆'
  return '밤이에요 🌙'
}

/**
 * AI 감정 레이블을 표시용으로 변환
 * 예: '행복' → '행복한', '불안' → '불안한'
 */
export function getDisplayMood(mood: string | null): string {
  if (!mood) return '평범한'
  
  const moodMap: Record<string, string> = {
    '행복': '행복한',
    '기쁨': '기쁜',
    '슬픔': '슬픈',
    '우울': '우울한',
    '불안': '불안한',
    '분노': '화나는',
    '평온': '평범한',
    '피곤': '피곤한',
  }
  
  return moodMap[mood] || '평범한'
}

/**
 * 인사말과 감정을 결합하여 반환
 */
export function getGreetingWithMood(mood: string | null): { mood: string; rest: string } {
  const timeGreeting = getGreeting()
  const displayMood = getDisplayMood(mood)
  
  return {
    mood: displayMood,
    rest: timeGreeting,
  }
}

