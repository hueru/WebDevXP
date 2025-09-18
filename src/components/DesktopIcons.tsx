import React from 'react'
import type { WindowState } from '../types'

interface DesktopIconsProps {
  windows: WindowState[]
  onOpenWindow: (id: string) => void
}

export function DesktopIcons({ windows, onOpenWindow }: DesktopIconsProps) {
  return (
    <div className="desktop-icons">
      {windows.map(window => (
        <button
          key={window.id}
          onClick={() => onOpenWindow(window.id)}
          className="desktop-button"
          aria-label={`${window.title}を開く`}
        >
          {window.icon} {window.title}
        </button>
      ))}
    </div>
  )
}