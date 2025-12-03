import axios from 'axios'
import type { EmotionAnalysis } from '@/types'

export async function analyzeEmotion(
  entryText: string,
  promptTemplate: string,
  apiKey: string
): Promise<EmotionAnalysis> {
  if (!apiKey) {
    throw new Error('OpenAI API 키가 설정되지 않았습니다.')
  }

  const prompt = promptTemplate.replace('{text}', entryText)

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              '당신은 감정 분석 전문가입니다. 사용자의 일기 내용을 분석하여 감정을 파악하고, 요청된 JSON 형식으로만 응답해주세요.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )

    const content = response.data.choices[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI 응답이 비어있습니다.')
    }

    const parsed = JSON.parse(content)

    // 응답 검증 및 기본값 설정
    const analysis: EmotionAnalysis = {
      emotionLabel: parsed.emotionLabel || '평온',
      emotionScore: Math.max(0, Math.min(100, Number(parsed.emotionScore) || 50)),
      summary: parsed.summary || '감정 분석 결과가 없습니다.',
      keywords: Array.isArray(parsed.keywords)
        ? parsed.keywords.slice(0, 3)
        : ['분석', '일기', '감정'],
    }

    return analysis
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('OpenAI API 키가 유효하지 않습니다.')
      }
      if (error.response?.status === 429) {
        throw new Error('API 사용량 한도를 초과했습니다. 잠시 후 다시 시도해주세요.')
      }
      throw new Error(`OpenAI API 오류: ${error.message}`)
    }
    throw error
  }
}

