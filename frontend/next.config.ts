import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  frame-src 'self' https://www.youtube.com https://youtube.com;
`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  }
};

export default nextConfig;
