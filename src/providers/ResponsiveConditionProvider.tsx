import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface ResponsiveConditionContextType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

const ResponsiveConditionContext = createContext<ResponsiveConditionContextType | undefined>(undefined)

export function ResponsiveConditionProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsDesktop(width >= 1024)
    }

    checkResponsive()
    window.addEventListener('resize', checkResponsive)
    return () => window.removeEventListener('resize', checkResponsive)
  }, [])

  return (
    <ResponsiveConditionContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </ResponsiveConditionContext.Provider>
  )
}

export function useResponsiveCondition() {
  const context = useContext(ResponsiveConditionContext)
  if (context === undefined) {
    throw new Error('useResponsiveCondition must be used within a ResponsiveConditionProvider')
  }
  return context
}

