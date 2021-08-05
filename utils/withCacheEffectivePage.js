import redirectToQuerylessUrl from 'utils/redirectToQuerylessUrl'

export default function withCacheEffectivePage(handler) {
  return ({ res, req, query, options = { secondsBeforeRevalidation: 60 * 30 } }) => {
    const hasForbiddenQueryParams = Object.keys(query).length > 0
    if (hasForbiddenQueryParams) {
      return redirectToQuerylessUrl(req)
    }

    res.setHeader('Cache-Control', `s-maxage=${options.secondsBeforeRevalidation}, stale-while-revalidate`)
    res.setHeader('Content-Disposition', 'inline')
    res.setHeader('Content-Type', 'text/xml')

    return handler({ req, res, query }).then(() => ({ props: {} }))
  }
}
