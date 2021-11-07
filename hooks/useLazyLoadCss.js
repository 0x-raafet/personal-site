import { useEffect } from 'react'

export function useLazyLoadCss(fileName) {
  useEffect(() => {
    const extensionLessFileName = fileName.replace('.css', '')
    const prismThemeLinkEl = document.querySelector(`link[data-id="${extensionLessFileName}"]`)

    if (!prismThemeLinkEl) {
      const headEl = document.querySelector('head')
      const newEl = document.createElement('link')
      newEl.setAttribute('data-id', extensionLessFileName)
      newEl.setAttribute('rel', 'stylesheet')
      newEl.setAttribute('href', `/${fileName}`)
      newEl.setAttribute('media', 'print')
      newEl.setAttribute('onload', "this.media='all'; this.onload=null;")
      headEl.appendChild(newEl)
    }
  }, [fileName])

  const noJavaScriptMarkup = (
    <noscript>
      <link rel="stylesheet" href={`/${fileName}`} />
    </noscript>
  )

  return [noJavaScriptMarkup]
}
