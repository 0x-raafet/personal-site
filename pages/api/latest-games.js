import _fetch from 'isomorphic-fetch'
import floor from 'lodash/floor'
import { EnvVars } from 'env'

export default async function LatestGames(req, res) {
  let result = null
  try {
    const apiRoot = 'http://api.steampowered.com'
    const steamProfileId = '76561198329610483'
    result = await _fetch(
      apiRoot + `/IPlayerService/GetRecentlyPlayedGames/v1/?key=${EnvVars.STEAM_KEY}&steamid=${steamProfileId}&format=json`,
    )
      .then((res) => res.json())
      .then((data) => data.response.games.map(transformResponse))
  } catch (e) {
    console.error(e)
    result = []
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Cache-Control': `s-maxage=3600, stale-while-revalidate`,
    },
  })
}

function transformResponse(payload) {
  return {
    name: payload.name,
    steamLink: makeSteamAppLink(payload.appid),
    playtimeLastTwoWeeks: convertSecondsToHours(payload.playtime_2weeks),
    playtimeForever: convertSecondsToHours(payload.playtime_forever),
    iconUrl: makeSteamAssetUrl(payload.appid, payload.img_icon_url),
    logoUrl: makeSteamAssetUrl(payload.appid, payload.img_icon_url),
  }
}

function makeSteamAppLink(appId) {
  return `https://steamcommunity.com/app/${appId}`
}

function makeSteamAssetUrl(appId, assetId) {
  return `https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/${appId}/${assetId}.jpg`
}

function convertSecondsToHours(seconds) {
  return floor(seconds / 60, 2)
}

export const config = {
  runtime: 'experimental-edge',
}
