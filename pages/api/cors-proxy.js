const ALLOWED_HOSTNAMES = ['connect.facebook.net', 'www.googletagmanager.com', 'www.google-analytics.com']

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url

  if (!ALLOWED_HOSTNAMES.includes(new URL(url).hostname)) {
    return res.status(403).end()
  }

  res.setHeader('content-type', req.headers['content-type'] || 'application/javascript')

  try {
    const response = await fetch(url)
    return res.status(200).send(response.body)
  } catch (error) {
    res.status(400).send(JSON.stringify(error))
  }
}
