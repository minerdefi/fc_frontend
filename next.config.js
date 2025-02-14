/** @type {import('next').NextConfig} */
const nextConfig = {
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
    },
}

module.exports = nextConfig
