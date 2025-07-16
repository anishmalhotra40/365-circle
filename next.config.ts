import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", 
      "media.licdn.com", // Allow LinkedIn profile images
    ],
  },
};

export default nextConfig;
