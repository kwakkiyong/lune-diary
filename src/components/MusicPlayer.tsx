import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { YouTubeVideo } from '@/types'

interface MusicPlayerProps {
  video: YouTubeVideo | null
  isOpen: boolean
  onClose: () => void
}

export function MusicPlayer({ video, isOpen, onClose }: MusicPlayerProps) {
  if (!video) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription>{video.channelTitle}</DialogDescription>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

