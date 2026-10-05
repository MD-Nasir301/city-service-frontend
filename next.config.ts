import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //reactCompiler: true,
  // output: "export"

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // 👈 Cloudinary Hostname
      },
    ],
  },
};

export default nextConfig;
