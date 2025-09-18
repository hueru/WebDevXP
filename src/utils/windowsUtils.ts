// src/utils/windowUtils.ts
import type { Position } from '../types'
import { DESKTOP_CONFIG } from '../config/desktop'

/**
 * ウィンドウ位置を画面内に制限する
 */
export const constrainPosition = (
  position: Position,
  windowWidth: number = DESKTOP_CONFIG.window.defaultWidth,
  windowHeight: number = DESKTOP_CONFIG.window.defaultHeight
): Position => {
  const maxX = Math.max(0, window.innerWidth - windowWidth)
  const maxY = Math.max(0, window.innerHeight - DESKTOP_CONFIG.taskbar.height - windowHeight)
  
  return {
    x: Math.max(0, Math.min(position.x, maxX)),
    y: Math.max(0, Math.min(position.y, maxY))
  }
}

/**
 * 重複を避けた新しいウィンドウ位置を生成
 */
export const generateNewWindowPosition = (
  existingPositions: Position[],
  basePosition: Position = { x: 100, y: 100 }
): Position => {
  let newPosition = { ...basePosition }
  let attempts = 0
  const maxAttempts = 10
  
  while (attempts < maxAttempts) {
    const hasCollision = existingPositions.some(pos => 
      Math.abs(pos.x - newPosition.x) < DESKTOP_CONFIG.window.offsetStep &&
      Math.abs(pos.y - newPosition.y) < DESKTOP_CONFIG.window.offsetStep
    )
    
    if (!hasCollision) {
      break
    }
    
    newPosition = {
      x: basePosition.x + (attempts + 1) * DESKTOP_CONFIG.window.offsetStep,
      y: basePosition.y + (attempts + 1) * DESKTOP_CONFIG.window.offsetStep
    }
    attempts++
  }
  
  return constrainPosition(newPosition)
}

/**
 * ローカルストレージからウィンドウ状態を読み込み
 */
export const loadWindowState = (windowId: string): Position | null => {
  try {
    const saved = localStorage.getItem(`window-${windowId}`)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

/**
 * ローカルストレージにウィンドウ状態を保存
 */
export const saveWindowState = (windowId: string, position: Position): void => {
  try {
    localStorage.setItem(`window-${windowId}`, JSON.stringify(position))
  } catch {
    // ストレージエラーは無視
  }
}