// src/utils/keyboardUtils.ts
/**
 * キーボードショートカット処理
 */
export const handleKeyboardShortcuts = (
  event: KeyboardEvent,
  actions: {
    onOpenMemo?: () => void
    onOpenGallery?: () => void
    onOpenCalculator?: () => void
    onCloseAll?: () => void
  }
): boolean => {
  const { ctrlKey, altKey, key } = event
  
  // Alt + 数字でアプリケーション起動
  if (altKey && !ctrlKey) {
    switch (key) {
      case '1':
        actions.onOpenMemo?.()
        return true
      case '2':
        actions.onOpenGallery?.()
        return true
      case '3':
        actions.onOpenCalculator?.()
        return true
    }
  }
  
  // Ctrl + Alt + Q で全て閉じる
  if (ctrlKey && altKey && key === 'q') {
    actions.onCloseAll?.()
    return true
  }
  
  return false
}