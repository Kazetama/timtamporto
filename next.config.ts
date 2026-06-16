import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "amvxxgtjhmrfcibzvvrz.supabase.co",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
