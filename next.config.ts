import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Enable static export for GitHub Pages
	output: "export",

	// Disable server-based features
	images: {
		unoptimized: true,
	},

	// Add trailing slash for consistent URLs
	trailingSlash: true,
};

export default nextConfig;
