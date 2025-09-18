// src/constants/windows.ts
import type { WindowState } from '../types'

export const INITIAL_WINDOWS: WindowState[] = [
  {
    id: 'memo',
    title: 'メモ帳',
    isOpen: false,
    isMinimized: false,
    position: { x: 100, y: 100 },
    content: <MemoContent />,
    icon: '📄'
  },
  {
    id: 'gallery',
    title: '画像ビューア',
    isOpen: false,
    isMinimized: false,
    position: { x: 200, y: 150 }, // 重複を避ける
    content: <GalleryContent />,
    icon: '🖼️'
  },
  {
    id: 'calculator',
    title: '電卓',
    isOpen: false,
    isMinimized: false,
    position: { x: 300, y: 200 }, // 重複を避ける
    content: <CalculatorContent />,
    icon: '🧮'
  }
]

// コンテンツコンポーネント
function MemoContent() {
  return (
    <div style={{ padding: '10px' }}>
      <textarea 
        style={{ width: '100%', height: '150px', resize: 'none' }}
        placeholder="ここにメモを書いてください..."
      />
    </div>
  )
}

function GalleryContent() {
  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <p>画像ビューア</p>
      <div style={{ border: '2px dashed #ccc', padding: '20px' }}>
        画像をドロップしてください
      </div>
    </div>
  )
}

function CalculatorContent() {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        <button>7</button><button>8</button><button>9</button><button>÷</button>
        <button>4</button><button>5</button><button>6</button><button>×</button>
        <button>1</button><button>2</button><button>3</button><button>-</button>
        <button>0</button><button>.</button><button>=</button><button>+</button>
      </div>
    </div>
  )
}