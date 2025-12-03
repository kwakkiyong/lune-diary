import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Date 객체를 로컬 시간대 기준 YYYY-MM-DD 형식 문자열로 변환
 * toISOString()은 UTC 기준이므로 시간대 차이로 날짜가 하루 차이날 수 있음
 */
export function formatLocalDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
