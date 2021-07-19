import { useClipboard as originalUseClipboard } from 'use-clipboard-copy'

export function useClipboard(...args) {
  return originalUseClipboard(...args)
}
