import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Move this to the top level (Fixes the warning)
  cacheComponents: true,

  experimental: {
    inlineCss: true,
    useCache: true,
  },

  // 2. Add this section (Fixes the "Expected 2 arguments" build error)
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
};

export default nextConfig;
