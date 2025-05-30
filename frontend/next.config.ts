import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  frame-src 'self' https://www.youtube.com https://youtube.com;
`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.STRAPI_API_URL?.replace(/https?:\/\//, '') || '127.0.0.1',
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
