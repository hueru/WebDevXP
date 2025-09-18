// src/components/XpWindow.tsx
import Draggable from 'react-draggable'
import React from 'react'


type Props = {
  title: string
  position: { x: number; y: number }
  onDrag: (pos: { x: number; y: number }) => void
  onClose: () => void
  onMinimize?: () => void
  children: React.ReactNode
}

function XpWindow(props: Props): React.ReactElement{
  const { title, position, onDrag, onClose, onMinimize, children } = props

  function handleStop(e:any, data:any): void{
    onDrag({x: data.x,y: data.y})
  }

  function handleMinimize(): void{
    if (onMinimize){
      onMinimize()
    }
  }

  function handleClose(): void{
    onClose()
  }

  return (
    <Draggable
      handle=".title-bar"
      position={position}
      onStop={handleStop}  
    >
    
      <div className="window" style={{ width: 300, position: 'absolute' }}>
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            {onMinimize && <button aria-label="Minimize" onClick={handleMinimize}></button>}
            <button aria-label="Close" onClick={handleClose}></button>
          </div>
        </div>
        <div className="window-body">{children}</div>
      </div>
    </Draggable>
  )
}

export default XpWindow
