import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play } from 'lucide-react'
import type { YouTubeVideo } from '@/types'
import { useMusicStore } from '@/stores/useMusicStore'

interface MusicRecommendationCardProps {
  videos: YouTubeVideo[]
}

export function MusicRecommendationCard({ videos }: MusicRecommendationCardProps) {
  const { setCurrentVideo, setPlaylist } = useMusicStore()

  if (videos.length === 0) return null

  return (
    <Card className="backdrop-blur-sm bg-card/80">
      <CardHeader>
        <CardTitle>추천 음악</CardTitle>
        <CardDescription>감정에 맞는 음악을 추천해드립니다. 클릭하여 재생하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => {
                setCurrentVideo(video)
                setPlaylist(videos)
              }}
              className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border hover:bg-accent transition-colors text-left w-full group"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-20 h-14 sm:w-24 sm:h-16 object-cover rounded"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base line-clamp-2">{video.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{video.channelTitle}</p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


