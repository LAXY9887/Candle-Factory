// https://nuxt.com/docs/api/configuration/nuxt-config
import productsData from './data/products.json'

// 中文 title → ASCII slug（與 utils/slug.ts 的 titleToSlugMap 同步）
// 使用 ASCII 避開 Nuxt 3.21 對中文 dynamic route prerender 的 bug
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

const productRoutes = (productsData.products as Array<{ title: string }>).map(
  (p) => `/products/${titleToSlug[p.title] ?? p.title.replace(/\s+/g, '-').toLowerCase()}`,
)

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // SSG 模式
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/intro',
        '/contact',
        '/privacy',
        '/sitemap.xml',
        ...productRoutes,
      ],
    },
  },

  // 網站基本資訊
  site: {
    url: 'https://candle-factory-website.web.app',
    name: '重光企業社',
    description:
      '彰化重光企業社 — 傳承傳統手工蠟燭與斗燭製作工藝，專供拜拜、祭祀、宗教儀式所需蠟燭。佛杯、蓮花、旺來、葫蘆、斗燭，批發零售皆可。',
    defaultLocale: 'zh-TW',
  },

  // 全域 HTML head
  app: {
    head: {
      htmlAttrs: { lang: 'zh-TW' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        {
          name: 'keywords',
          content:
            '彰化,傳統蠟燭,蠟燭,斗燭,祭祀,拜拜,手工蠟燭,重光企業社,佛杯,蓮花蠟燭,旺來蠟燭,葫蘆蠟燭,宗教用品,彰化蠟燭工廠',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_TW' },
        { property: 'og:site_name', content: '重光企業社 Chong Guang' },
        { name: 'theme-color', content: '#690303' },
        { 'http-equiv': 'Permissions-Policy', content: 'interest-cohort=()' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  // 全域 CSS
  css: [
    '~/styles/global_font.css',
    '~/styles/main.css',
    '~/styles/top_mobile_header.css',
    '~/styles/main_image_design.css',
    '~/styles/imageWall.css',
    '~/styles/product_section.css',
    '~/styles/product_intro.css',
    '~/styles/infomation_card.css',
    '~/styles/hidden_menu.css',
    '~/styles/intro_page.css',
    '~/styles/site_footer.css',
  ],

  // 模組
  modules: ['nuxt-gtag'],

  gtag: {
    id: 'G-RZH9MFRD9W',
  },

  // TypeScript 嚴格模式
  typescript: {
    strict: true,
    typeCheck: false,
  },
})
