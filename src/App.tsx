// src/App.tsx
import { useState } from 'react'
import XpWindow from './components/XpWindow.tsx'
import './App.css'
import 'xp.css/dist/XP.css'


interface WindosState{
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  position: {x: number; y:number}
  content: React.ReactNode
}

function App() {
  const [windows, setWindows] = useState<WindosState[]>([
   { 
    id: 'memo',
    title: 'メモ帳',
    isOpen: false,
    isMinimized: false,
    position: {x: 100,y: 100},
    content: <p>ここにメモを書くよ！</p>
   },
   { 
    id: 'gallery',
    title: '画像ビューア',
    isOpen: false,
    isMinimized: false,
    position: {x: 100,y: 100},
    content: <p>画像をはる</p>
   },
   { 
    id: 'calculator',
    title: '電卓',
    isOpen: false,
    isMinimized: false,
    position: {x: 100,y: 100},
    content: <p>計算機能</p>
   },
  ])

  const openWindow = (id: string) => {
    setWindows(prev => prev.map(window =>
      window.id == id
        ? { ...window, isOpen: true, isMinimized: false}
        : window
    ))
  }

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(window =>
      window.id == id
        ? { ...window, isOpen: false}
        : window
    ))
  }

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(window =>
      window.id == id
        ? { ...window, isMinimized: true}
        : window
    ))
  }

  const restoreWindow = (id: string) => {
    setWindows(prev => prev.map(window =>
      window.id == id
        ? { ...window, isMinimized: false}
        : window
    ))
  }

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(window => 
      window.id === id 
        ? { ...window, position }
        : window
    ))
  }
  

  return (
    <div className="App">
      <h1>test HELLO VirtualWORLD</h1>

      {/*   アプリケーション起動ボタン */}
      <div className="desktop-icons" style={{marginBottom: '20px'}}>
        <button onClick={() => openWindow('memo')} className="desktop-button">
          メモ帳を開く
        </button>

        <button onClick={() => openWindow('gallery')} className="desktop-button">
          画像を開く
        </button>
        <button onClick={() => openWindow('calculator')} className="desktop-button">
          電卓を開く
        </button>
      </div>

      {/* 全てのウィンドウをレンダリング */}
      {windows.map(window => (
        window.isOpen && !window.isMinimized && (
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
        )
      ))} 
      
      {/* タスクバー */}
      <div className="taskbar" style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '40px',
        backgroundColor: '#c0c0c0',
        borderTop: '2px solid #808080',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px'
      }}>
        {windows
          .filter(window => window.isOpen)
          .map(window => (
            <button 
              key={window.id}
              onClick={() => restoreWindow(window.id)}
              style={{
                marginRight: '5px',
                backgroundColor: window.isMinimized ? '#808080' : '#c0c0c0'
              }}
            >
              {window.title}
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default App
