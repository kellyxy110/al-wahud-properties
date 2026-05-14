import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/app/lib/data';

const BASE = 'https://alwajudproperties.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/properties`,    lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/services`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/ceo`,           lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/legal`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
