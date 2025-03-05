import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.underconsideration.com",
        pathname: "/brandnew/archives/**",
      },
    ],
  },
};

export default nextConfig;
