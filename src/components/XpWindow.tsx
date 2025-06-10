// src/components/XpWindow.tsx
import Draggable from 'react-draggable'


type Props = {
  title: string
  position: { x: number; y: number }
  onDrag: (pos: { x: number; y: number }) => void
  onClose: () => void
  onMinimize?: () => void
  children: React.ReactNode
}

const XpWindow: React.FC<Props> = ({
  title,
  position,
  onDrag,
  onClose,
  onMinimize,
  children,
}) => {
  return (
    <Draggable
      handle=".title-bar"
      position={position}
      onStop={(e, data) => {
        onDrag({ x: data.x, y: data.y })
      }}
    >
    
      <div className="window" style={{ width: 300, position: 'absolute' }}>
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            {onMinimize && <button aria-label="Minimize" onClick={onMinimize}></button>}
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body">{children}</div>
      </div>
    </Draggable>
  )
}

export default XpWindow
