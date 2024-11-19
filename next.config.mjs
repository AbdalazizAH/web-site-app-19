/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'pyauuapknnwofmrymguv.supabase.co',
            pathname: '/storage/v1/object/public/**',
        }],
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    async rewrites() {
        return [
            {
                source: '/api/cart',
                destination: 'https://backend-v1-psi.vercel.app/cart',
            },
            {
                source: '/api/cart/:path*',
                destination: 'https://backend-v1-psi.vercel.app/cart/:path*',
            }
        ];
    }
};

export default nextConfig;
