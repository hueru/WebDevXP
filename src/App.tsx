// src/App.tsx
import { useState } from 'react'
import XpWindow from './components/XpWindow.tsx'
import './App.css'
import 'xp.css/dist/XP.css'

function App() {
  const [isMemoOpen, setIsMemoOpen] = useState(false)
  const [isMemoMinimized, setIsMemoMinimized] = useState(false)
  const [memoPosition, setMemoPosition] = useState({ x: 100, y: 100 })


  return (
    <div className="App">
      <h1>HELLO WORLD</h1>

      <button onClick={() => {
        setIsMemoOpen(true)
        setIsMemoMinimized(false)
      }}>
        📄 メモ帳を開く
      </button>

      {/* ウィンドウ本体 */}
      {isMemoOpen && !isMemoMinimized && (
        <XpWindow
          title="メモ帳"
          onClose={() => setIsMemoOpen(false)}
          onMinimize={() => setIsMemoMinimized(true)}
          position={memoPosition}
          onDrag={(pos) => setMemoPosition(pos)}
        >
          <p>ここにメモを書くよ！</p>
        </XpWindow>
      )}

      {/* タスクバー */}
      <div className="taskbar">
        {isMemoOpen && (
          <button onClick={() => setIsMemoMinimized(false)}>📝 メモ帳</button>
        )}
      </div>
    </div>
  )
}

export default App
