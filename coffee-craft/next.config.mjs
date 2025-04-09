// import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
    domains: ['eias3o7vij.ufs.sh'],
  },
};

export default nextConfig;
