import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Pin the project root so Turbopack does not pick the parent lockfile
  turbopack: { root: __dirname },
};

module.exports = {
  images: {
    qualities: [25, 50, 75]
  },
}

export default nextConfig;
