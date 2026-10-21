import type { NextConfig } from "next";

const allowedDevOrigins = process.env.IP_ADDRESS ? [process.env.IP_ADDRESS] : [];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
