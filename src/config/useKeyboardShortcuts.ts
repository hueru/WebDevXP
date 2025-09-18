// src/hooks/useKeyboardShortcuts.ts
import { useEffect } from 'react'
import { handleKeyboardShortcuts } from './keyboardUtils'

interface KeyboardActions {
  onOpenMemo?: () => void
  onOpenGallery?: () => void
  onOpenCalculator?: () => void
  onCloseAll?: () => void
}

export const useKeyboardShortcuts = (actions: KeyboardActions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handled = handleKeyboardShortcuts(event, actions)
      if (handled) {
        event.preventDefault()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [actions])
}