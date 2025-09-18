// src/App.tsx（メインコンポーネント）
import React from 'react'
import XpWindow from './components/XpWindow'
import { DesktopIcons } from './components/DesktopIcons'
import { Taskbar } from './components/Taskbar'
import { useWindowManager } from './hooks/useWindowManager'
import { INITIAL_WINDOWS } from './constants/windows'
import './App.css'
import 'xp.css/dist/XP.css'

function App() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    updateWindowPosition,
    getOpenWindows,
    getVisibleWindows
  } = useWindowManager(INITIAL_WINDOWS)

  return (
    <div className="App">
      <header className="desktop-header">
        <h1>Virtual Desktop Environment</h1>
      </header>

      <DesktopIcons 
        windows={windows}
        onOpenWindow={openWindow}
      />

      {getVisibleWindows().map(window => (
        <XpWindow
          key={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          position={window.position}
          onDrag={(pos) => updateWindowPosition(window.id, pos)}
        >
          {window.content}
        </XpWindow>
      ))}

      <Taskbar
        openWindows={getOpenWindows()}
        onRestoreWindow={restoreWindow}
      />
    </div>
  )
}

export default App
