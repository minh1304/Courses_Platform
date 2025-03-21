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
      {
        protocol: "https",
        hostname: "imagepng.org",
        pathname: "/wp-content/uploads/2019/08/**",
      }
    ],
  },
};

export default nextConfig;
