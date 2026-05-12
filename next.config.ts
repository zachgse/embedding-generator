/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node","@xenova/transformers"],
  },
  webpack: (config:any) => {
    // Ignore node-specific modules when bundling for the browser
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },
}