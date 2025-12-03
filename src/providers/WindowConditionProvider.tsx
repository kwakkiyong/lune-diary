import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface WindowConditionContextType {
  windowWidth: number
  windowHeight: number
  isOnline: boolean
  isVisible: boolean
}

const WindowConditionContext = createContext<WindowConditionContextType | undefined>(undefined)

export function WindowConditionProvider({ children }: { children: ReactNode }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isVisible, setIsVisible] = useState(!document.hidden)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    const handleVisibilityChange = () => setIsVisible(!document.hidden)

    window.addEventListener('resize', handleResize)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <WindowConditionContext.Provider value={{ windowWidth, windowHeight, isOnline, isVisible }}>
      {children}
    </WindowConditionContext.Provider>
  )
}

export function useWindowCondition() {
  const context = useContext(WindowConditionContext)
  if (context === undefined) {
    throw new Error('useWindowCondition must be used within a WindowConditionProvider')
  }
  return context
}

