export default function useDeviceType() {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
  return getDeviceType(userAgent)
}

function getDeviceType(userAgent) {
  const isAndroid = () => Boolean(userAgent.match(/Android/i))
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
  const isWindowsMobile = () => Boolean(userAgent.match(/IEMobile/i))
  const isSSR = () => Boolean(userAgent.match(/SSR/i))

  const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindowsMobile())
  const isDesktop = () => Boolean(!isMobile() && !isSSR())
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  }
}
