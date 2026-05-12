import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@xenova/transformers", "onnxruntime-web"],
  }
};

export default nextConfig;