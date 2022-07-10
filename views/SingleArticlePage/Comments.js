// solution by https://github.com/jmau111
// source https://github.com/utterance/utterances/issues/161#issue-443109697

import { useEffect } from 'react'

export default function Comments() {
  useEffect(() => {
    let script = document.createElement('script')
    let anchor = document.getElementById('inject-comments-for-uterances')

    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('defer', true)
    script.setAttribute('repo', 'bmstefanski/personal-site')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'github-dark')
    script.setAttribute('loading', 'lazy')
    anchor.appendChild(script)
  }, [])

  return <div id="inject-comments-for-uterances" style={{ width: '100%' }}></div>
}
