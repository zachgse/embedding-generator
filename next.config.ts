// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use experimental.serverComponentsExternalPackages for Next.js 13.4+
  experimental: {
    serverComponentsExternalPackages: ["@xenova/transformers", "onnxruntime-node"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
    };
    return config;
  },
};

export default nextConfig;