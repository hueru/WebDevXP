// src/components/XpWindow.tsx
import React, { useCallback, useMemo } from 'react'
import Draggable from 'react-draggable'
import type { DraggableEvent, DraggableData } from 'react-draggable'
import type { Position } from '../types'

interface XpWindowProps {
  title: string
  position: Position
  onDrag: (pos: Position) => void
  onClose: () => void
  onMinimize?: () => void
  children: React.ReactNode
  width?: number
  height?: number
  resizable?: boolean
}

const XpWindow: React.FC<XpWindowProps> = ({
  title,
  position,
  onDrag,
  onClose,
  onMinimize,
  children,
  width = 300,
  height = 'auto',
  resizable = false
}) => {
  // ドラッグ終了時のハンドラー
  const handleStop = useCallback((e: DraggableEvent, data: DraggableData): void => {
    // 画面境界内に制限
    const boundedX = Math.max(0, Math.min(data.x, window.innerWidth - width))
    const boundedY = Math.max(0, Math.min(data.y, window.innerHeight - 100)) // タスクバー分を考慮
    
    onDrag({ x: boundedX, y: boundedY })
  }, [onDrag, width])

  // 最小化ハンドラー
  const handleMinimize = useCallback((): void => {
    onMinimize?.()
  }, [onMinimize])

  // 閉じるハンドラー
  const handleClose = useCallback((): void => {
    onClose()
  }, [onClose])

  // ESCキーで閉じる機能
  const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  // ウィンドウスタイル
  const windowStyle = useMemo(() => ({
    width,
    height,
    position: 'absolute' as const,
    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
    zIndex: 100
  }), [width, height])

  return (
    <Draggable
      handle=".title-bar"
      position={position}
      onStop={handleStop}
      bounds="parent" // 親要素内に制限
      cancel=".title-bar-controls" // コントロールボタンはドラッグ無効
    >
      <div 
        className="window" 
        style={windowStyle}
        onKeyDown={handleKeyDown}
        tabIndex={0} // キーボード操作を可能に
        role="dialog"
        aria-labelledby={`window-title-${title}`}
      >
        <div className="title-bar">
          <div 
            className="title-bar-text"
            id={`window-title-${title}`}
          >
            {title}
          </div>
          <div className="title-bar-controls">
            {onMinimize && (
              <button 
                aria-label={`${title}を最小化`}
                onClick={handleMinimize}
                type="button"
              />
            )}
            <button 
              aria-label={`${title}を閉じる`}
              onClick={handleClose}
              type="button"
            />
          </div>
        </div>
        <div className="window-body">
          {children}
        </div>
        {resizable && (
          <div className="window-resize-handle" />
        )}
      </div>
    </Draggable>
  )
}

export default XpWindow