import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true, // kalıcı mı? yoksa false da yapabilirsin
      },
    ];
  },

};

export default nextConfig;
