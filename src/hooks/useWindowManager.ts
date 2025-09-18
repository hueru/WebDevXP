import { useState, useCallback } from 'react'
import type { WindowState, Position } from '../types'

export const useWindowManager = (initialWindows: WindowState[]) => {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows)

  const openWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window =>
      window.id === id // === を使用（厳密等価）
        ? { ...window, isOpen: true, isMinimized: false }
        : window
    ))
  }, [])

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window =>
      window.id === id
        ? { ...window, isOpen: false }
        : window
    ))
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window =>
      window.id === id
        ? { ...window, isMinimized: true }
        : window
    ))
  }, [])

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window =>
      window.id === id
        ? { ...window, isMinimized: false }
        : window
    ))
  }, [])

  const updateWindowPosition = useCallback((id: string, position: Position) => {
    setWindows(prev => prev.map(window =>
      window.id === id
        ? { ...window, position }
        : window
    ))
  }, [])

  const getOpenWindows = useCallback(() => 
    windows.filter(window => window.isOpen), [windows])

  const getVisibleWindows = useCallback(() => 
    windows.filter(window => window.isOpen && !window.isMinimized), [windows])

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    updateWindowPosition,
    getOpenWindows,
    getVisibleWindows
  }
}