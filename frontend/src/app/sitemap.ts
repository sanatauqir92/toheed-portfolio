import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://toheedchaudhry.com';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/narrative`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/credits`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/equipment`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
