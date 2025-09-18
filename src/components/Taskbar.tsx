// src/components/Taskbar.tsx
import React from 'react'
import type { WindowState } from '../types'

interface TaskbarProps {
  openWindows: WindowState[]
  onRestoreWindow: (id: string) => void
}

export function Taskbar({ openWindows, onRestoreWindow }: TaskbarProps) {
  return (
    <div className="taskbar">
      {openWindows.map(window => (
        <button
          key={window.id}
          onClick={() => onRestoreWindow(window.id)}
          className={`taskbar-button ${window.isMinimized ? 'minimized' : ''}`}
          aria-label={`${window.title}を復元`}
        >
          {window.icon} {window.title}
        </button>
      ))}
    </div>
  )
}