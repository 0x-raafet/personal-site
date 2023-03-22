export const EnvVars = {
  URL: 'https://bstefanski.com/',
  FACEBOOK_PROFILE: 'https://www.facebook.com/bmstefanski',
  TWITTER_PROFILE: '"@bmstefanski"',
  REDIS_HOST: process.env.REDIS_HOST,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  STEAM_KEY: process.env.STEAM_KEY,
  GA_VIEW_ID: process.env.GA_VIEW_ID,
  GOOGLE_PRIVATE_KEY_PASS: process.env.GOOGLE_PRIVATE_KEY_PASS,
  FOREM_API_KEY: process.env.FOREM_API_KEY,
  isProduction: process.env.NODE_ENV === 'production',
}
