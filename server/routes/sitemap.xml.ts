import productsData from '~/data/products.json'

/**
 * 動態生成 sitemap.xml
 *
 * 在 SSG 模式 (`nuxt generate`) 下，Nitro 會把這個路由
 * prerender 成靜態 sitemap.xml 檔。
 */
export default defineEventHandler((event) => {
  const baseUrl = 'https://candle-factory-website.web.app'
  const today = new Date().toISOString().split('T')[0]

  const toSlug = (title: string) =>
    encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())

  const staticUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'monthly' },
    { loc: `${baseUrl}/intro`, priority: '0.8', changefreq: 'yearly' },
    { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'yearly' },
  ]

  const productUrls = productsData.products.map((p: { title: string }) => ({
    loc: `${baseUrl}/products/${toSlug(p.title)}`,
    priority: '0.9',
    changefreq: 'monthly',
  }))

  const allUrls = [...staticUrls, ...productUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

  setResponseHeader(event, 'Content-Type', 'application/xml')
  return xml
})
