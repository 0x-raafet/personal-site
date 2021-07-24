import { useCallback, useEffect } from 'react'

export default function useEscClose(onClose) {
  const handleUserKeyPress = useCallback(
    (event) => {
      const { keyCode } = event
      const escapeKeyCode = 27
      if (keyCode === escapeKeyCode) {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])
}
