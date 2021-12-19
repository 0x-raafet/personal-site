const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
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
    }

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
  swcMinify: true,
  experimental: { nftTracing: true },
})
