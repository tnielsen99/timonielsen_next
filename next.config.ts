import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SCSS modules
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  
  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [], // Add external domains if needed
  },
  
  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Disable static optimization for animation-heavy pages
  trailingSlash: true,
  
  // Experimental features
  experimental: {
    // Add experimental features if needed
  },
  
  // Webpack configuration for additional loaders if needed
  webpack: (config) => {
    // Add any custom webpack configurations here
    return config;
  },
};

export default nextConfig;
