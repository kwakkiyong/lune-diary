import { useEffect } from 'react'

/**
 * 모달이 열릴 때 body 스크롤을 막고, 닫힐 때 복원하는 커스텀 훅
 * @param isOpen 모달이 열려있는지 여부
 */
export function useModalScrollLock(isOpen: boolean) {
    useEffect(() => {
        if (isOpen) {
            // 현재 스크롤 위치 저장
            const scrollY = window.scrollY
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = '100%'
            document.body.style.overflow = 'hidden'

            return () => {
                // 모달이 닫힐 때 원래 스크롤 위치로 복원
                document.body.style.position = ''
                document.body.style.top = ''
                document.body.style.width = ''
                document.body.style.overflow = ''
                window.scrollTo(0, scrollY)
            }
        }
    }, [isOpen])
}


