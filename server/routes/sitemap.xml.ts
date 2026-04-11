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

  // ASCII slug 對照（與 utils/slug.ts 同步）
  const titleToSlug: Record<string, string> = {
    佛杯: 'fobei',
    五號蓮花: '5hao-lianhua',
    '2號立體蓮花': '2hao-liti-lianhua',
    '5號旺來': '5hao-wanglai',
    '3號旺來': '3hao-wanglai',
    '2號旺來(B)': '2hao-wanglai-b',
    '1號旺來(B)': '1hao-wanglai-b',
    '10斤旺來': '10jin-wanglai',
    '20斤旺來': '20jin-wanglai',
    '5號葫蘆': '5hao-hulu',
    '3號葫蘆': '3hao-hulu',
    '2號葫蘆': '2hao-hulu',
    '1號葫蘆': '1hao-hulu',
    一斤斗燭: '1jin-douzhu',
    二斤斗燭: '2jin-douzhu',
    三斤斗燭: '3jin-douzhu',
  }

  const toSlug = (title: string) =>
    titleToSlug[title] ?? title.replace(/\s+/g, '-').toLowerCase()

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
