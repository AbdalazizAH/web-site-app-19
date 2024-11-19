/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'pyauuapknnwofmrymguv.supabase.co',
            pathname: '/storage/v1/object/public/**',
        }],
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
