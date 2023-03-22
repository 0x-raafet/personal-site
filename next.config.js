const partytown = require('@builder.io/partytown/utils')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const CopyPlugin = require('copy-webpack-plugin')
const withExportImages = require('next-export-optimize-images')
const withLinaria = require('next-linaria')
const path = require('path')

module.exports = withExportImages(
  withLinaria(
    withBundleAnalyzer({
      reactStrictMode: true,
      poweredByHeader: false,
      externalHelpers: true,
      experimental: {
        nftTracing: true,
        legacyBrowsers: false,
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
        // if (isServer) {
        //   require('./scripts/generate-og-images')
        // }

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
            destination: 'https://www.linkedin.com/in/bart-stefanski/',
            permanent: true,
          },
        ]
      },
      async rewrites() {
        return [
          { source: '/widget.js', destination: 'https://made-by-widget.vercel.app/main.modern.js' },
          { source: '/widget.css', destination: 'https://made-by-widget.vercel.app/main.css' },
        ]
      },
    }),
  ),
)
