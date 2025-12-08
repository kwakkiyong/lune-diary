/**
 * 감정 라벨에 따른 색상 클래스 매핑
 */
export const emotionColors: Record<string, string> = {
    행복: 'bg-yellow-500/20 text-yellow-500',
    기쁨: 'bg-orange-500/20 text-orange-500',
    슬픔: 'bg-blue-500/20 text-blue-500',
    우울: 'bg-purple-500/20 text-purple-500',
    불안: 'bg-cyan-500/20 text-cyan-500',
    분노: 'bg-red-500/20 text-red-500',
    평온: 'bg-green-500/20 text-green-500',
    피곤: 'bg-gray-500/20 text-gray-500',
}

/**
 * 감정 점수에 따른 색상 클래스를 반환합니다.
 * @param score 감정 점수 (0-100)
 * @returns Tailwind CSS 색상 클래스
 */
export function getEmotionScoreColor(score: number): string {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    if (score >= 40) return 'text-orange-500'
    return 'text-red-500'
}


