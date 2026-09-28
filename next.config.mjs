/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/portraits-linkedin.html',
        destination: '/munichre/portraits-linkedin.html',
      },
      {
        source: '/portraits-epo.html',
        destination: '/munichre/portraits-epo.html',
      },
      {
        source: '/portraits-staatsoper.html',
        destination: '/munichre/portraits-staatsoper.html',
      },
      {
        source: '/portraits-puma.html',
        destination: '/munichre/portraits-puma.html',
      },
      {
        source: '/munichre/portraits-linkedin',
        destination: '/munichre/portraits-linkedin.html',
      },
      {
        source: '/munichre/portraits-epo',
        destination: '/munichre/portraits-epo.html',
      },
      {
        source: '/munichre/portraits-staatsoper',
        destination: '/munichre/portraits-staatsoper.html',
      },
      {
        source: '/munichre/portraits-puma',
        destination: '/munichre/portraits-puma.html',
      },
    ]
  },
}

export default nextConfig
