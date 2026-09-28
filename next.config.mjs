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
        destination: '/defaultagency/portraits-linkedin.html',
      },
      {
        source: '/portraits-epo.html',
        destination: '/defaultagency/portraits-epo.html',
      },
      {
        source: '/portraits-staatsoper.html',
        destination: '/defaultagency/portraits-staatsoper.html',
      },
      {
        source: '/portraits-puma.html',
        destination: '/defaultagency/portraits-puma.html',
      },
      {
        source: '/defaultagency/portraits-linkedin',
        destination: '/defaultagency/portraits-linkedin.html',
      },
      {
        source: '/defaultagency/portraits-epo',
        destination: '/defaultagency/portraits-epo.html',
      },
      {
        source: '/defaultagency/portraits-staatsoper',
        destination: '/defaultagency/portraits-staatsoper.html',
      },
      {
        source: '/defaultagency/portraits-puma',
        destination: '/defaultagency/portraits-puma.html',
      },
    ]
  },
}

export default nextConfig
