// src/types/index.ts
export interface WindowState {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  position: { x: number; y: number }
  content: React.ReactNode
  icon?: string
}

export interface Position {
  x: number
  y: number
}