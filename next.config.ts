import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_API_URL || 'https://your-render-app-name.onrender.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-Type, Date' },
        ]
      }
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'forbes-partners.com', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'images.ctfassets.net', pathname: '/qtbqvna1l0yq/**' }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['127.0.0.1', 'localhost', 'fgpremium.pythonanywhere.com', process.env.NEXT_PUBLIC_API_URL?.replace('https://', '') || 'fgpremium.pythonanywhere.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          : '/api/:path*'
      }
    ]
  }
}

export default nextConfig
