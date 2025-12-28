import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Disable server-based features
  images: {
    unoptimized: true,
  },

  // Optional: Add trailing slash for consistent URLs
  trailingSlash: true,

  // Configure base path if your repo name is not the username
  // For example: basePath: '/repo-name' if deploying to github.io/repo-name
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
