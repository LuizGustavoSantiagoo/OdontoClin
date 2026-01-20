import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Pin the project root so Turbopack does not pick the parent lockfile
  turbopack: { root: __dirname },
};

module.exports = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com',
      
    }],
  },
}

export default nextConfig;
