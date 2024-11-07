import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

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
    const artifactPackageJsonPath = require.resolve('@pcd/proto-pod-gpc-artifacts/package.json');
    const artifactPath = path.dirname(artifactPackageJsonPath);
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { 
            from: artifactPath, 
            to: path.join(__dirname, 'public/artifacts'),
            force: true
          }
        ]
      })
    );
    return config;
  },
  serverExternalPackages: ["web-worker"]
};

export default nextConfig;
