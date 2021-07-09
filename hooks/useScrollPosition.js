import { useScrollPosition as originalUseScrollPosition } from '@n8tb1t/use-scroll-position'

export function useScrollPosition(effect, deps, element, useWindow, wait, boundingElement) {
  return originalUseScrollPosition(effect, deps, element, useWindow, wait, boundingElement)
}
