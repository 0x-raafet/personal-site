import { subMonths } from 'date-fns'
import { EnvVars } from 'env'

export default async function GithubReactions(req, res) {
  try {
    new Date().setUTCMonth()
    const from = subMonths(new Date(), 1).toISOString()
    const to = new Date().toISOString()
    const {
      data: {
        user: {
          contributionsCollection: {
            contributionCalendar: { totalContributions },
          },
          pinnedItems: { edges: pinnedItems },
        },
      },
    } = await getContributions(EnvVars.GITHUB_TOKEN, 'bmstefanski', from, to)

    res.setHeader('Cache-Control', `s-maxage=3600, stale-while-revalidate`)
    res.send({ monthlyContributions: totalContributions, pinnedItems: transformPinnedItems(pinnedItems).slice(0, 3) })
  } catch (error) {
    console.error(error)
    return res.send(error)
  }
}

function transformPinnedItems(pinnedItems) {
  return pinnedItems.map((singleItem) => singleItem.node)
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
        pinnedItems(last: 6) {
          totalCount
          edges {
            node {
              ... on Repository {
                id
                name
                descriptionHTML
                owner {
                  login
                  url
                }
                url
                stargazers {
                  totalCount
                }
                primaryLanguage {
                  id
                  color
                  name
                }
              }
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
