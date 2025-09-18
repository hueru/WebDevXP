// src/config/desktop.ts
export const DESKTOP_CONFIG = {
  // ウィンドウの設定
  window: {
    defaultWidth: 300,
    defaultHeight: 200,
    minWidth: 200,
    minHeight: 150,
    maxWidth: 800,
    maxHeight: 600,
    offsetStep: 50 // 新しいウィンドウの位置オフセット
  },
  
  // タスクバーの設定
  taskbar: {
    height: 40,
    position: 'bottom' as const
  },
  
  // デスクトップの設定
  desktop: {
    iconSpacing: 10,
    iconSize: 48,
    backgroundColor: '#008080'
  }
} as const