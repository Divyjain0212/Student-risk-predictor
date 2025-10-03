const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'next-auth', 'jose', 'jsonwebtoken'],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Enable strict mode
  reactStrictMode: true,
  // Reduce build warnings
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Optimize images  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https', 
        hostname: 'your-domain.com',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
  },
  // Bundle analyzer in development
  ...(process.env.ANALYZE === 'true' && {
    experimental: {
      bundlePagesExternals: false,
    },
  }),
  webpack: (config, { isServer, dev }) => {
    // Ensure proper path resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
      '@/models': path.resolve(__dirname, 'models'),
      '@/lib': path.resolve(__dirname, 'lib'),
    };

    // Fallback configuration for client builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
    // Email config - optional
    EMAIL_SERVER: process.env.EMAIL_SERVER || '',
    EMAIL_FROM: process.env.EMAIL_FROM || '',
  }
}

module.exports = nextConfig