import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      };
      config.resolve.alias = {
        constants: require.resolve(
          "rollup-plugin-node-polyfills/polyfills/constants"
        ),
        process: "process/browser"
      };
    } else {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        worker_threads: require.resolve('worker_threads'),
      };
    }
    return config;
  },
  serverExternalPackages: ["web-worker"]
};

export default nextConfig;
