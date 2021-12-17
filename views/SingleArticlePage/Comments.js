// solution by https://github.com/jmau111
// source https://github.com/utterance/utterances/issues/161#issue-443109697

import { useEffect } from 'react'
import { useThemeContext } from 'contexts/theme.context'

export default function Comments() {
  const { theme } = useThemeContext()
  const widgetTheme = theme === 'light' ? 'github-light' : 'github-dark'

  useEffect(() => {
    if (theme) {
      let script = document.createElement('script')
      let anchor = document.getElementById('inject-comments-for-uterances')

      script.setAttribute('src', 'https://utteranc.es/client.js')
      script.setAttribute('crossorigin', 'anonymous')
      script.setAttribute('defer', true)
      script.setAttribute('repo', 'bmstefanski/personal-site')
      script.setAttribute('issue-term', 'pathname')
      script.setAttribute('theme', widgetTheme)
      anchor.appendChild(script)
    }
  }, [theme, widgetTheme])

  return <div id="inject-comments-for-uterances" key={widgetTheme} style={{ width: '100%' }}></div>
}
