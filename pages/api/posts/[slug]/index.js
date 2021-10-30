const Redis = require('ioredis')
const { EnvVars } = require('env')

let client = new Redis(EnvVars.REDIS_HOST)

export default async function PostEndpoint(req, res) {
  const { slug } = req.query

  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  if (!slug) {
    return res.status(400).send({ message: 'Slug is required' })
  }

  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const postEntry = JSON.parse((await client.get(slug)) || '{}')
  const clientEntry = JSON.parse((await client.get(userIp)) || '{}')

  const hasAlreadyVoted = !!clientEntry[slug]
  const isPostPresentInDb = Object.keys(postEntry).length

  const { heartReactions = 0 } = postEntry

  if (!isPostPresentInDb) {
    await client.set(
      slug,
      JSON.stringify({
        heartReactions,
      }),
    )
  }

  res.setHeader('Cache-Control', `s-maxage=600, stale-while-revalidate`)

  return res.status(200).send({
    heartReactions,
    hasAlreadyVoted,
  })
}
