import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { YouTubeVideo } from '@/types'

interface MusicState {
  currentVideo: YouTubeVideo | null
  playlist: YouTubeVideo[]
  volume: number
  isMuted: boolean
  setCurrentVideo: (video: YouTubeVideo | null) => void
  setPlaylist: (videos: YouTubeVideo[]) => void
  setVolume: (volume: number) => void
  setIsMuted: (isMuted: boolean) => void
  playNext: () => void
  playPrevious: () => void
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      currentVideo: null,
      playlist: [],
      volume: 100,
      isMuted: false,
      setCurrentVideo: (video) => set({ currentVideo: video }),
      setPlaylist: (videos) => set({ playlist: videos }),
      setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
      setIsMuted: (isMuted) => set({ isMuted }),
      playNext: () => {
        const { currentVideo, playlist } = get()
        if (!currentVideo || playlist.length === 0) return
        
        const currentIndex = playlist.findIndex((v) => v.id === currentVideo.id)
        if (currentIndex < playlist.length - 1) {
          set({ currentVideo: playlist[currentIndex + 1] })
        }
      },
      playPrevious: () => {
        const { currentVideo, playlist } = get()
        if (!currentVideo || playlist.length === 0) return
        
        const currentIndex = playlist.findIndex((v) => v.id === currentVideo.id)
        if (currentIndex > 0) {
          set({ currentVideo: playlist[currentIndex - 1] })
        }
      },
    }),
    {
      name: 'lune-diary-music',
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
        // currentVideo와 playlist는 저장하지 않음 (세션별로 다를 수 있음)
      }),
    }
  )
)

