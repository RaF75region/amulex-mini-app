import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  // Optimize images
  images: {
    domains: [],
    unoptimized: false,
  },

  // Enable compression
  compress: true,

  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
