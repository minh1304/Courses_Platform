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
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:8001',
},
};



export default nextConfig;
