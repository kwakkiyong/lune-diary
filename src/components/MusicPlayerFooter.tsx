import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMusicStore } from '@/stores/useMusicStore'

export function MusicPlayerFooter() {
  const { currentVideo, playlist, playNext, playPrevious, volume, isMuted, setVolume } = useMusicStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const playerAPIRef = useRef<any>(null)

  useEffect(() => {
    if (!currentVideo) return

    // YouTube IFrame API 로드
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        if (playerAPIRef.current) {
          playerAPIRef.current.destroy()
        }

        playerAPIRef.current = new window.YT.Player('youtube-player', {
          videoId: currentVideo.videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            loop: 0,
          },
          events: {
            onReady: (event: any) => {
              // 저장된 볼륨 설정 적용
              const { volume: savedVolume } = useMusicStore.getState()
              event.target.setVolume(savedVolume)
              event.target.playVideo()
              setIsPlaying(true)
              setDuration(event.target.getDuration())
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true)
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false)
              } else if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false)
                playNext()
              }
            },
          },
        })
      }
    }

    if (window.YT && window.YT.Player) {
      initializePlayer()
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer
    }

    return () => {
      if (playerAPIRef.current) {
        try {
          playerAPIRef.current.destroy()
        } catch (e) {
          console.error('Player cleanup error:', e)
        }
      }
    }
  }, [currentVideo, playNext])

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerAPIRef.current && isPlaying) {
        try {
          const time = playerAPIRef.current.getCurrentTime()
          setCurrentTime(time)
        } catch (e) {
          // Player not ready
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    if (playerAPIRef.current && currentVideo) {
      try {
        playerAPIRef.current.setVolume(volume)
      } catch (e) {
        // Player not ready
      }
    }
  }, [volume, currentVideo])

  const togglePlayPause = () => {
    if (playerAPIRef.current) {
      try {
        if (isPlaying) {
          playerAPIRef.current.pauseVideo()
        } else {
          playerAPIRef.current.playVideo()
        }
      } catch (e) {
        console.error('Play/Pause error:', e)
      }
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (playerAPIRef.current) {
      try {
        playerAPIRef.current.setVolume(newVolume)
      } catch (e) {
        // Player not ready
      }
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      const newVolume = volume > 0 ? volume : 50
      setVolume(newVolume)
      if (playerAPIRef.current) {
        try {
          playerAPIRef.current.setVolume(newVolume)
        } catch (e) {
          // Player not ready
        }
      }
    } else {
      setVolume(0)
      if (playerAPIRef.current) {
        try {
          playerAPIRef.current.setVolume(0)
        } catch (e) {
          // Player not ready
        }
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentIndex = currentVideo ? playlist.findIndex((v) => v.id === currentVideo.id) : -1
  const hasNext = currentIndex >= 0 && currentIndex < playlist.length - 1
  const hasPrevious = currentIndex > 0

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
      {/* 숨겨진 YouTube 플레이어 */}
      <div className="hidden">
        <div id="youtube-player" />
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        {/* 모바일 레이아웃 */}
        <div className="md:hidden space-y-3">
          {/* 썸네일 및 정보 */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {currentVideo ? (
              <>
                <img
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  className="w-12 h-12 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{currentVideo.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{currentVideo.channelTitle}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                  <Music className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-muted-foreground">재생 중인 음악이 없습니다</p>
                  <p className="text-xs text-muted-foreground">음악을 선택하여 재생하세요</p>
                </div>
              </>
            )}
          </div>

          {/* 재생 컨트롤 및 진행 바 */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={playPrevious}
              disabled={!hasPrevious || !currentVideo}
              className="h-9 w-9"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={togglePlayPause}
              disabled={!currentVideo}
              className="h-10 w-10"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={playNext}
              disabled={!hasNext || !currentVideo}
              className="h-9 w-9"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {currentVideo ? formatTime(currentTime) : '0:00'}
              </span>
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {currentVideo ? formatTime(duration) : '0:00'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 데스크톱 레이아웃 */}
        <div className="hidden md:flex items-center gap-4">
          {/* 썸네일 및 정보 */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {currentVideo ? (
              <>
                <img
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  className="w-14 h-14 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{currentVideo.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{currentVideo.channelTitle}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-muted rounded flex items-center justify-center">
                  <Music className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-muted-foreground">재생 중인 음악이 없습니다</p>
                  <p className="text-sm text-muted-foreground">음악을 선택하여 재생하세요</p>
                </div>
              </>
            )}
          </div>

          {/* 재생 컨트롤 */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={playPrevious}
              disabled={!hasPrevious || !currentVideo}
              className="h-10 w-10"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={togglePlayPause}
              disabled={!currentVideo}
              className="h-12 w-12"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={playNext}
              disabled={!hasNext || !currentVideo}
              className="h-10 w-10"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* 진행 바 및 시간 */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {currentVideo ? formatTime(currentTime) : '0:00'}
            </span>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {currentVideo ? formatTime(duration) : '0:00'}
            </span>
          </div>

          {/* 볼륨 컨트롤 */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// YouTube IFrame API 타입 정의
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

