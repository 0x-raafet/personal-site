const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.child_process = false
      config.resolve.fallback.worker_threads = false
    }
    return config
  },
})
