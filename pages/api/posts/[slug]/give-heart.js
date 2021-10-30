const Redis = require('ioredis')
const { EnvVars } = require('env')

let client = new Redis(EnvVars.REDIS_HOST)

export default async function GiveReactionEndpoint(req, res) {
  const { slug } = req.query

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { count } = JSON.parse(req.body)
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  if (!slug || !userIp || !count) {
    return res.status(400).send({ message: 'Slug & userIp & count is required' })
  }

  if (count > 5) {
    return res.status(400).send({ message: 'Cant give more than 5 reactions per user' })
  }

  const clientEntry = JSON.parse((await client.get(userIp)) || '{}')
  const hasAlreadyVoted = clientEntry[slug]

  if (!hasAlreadyVoted) {
    const { heartReactions = 0 } = JSON.parse((await client.get(slug)) || '{}')

    await client.set(
      slug,
      JSON.stringify({
        heartReactions: heartReactions + count,
      }),
    )

    await client.set(
      userIp,
      JSON.stringify({
        [slug]: {
          heartReactions: heartReactions + count,
        },
      }),
    )
  }

  return res.status(200).end()
}
