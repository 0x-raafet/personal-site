/**
 * @type {import('next').NextConfig}
 */
const partytown = require('@builder.io/partytown/utils')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  externalHelpers: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    legacyBrowsers: false,
    outputFileTracing: true,
    browsersListForSwc: true,
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    domains: ['cdn.akamai.steamstatic.com'],
    deviceSizes: [320, 640, 1080, 1200],
    imageSizes: [64, 128],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.child_process = false
      config.resolve.fallback.worker_threads = false
      config.resolve.fallback.net = false
      config.resolve.fallback.tls = false
    } else {
      require('./scripts/generate-og-images')
    }

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: partytown.libDirPath(),
            to: path.join(__dirname, 'public', '~partytown'),
          },
        ],
      }),
    )

    return config
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination: 'https://www.linkedin.com/in/bmstefanski/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
})
