// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // SSG 模式
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // 網站基本資訊（給 @nuxtjs/seo 用）
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

  // 全域 CSS（Phase 2 會把 legacy/public/css/ 搬到 assets/css/）
  css: [
    // '~/assets/css/main.css',
    // '~/assets/css/global_font.css',
    // ...
  ],

  // 模組
  modules: [
    // Phase 0 先不載入任何模組，確認骨架能跑之後再加
    // '@nuxtjs/seo',
    // '@nuxt/image',
    // '@vueuse/nuxt',
  ],

  // TypeScript 嚴格模式
  typescript: {
    strict: true,
    typeCheck: false, // Phase 0 先關閉，避免阻塞開發
  },
})
