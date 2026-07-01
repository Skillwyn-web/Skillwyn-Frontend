import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skillwyn.com';

  // Core public pages for Google to index
  const routes = [
    '',
    '/algorithmic-vault',
    '/about',
    '/pricing',
    '/roadmaps',
    '/resources',
    '/dsa',
    '/interview-questions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
