/**
 * 隱藏選單的共享狀態（TopHeader 切換 + HiddenMenu 顯示）
 */
export const useHiddenMenu = () => {
  const isOpen = useState<boolean>('hidden-menu-open', () => false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const close = () => {
    isOpen.value = false
  }

  return { isOpen, toggle, close }
}
