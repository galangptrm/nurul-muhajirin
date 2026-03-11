import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
		serverActions: {
			// Increase the limit to 50MB (or whatever max size you want to allow for short videos)
			bodySizeLimit: '10mb', 
		},
	},
};

export default nextConfig;
