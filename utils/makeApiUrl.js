import { EnvVars } from 'env'

export function makeApiUrl(endpoint) {
  if (EnvVars.isProduction) {
    return EnvVars.URL + endpoint
  }

  return 'http://localhost:3000' + endpoint
}
