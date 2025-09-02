/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'forbes-partners.com',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                pathname: '/qtbqvna1l0yq/**',
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: [
            '127.0.0.1',
            'localhost',
            'raw.githubusercontent.com',
            'assets.coingecko.com',
            'tokens.1inch.io',
            'static.alchemyapi.io',
        ],    }, async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_API_URL
                    ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
                    : 'https://api.fgpremiumfunds.com/:path*'
            }
        ]
    }
}

module.exports = nextConfig
