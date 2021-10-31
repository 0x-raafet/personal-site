import { subMonths } from 'date-fns'
import { EnvVars } from 'env'

export default async function GithubReactions(req, res) {
  new Date().setUTCMonth()
  const from = subMonths(new Date(), 1).toISOString()
  const to = new Date().toISOString()
  const {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: { totalContributions },
        },
      },
    },
  } = await getContributions(EnvVars.GITHUB_TOKEN, 'bmstefanski', from, to)
  res.setHeader('Cache-Control', `s-maxage=3600, stale-while-revalidate`)

  return res.send({ monthlyContributions: totalContributions })
}

async function getContributions(token, username, from, to) {
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const body = {
    query: `
    query {
      user(login: "${username}") {
        name
        contributionsCollection(from: "${from}", to: "${to}") {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
  }

  const response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })
  const data = await response.json()
  return data
}
