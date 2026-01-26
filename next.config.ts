import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  // Exclude Storybook files from build
  turbopack: {
    rules: {
      '*.stories.{ts,tsx,js,jsx}': {
        loaders: ['ignore-loader'],
      },
    },
  },
  
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        port: '',
        pathname: '/api/mcp/asset/**',
      },
    ],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression
  compress: true,

  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
