import { subMonths } from 'date-fns'
import _fetch from 'isomorphic-fetch'
import floor from 'lodash/floor'
import { EnvVars } from 'env'

export default async function LatestGames(req, res) {
  const apiRoot = 'http://api.steampowered.com'
  const steamProfileId = '76561198329610483'
  const result = await _fetch(
    apiRoot + `/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${EnvVars.STEAM_KEY}&steamid=${steamProfileId}&format=json`,
  )
    .then((res) => res.json())
    .then((data) => data.response.games.map(transformResponse))

  res.setHeader('Cache-Control', `s-maxage=3600, stale-while-revalidate`)

  return res.send(result)
}

function transformResponse(payload) {
  return {
    name: payload.name,
    playtimeLastTwoWeeks: convertSecondsToHours(payload.playtime_2weeks),
    playtimeForever: convertSecondsToHours(payload.playtime_forever),
    iconUrl: makeSteamAssetUrl(payload.appid, payload.img_icon_url),
    logoUrl: makeSteamAssetUrl(payload.appid, payload.img_logo_url),
  }
}

function makeSteamAssetUrl(appId, assetId) {
  return `https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/${appId}/${assetId}.jpg`
}

function convertSecondsToHours(seconds) {
  return floor(seconds / 60, 2)
}
