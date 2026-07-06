import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid dev indicator overlapping mobile bottom nav; set false to hide entirely
  devIndicators: {
    position: "top-right",
  },
};

export default nextConfig;
