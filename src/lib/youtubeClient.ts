import axios from 'axios'
import type {YouTubeVideo} from '@/types'

const EMOTION_SEARCH_QUERIES: Record<string, string[]> = {
    행복: ['행복할 때 듣는 음악', '기분 좋은 노래', '신나는 플레이리스트', 'happy music'],
    슬픔: ['슬플때 듣는 음악', '감성 발라드', '우울한 노래', 'sad music'],
    불안: ['불안할때 듣는 음악', '편안한 피아노', '평온한 노래', 'calm music'],
    분노: ['화가 났을때 듣는 음악', '파워풀한 노래', '에너지 넘치는 음악', 'intense music'],
    평온: ['평화로운 음악', '명상 음악', '차분한 인스트루멘탈', 'peaceful music'],
    피곤: ['편안한 음악', '잠잘 때 듣는 음악', '앰비언트 사운드', 'relaxing music'],
    기쁨: ['기쁜 음악', '밝은 노래', '신나는 플레이리스트', 'cheerful music'],
    우울: ['우울할 때 듣는 음악', '감성 발라드', '슬픈 노래', 'melancholic music'],
}

export async function getMusicByEmotion(
    emotionLabel: string,
    apiKey: string
): Promise<YouTubeVideo[]> {
    if (!apiKey) {
        throw new Error('YouTube API 키가 설정되지 않았습니다.')
    }

    const queries = EMOTION_SEARCH_QUERIES[emotionLabel] || ['calm music']
    const searchQuery = queries[0]

    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: searchQuery,
                type: 'video',
                maxResults: 6,
                key: apiKey,
            },
        })

        const videos: YouTubeVideo[] = response.data.items.map((item: any) => ({
            id: item.id.videoId,
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            channelTitle: item.snippet.channelTitle,
        }))

        return videos
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 403) {
                throw new Error('YouTube API 키가 유효하지 않거나 할당량을 초과했습니다.')
            }
            throw new Error(`YouTube API 오류: ${error.message}`)
        }
        throw error
    }
}

