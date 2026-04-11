# Nuxt 3 SSG 遷移實作計畫

> 目標：將目前純 HTML/CSS/Vanilla JS 的重光蠟燭網站改寫為 Nuxt 3 + TypeScript 專案，使用 SSG (`nuxt generate`) 部署到現有 Firebase Hosting，**完全重用現有圖片、CSS、資料來源**，達到完整 SEO 能力，且維持零營運成本。

---

## 1. 目標與範圍

### 1.1 必做目標（Must Have）

- [ ] 使用 Nuxt 3 + TypeScript 重寫前端
- [ ] `nuxt generate` 輸出純靜態 HTML（SSG）
- [ ] **所有現有圖片、CSS 檔、產品 JSON、字體、配色、版面視覺** 完全保留
- [ ] CSV → JSON 的產品管理流程不動（但腳本路徑可能微調）
- [ ] 完整 SEO：meta、Open Graph、JSON-LD、sitemap.xml、robots.txt
- [ ] **首頁 SEO 關鍵字涵蓋：彰化、傳統蠟燭、蠟燭、斗燭、祭祀、拜拜、手工蠟燭、重光企業社**
- [ ] **每個產品一個獨立頁面（`/products/[slug]`），並擴充產品文本（詳見 §19 附錄 B）**
- [ ] 移除 jQuery 依賴
- [ ] 頁尾改為現代化設計（詳見 §10）
- [ ] **隱私權政策頁面（`/privacy`）** — 因本站將啟用 Google Analytics，需有明確個資使用說明
- [ ] 維持 Firebase Hosting（不改 App Hosting）
- [ ] 維持現有快取策略
- [ ] 響應式設計 1:1 保留

### 1.2 不做（Non-Goals）

- ❌ 廣告、AdSense
- ❌ Firestore / 其他資料庫
- ❌ CMS 後台
- ❌ 使用者帳號 / 登入系統
- ❌ 電商購物車 / 線上結帳
- ❌ i18n（維持僅繁體中文）
- ❌ PWA / Service Worker（非必要）
- ❌ SSR 模式（只用 SSG）
- ❌ 電子郵件聯絡資訊（本次不放）
- ❌ 社群媒體連結（本次不放）

### 1.3 Nice to Have（看最後有時間決定）

- ✅ **Google Analytics 4**（已確認啟用，用於 SEO 流量追蹤；搭配隱私權政策頁）
- ⭕ 圖片 WebP 轉換與 lazy load（`@nuxt/image`）
- ⭕ 頁面轉場動畫
- ⭕ 深色模式（一般不需要，但成本低）

---

## 2. 技術棧

| 項目 | 選擇 | 備註 |
|------|------|------|
| 框架 | **Nuxt 3**（最新穩定版） | Vue 3 + Vite + Nitro |
| 語言 | **TypeScript** | 嚴格模式 |
| 套件管理 | **pnpm** | 速度快、節省空間 |
| 生成模式 | **`nuxt generate`**（SSG） | 純靜態輸出 |
| 部署 | **Firebase Hosting**（現有） | 不換平台 |
| 樣式 | 保留現有 CSS + 全域 import | 之後可漸進 scoped |
| 字體 | 保留 `cwTeXFangSong`（Google Fonts Early Access） | 不動 |
| 狀態管理 | 僅用 composable（沒必要上 Pinia） | 資料單向流 |
| Icon | 現有 PNG 圖檔 | 不換 icon library |

### 2.1 Nuxt 模組清單

| 模組 | 用途 | 必要性 |
|------|------|-------|
| `@nuxtjs/seo` | 統包 SEO（sitemap、robots、og-image、schema-org、link-checker） | ✅ 必要 |
| `@nuxt/image` | 圖片優化、WebP、lazy load | ✅ 必要 |
| `@vueuse/nuxt` | Vue 工具函式庫 | 🟡 建議 |
| `@nuxtjs/google-fonts` | 字體管理 | ⚠️ 可選，若保留現有 `@import` 則不需 |

---

## 3. 目錄結構規劃

```
candle-factory-website/                      (專案根目錄)
├── plans/                                   ← 本計畫位置
│   └── nuxt-migration-plan.md
├── Assets/                                  ← 原始素材（不進 Git）
│   └── data/
│       └── 產品清單.csv                      ✅ 保留
├── scripts/
│   └── update_products.py                   ✅ 保留，可能微調輸出路徑
│
├── assets/                                  🆕 Nuxt assets（會進 build）
│   ├── css/                                 ← 從 public/css/ 搬過來
│   │   ├── main.css
│   │   ├── global_font.css
│   │   ├── top_mobile_header.css
│   │   ├── main_image_design.css
│   │   ├── imageWall.css
│   │   ├── product_section.css
│   │   ├── infomation_card.css
│   │   ├── footer.css                       🆕 重寫（現代化）
│   │   ├── hidden_menu.css
│   │   ├── intro_page.css
│   │   └── product_intro.css
│   └── data/
│       └── products.json                    ← 由 update_products.py 生成
│
├── components/                              🆕 Vue 組件
│   ├── layout/
│   │   ├── TopHeader.vue
│   │   ├── SiteFooter.vue                   🆕 現代化頁尾
│   │   └── HiddenMenu.vue
│   ├── home/
│   │   ├── MainImageHero.vue                ← 首頁形象圖區塊
│   │   ├── ImageWall.vue                    ← 照片牆（含輪播）
│   │   ├── CompanyNameSpacer.vue
│   │   ├── CategoryButtons.vue
│   │   ├── CategoryIntro.vue
│   │   ├── ProductCardList.vue
│   │   └── ProductCard.vue
│   ├── seo/
│   │   └── ProductStructuredData.vue        🆕 JSON-LD
│   └── effects/                             ← Client-only canvas
│       ├── FlickeringCanvas.vue             ← 開場動畫
│       └── DecoDiamond.vue                  ← 裝飾菱形
│
├── composables/                             🆕
│   ├── useProducts.ts                       ← 載入產品資料
│   ├── useCategoryState.ts                  ← 分類切換狀態
│   └── useProductSlug.ts                    ← 產品 slug 工具
│
├── utils/                                   🆕
│   └── slug.ts                              ← 中文轉 slug 函式
│
├── layouts/                                 🆕
│   └── default.vue                          ← 預設版面
│
├── pages/                                   🆕
│   ├── index.vue                            ← 首頁
│   ├── intro.vue                            ← 工廠介紹
│   ├── contact.vue                          ← 聯絡我們
│   ├── products/
│   │   └── [slug].vue                       🆕 產品詳細頁
│   └── privacy.vue                          🆕 (可選) 隱私權政策
│
├── public/                                  ← Nuxt 的靜態檔
│   ├── image/                               ✅ 整個從現在的 public/image/ 搬過來
│   │   ├── image wall/
│   │   ├── candle sprite1.png
│   │   ├── cup candle intro.png
│   │   ├── ... (41 張圖)
│   │   └── Logo.png
│   ├── favicon.ico                          ✅ 保留
│   ├── favicon-16x16.png                    ✅
│   ├── favicon-32x32.png                    ✅
│   ├── apple-touch-icon.png                 ✅
│   ├── android-chrome-192x192.png           ✅
│   ├── android-chrome-512x512.png           ✅
│   └── site.webmanifest                     ✅
│
├── server/                                  ← 不使用（純 SSG）
│
├── app.vue                                  🆕 Nuxt 根組件
├── nuxt.config.ts                           🆕
├── tsconfig.json                            🆕 (Nuxt 自動生成)
├── package.json                             🆕
├── pnpm-lock.yaml                           🆕
├── .nuxtignore                              🆕
├── .gitignore                               ✅ 調整（加 .nuxt, .output, node_modules）
├── firebase.json                            ✅ 調整 public 為 .output/public
├── .firebaserc                              ✅ 不動
└── README.md                                ✅ 更新部署流程
```

---

## 4. 素材重用對照表

### 4.1 完全保留不動

| 項目 | 來源 | 目的地 |
|------|------|--------|
| 所有產品圖片 | `public/image/*` | `public/image/*` |
| 照片牆圖片 | `public/image/image wall/*` | `public/image/image wall/*` |
| Logo 相關 | `public/image/Logo*.png` | `public/image/Logo*.png` |
| Favicon 套組 | `public/favicon*`, `android-chrome-*`, `apple-touch-icon` | `public/*`（同名） |
| Web Manifest | `public/site.webmanifest` | `public/site.webmanifest` |
| 產品 CSV | `Assets/data/產品清單.csv` | 不動 |
| Python 腳本 | `scripts/update_products.py` | 不動（僅調整輸出路徑） |
| Firebase 設定 | `.firebaserc` | 不動 |
| 網頁配色 | 紅 `rgb(105, 3, 3)` + 白卡片 | 不動 |
| 字體 | `cwTeXFangSong`（Google Fonts Early Access） | 不動 |

### 4.2 搬移並轉換

| 項目 | 來源 | 目的地 | 轉換說明 |
|------|------|--------|---------|
| 9 個 CSS 檔 | `public/css/*.css` | `assets/css/*.css` | 在 `nuxt.config.ts` 全域引入 |
| 產品 JSON | `public/product_infoCard.json` | `assets/data/products.json` | 改由 `import` 載入，build time 烘焙進 HTML |
| index.html | `public/index.html` | `app.vue` + `pages/index.vue` + 各組件 | 結構拆成 Vue 組件 |
| intro_page.html | `public/intro_page.html` | `pages/intro.vue` | 同上 |
| contact_us_page.html | `public/contact_us_page.html` | `pages/contact.vue` | 同上 |
| `infoCard_generation.js` | `public/javascripts/` | `ProductCardList.vue` + `CategoryButtons.vue` + `CategoryIntro.vue` | Vanilla → Vue Composition API |
| `hidden_menu_list_function.js` | 同上 | `HiddenMenu.vue` | 移除 jQuery |
| `imageWall_behavior.js` | 同上 | `ImageWall.vue` | jQuery animate → CSS transition |
| `flickering_op.js` | 同上 | `FlickeringCanvas.vue`（`<ClientOnly>`） | 邏輯不動，包 onMounted |
| `draw_diamond.js` | 同上 | `DecoDiamond.vue`（`<ClientOnly>`） | 同上 |
| `handle_page_switch.js` | 同上 | `composables/useCategoryState.ts` + route query | localStorage 改 URL query |
| `scroll_to_target.js` | 同上 | Nuxt 原生 scrollBehavior | 刪除 |
| `jquery.js`（10,716 行） | 同上 | ❌ **移除** | 省 280 KB |
| Footer HTML | 現有各頁底部 | `components/layout/SiteFooter.vue` | **重寫為現代化版本**，內容詳見 §10 |

---

## 5. 資料流設計

```
┌─────────────────────────────┐
│ Assets/data/產品清單.csv    │  (Single Source of Truth)
└──────────────┬──────────────┘
               │
               │ python scripts/update_products.py
               ▼
┌─────────────────────────────┐
│ assets/data/products.json   │  (build-time input)
│   ├─ categories[] (5 筆)    │
│   └─ products[] (N 筆)      │
└──────────────┬──────────────┘
               │
               │ import() 於 composables/useProducts.ts
               ▼
┌─────────────────────────────┐
│ Nuxt build (nuxt generate)  │
│   - pages/index.vue         │ ← 嵌入分類按鈕、介紹、所有產品卡
│   - pages/products/[slug]   │ ← 為每個產品 prerender 一頁
│   - sitemap.xml             │ ← 含所有產品 URL
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ .output/public/             │  (純靜態 HTML + CSS + JS + 圖)
└──────────────┬──────────────┘
               │
               │ firebase deploy --only hosting
               ▼
┌─────────────────────────────┐
│ candle-factory-website.web.app │
└─────────────────────────────┘
```

**關鍵點：**
- 產品資料在 **build time** 載入，結果烘焙進靜態 HTML
- 爬蟲看到的 HTML 含完整產品名、價格、敘述、圖片 → SEO 無死角
- 執行時 `useAsyncData` 會重用烘焙的資料，不會二次 fetch
- `scripts/update_products.py` 輸出路徑從 `public/product_infoCard.json` 改為 `assets/data/products.json`

---

## 6. 頁面與路由

| 路由 | 檔案 | SEO Title（暫定） | 說明 |
|------|------|------------------|------|
| `/` | `pages/index.vue` | 重光企業社 \| 彰化手工蠟燭工廠 \| 傳統斗燭 | 首頁 |
| `/intro` | `pages/intro.vue` | 工廠介紹 \| 重光企業社 | 工廠介紹 |
| `/contact` | `pages/contact.vue` | 聯絡我們 \| 重光企業社 | 聯絡資訊 |
| `/products/[slug]` | `pages/products/[slug].vue` | {商品名} \| 重光企業社 | 產品詳細頁（每個產品一頁，文本擴充，詳見 §19 附錄 B） |
| `/privacy` | `pages/privacy.vue` | 隱私權政策 \| 重光企業社 | **已確認啟用**（因啟用 GA4） |
| 404 | 自動（Nuxt 預設） | 頁面不存在 | 保留現有 404.html 的設計 |

### 6.1 Prerender 設定

```ts
// nuxt.config.ts
nitro: {
  prerender: {
    crawlLinks: true,
    routes: ['/'],  // 其他靜態頁面會被 crawlLinks 找到
    // 產品頁在 runtime 由 composable 推入：
    // 於 hooks 中讀取 products.json，加入每個 slug 路徑
  }
}
```

具體的產品頁 prerender，會在 `nuxt.config.ts` 的 `hooks` 中：

```ts
hooks: {
  'nitro:config'(nitroConfig) {
    const products = require('./assets/data/products.json').products
    nitroConfig.prerender.routes.push(
      ...products.map(p => `/products/${toSlug(p.title)}`)
    )
  }
}
```

---

## 7. 組件拆分詳細設計

### 7.1 Layout 組件

#### `layouts/default.vue`
```
┌─────────────────────────────────┐
│ <TopHeader />                   │
│ ┌─────────────────────────────┐ │
│ │ <slot />  ← page content    │ │
│ └─────────────────────────────┘ │
│ <SiteFooter />                  │
│ <HiddenMenu />                  │
│ <FlickeringCanvas v-if=開場 />   │ (僅首頁)
└─────────────────────────────────┘
```

#### `components/layout/TopHeader.vue`
- Props: 無
- 內容：LOGO、功能按鈕（工廠介紹 / 產品列表 / 聯絡我們）、隱藏選單按鈕
- 邏輯：點擊漢堡 icon 切換 `isMenuOpen`，透過 composable 廣播
- 移除原本的 jQuery 依賴

#### `components/layout/SiteFooter.vue`
- 現代化版本，內容詳見 §10

#### `components/layout/HiddenMenu.vue`
- Props: 無
- 使用 `useProducts()` 取得產品資料
- 按分類分組顯示
- 點擊產品 → 跳轉至 `/?category=Type-X&product=slug`（或直接至產品頁）
- 使用 `v-show` + CSS transition 取代 jQuery `.toggleClass`

### 7.2 首頁組件

#### `components/home/MainImageHero.vue`
- 主形象圖 + 標語「重燭烈焰薪不滅 / 光射四方暖萬家」
- 蠟燭 sprite 左右裝飾
- 樣式：保留 `main_image_design.css`

#### `components/home/ImageWall.vue`
- Props: 無
- 圖片清單寫死在組件內（或獨立為 `composables/useImageWall.ts`）
- 輪播邏輯：原 `imageWall_behavior.js` 移植
- 動畫：CSS transform + transition 取代 jQuery `.animate`
- 自動輪播：`setInterval` 配合 `onUnmounted` 清理

#### `components/home/CategoryButtons.vue`
- Props: `currentType: string`
- Emits: `@change(type: string)`
- 由 `useProducts()` 的 categories 生成
- 內部狀態：現在選中的分類
- 樣式：保留 `product_section.css`

#### `components/home/CategoryIntro.vue`
- Props: `category: Category`（單一分類）
- 顯示分類介紹圖文
- 樣式：保留 `product_intro.css`

#### `components/home/ProductCardList.vue`
- Props: `products: Product[]`, `currentType: string`
- 依 currentType 過濾顯示
- 使用 `<TransitionGroup>` 做切換動畫

#### `components/home/ProductCard.vue`
- Props: `product: Product`
- 點擊展開 / 收合狀態
- 有「詳細資訊」連結至 `/products/[slug]`
- 樣式：保留 `infomation_card.css`

### 7.3 SEO 組件

#### `components/seo/ProductStructuredData.vue`
- Props: `product: Product`
- 輸出 `<script type="application/ld+json">` 含 Product schema
- 用於產品詳細頁

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "10斤旺來",
  "description": "青磚白瓦間，燭光在微風裡閃爍舞動...",
  "image": "https://candle-factory-website.web.app/image/10 pineapple info.jpg",
  "category": "旺來",
  "brand": {
    "@type": "Brand",
    "name": "重光企業社"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TWD",
    "price": "1400",
    "availability": "https://schema.org/InStock"
  }
}
```

### 7.4 Effect 組件（Client-Only）

#### `components/effects/FlickeringCanvas.vue`
```vue
<template>
  <ClientOnly>
    <div id="fireCanvas_backGround" ref="bgRef" class="fireCanvas_BG">
      <canvas ref="canvasRef" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const bgRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  // 原 flickering_op.js 邏輯搬進來
})
</script>
```

#### `components/effects/DecoDiamond.vue`
- 同上，包裝 `draw_diamond.js`

---

## 8. Composables 設計

### 8.1 `composables/useProducts.ts`

```ts
import productsData from '~/assets/data/products.json'

export interface Category {
  name: string
  type: string
  image: string
  description: string
}

export interface Product {
  title: string
  category: string
  type: string
  image: string
  description: string
  price: string
}

export const useProducts = () => {
  return {
    categories: productsData.categories as Category[],
    products: productsData.products as Product[],
  }
}
```

### 8.2 `composables/useCategoryState.ts`

```ts
export const useCategoryState = () => {
  const route = useRoute()
  const router = useRouter()

  const currentType = computed({
    get: () => (route.query.category as string) || 'Type-3',
    set: (val) => router.push({ query: { ...route.query, category: val } }),
  })

  return { currentType }
}
```

### 8.3 `utils/slug.ts`

```ts
export const toSlug = (title: string): string => {
  // 保持與現有 encodeURIComponent 的一致性
  return encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())
}
```

---

## 9. SEO 實作細節

### 9.1 全站預設 meta

```ts
// nuxt.config.ts
app: {
  head: {
    htmlAttrs: { lang: 'zh-TW' },
    meta: [
      { charset: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      {
        name: 'description',
        content: '彰化重光企業社 — 傳承傳統手工蠟燭與斗燭製作工藝，專供拜拜、祭祀、宗教儀式所需蠟燭。佛杯、蓮花、旺來、葫蘆、斗燭，批發零售皆可。'
      },
      {
        name: 'keywords',
        content: '彰化,傳統蠟燭,蠟燭,斗燭,祭祀,拜拜,手工蠟燭,重光企業社,佛杯,蓮花蠟燭,旺來蠟燭,葫蘆蠟燭,宗教用品,彰化蠟燭工廠'
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'zh_TW' },
      { property: 'og:site_name', content: '重光企業社 Chong Guang' },
      { name: 'theme-color', content: '#690303' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'canonical', href: 'https://candle-factory-website.web.app' },
    ],
  }
}
```

### 9.1.1 首頁獨立 SEO 設定（重點關鍵字覆蓋）

```ts
// pages/index.vue
useSeoMeta({
  title: '重光企業社 | 彰化傳統手工蠟燭工廠 | 斗燭・祭祀蠟燭・拜拜用品',
  description:
    '彰化重光企業社，專業手工蠟燭與傳統斗燭製造工廠。供應佛杯、蓮花、旺來、葫蘆、斗燭等宗教祭祀拜拜用蠟燭，批發零售皆可。傳承傳統工藝，為每一次祈願點亮光明。',
  ogTitle: '重光企業社 - 彰化傳統手工蠟燭工廠',
  ogDescription: '彰化在地手工蠟燭工坊，專製傳統斗燭、佛杯、蓮花、旺來、葫蘆蠟燭，祭祀拜拜首選。',
  ogImage: 'https://candle-factory-website.web.app/image/main image large.png',
  twitterCard: 'summary_large_image',
})
```

**關鍵字策略：** 首頁 `<title>`、`<h1>`、`<meta description>`、首段文字、產品分類名稱 全都要自然地包含以下字詞：

- **地區關鍵字**：彰化、彰化市、台灣
- **產品類別**：傳統蠟燭、手工蠟燭、蠟燭、斗燭、佛杯、蓮花蠟燭、旺來蠟燭、葫蘆蠟燭
- **用途關鍵字**：祭祀、拜拜、宗教、祈福、節慶、廟會、祭祖
- **品牌**：重光企業社、Chong Guang

### 9.2 每個頁面的 `useSeoMeta`

範例（產品詳細頁）：

```ts
useSeoMeta({
  title: `${product.title} - 重光企業社`,
  description: product.description,
  ogTitle: `${product.title} - 重光企業社`,
  ogDescription: product.description,
  ogImage: `https://candle-factory-website.web.app/${product.image}`,
  ogUrl: `https://candle-factory-website.web.app/products/${slug}`,
  twitterCard: 'summary_large_image',
})
```

### 9.3 站點地圖

用 `@nuxtjs/seo` 套件（含 sitemap），自動抓取所有頁面包含動態產品頁。

```ts
// nuxt.config.ts
sitemap: {
  hostname: 'https://candle-factory-website.web.app',
  gzip: true,
}
```

### 9.4 robots.txt

```
# nuxt.config.ts
robots: {
  UserAgent: '*',
  Allow: '/',
  Sitemap: 'https://candle-factory-website.web.app/sitemap.xml',
}
```

### 9.5 結構化資料

- **每個產品頁**：Product schema（含 offers、brand、image）
- **全站（頁尾或 layout）**：LocalBusiness schema，含公司名、地址、電話、營業時間、地理座標
- 使用 `nuxt-schema-org` 模組

```ts
useSchemaOrg([
  defineLocalBusiness({
    name: '重光企業社',
    address: {
      streetAddress: '國聖里聖安路220號',
      addressLocality: '彰化市',
      addressRegion: '彰化縣',
      addressCountry: 'TW',
    },
    telephone: ['+886-4-7372790', '+886-4-7279724'],
    description: '傳承傳統的手工蠟燭與斗燭製作工廠。',
  })
])
```

---

## 10. 頁尾現代化重新設計

### 10.1 現有問題

- 所有頁面頁尾 HTML 重複貼在 `</html>` 之後（不合規）
- 內容稀疏：只有電話、地址、Google 地圖、版權聲明
- 無快速導覽
- 無營業時間
- 無 email
- 無社群連結（現在也沒有，但可留位）
- 無可點擊的電話 / Email 連結（`tel:` / `mailto:`）
- 無 LocalBusiness 結構化資料
- 缺乏品牌識別（沒有 LOGO）

### 10.2 新頁尾設計

**視覺結構（桌機版）：**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────┐│
│  │ 品牌區塊      │  │ 網站導覽     │  │ 聯絡資訊     │  │ 地圖  ││
│  │              │  │              │  │              │  │       ││
│  │ [LOGO]       │  │ 首頁         │  │ 📍 地址      │  │ [Map] ││
│  │ 重光企業社    │  │ 工廠介紹     │  │ 📞 公司電話  │  │       ││
│  │ 傳承三代的    │  │ 產品專區     │  │ 📞 住家電話  │  │       ││
│  │ 彰化手工蠟燭  │  │  ├ 佛杯      │  │ ✉ 電子郵件  │  │       ││
│  │ 工坊...      │  │  ├ 蓮花      │  │ 🕐 營業時間 │  │       ││
│  │              │  │  ├ 旺來      │  │              │  │       ││
│  │              │  │  ├ 葫蘆      │  │              │  │       ││
│  │              │  │  └ 斗燭      │  │              │  │       ││
│  │              │  │ 聯絡我們     │  │              │  │       ││
│  └──────────────┘  └──────────────┘  └──────────────┘  └───────┘│
│                                                                  │
│ ───────────────────────────────────────────────────────────────  │
│                                                                  │
│  © 2026 重光企業社 版權所有  |  隱私權政策  |  Powered by Nuxt    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**視覺結構（手機版）：**

四個區塊改為垂直堆疊，地圖縮小至 100% 寬度置底。

### 10.3 內容細節

#### 品牌區塊
```
[LOGO 縮小版]
重光企業社
Chong Guang Enterprise

傳承傳統工藝，製作手工蠟燭與斗燭，
專供宗教祭祀與節慶儀式。
```

#### 網站導覽（Quick Links）
```
首頁                    → /
工廠介紹                → /intro
產品專區                → /#products
  - 佛杯               → /?category=Type-1
  - 蓮花               → /?category=Type-2
  - 旺來               → /?category=Type-3
  - 葫蘆               → /?category=Type-4
  - 斗燭               → /?category=Type-5
聯絡我們                → /contact
```

#### 聯絡資訊（每項都有對應的連結）
```
📍 彰化市國聖里聖安路220號
   → Google Maps 連結 (target="_blank")

📞 公司電話：04-7372790
   → <a href="tel:+88647372790">

📞 住家電話：04-7279724
   → <a href="tel:+88647279724">

✉ 電子郵件：（若有，填入；若無，先省略）
   → <a href="mailto:...">

🕐 營業時間
   週一 – 週五：09:00 – 18:00
   週六、週日：公休
```

#### 地圖區塊
- 保留現有 Google Maps iframe
- 響應式：桌機在頁尾右側，手機在底部

#### 最下一行
```
© 2026 重光企業社 版權所有
｜ 隱私權政策 （若有 GA 才需要）
｜ Made with ❤ in Changhua, Taiwan
```

### 10.4 結構化資料（JSON-LD，隱藏在頁尾）

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://candle-factory-website.web.app#localbusiness",
  "name": "重光企業社",
  "image": "https://candle-factory-website.web.app/image/Logo.png",
  "url": "https://candle-factory-website.web.app",
  "telephone": "+886-4-7372790",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "國聖里聖安路220號",
    "addressLocality": "彰化市",
    "addressRegion": "彰化縣",
    "postalCode": "500",
    "addressCountry": "TW"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 24.089714,
    "longitude": 120.572414
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "priceRange": "$"
}
```

### 10.5 業主確認資訊（已確認）

| 項目 | 狀態 | 內容 |
|------|------|------|
| 公司英文名稱 | ✅ 已確認 | **Chong Guang**（重光漢語拼音，詳見附錄 C） |
| 公司一句話介紹（slogan） | ✅ 已生成 | 3 個選項，詳見附錄 A |
| 電子郵件 | ✅ 已確認 | 不放 |
| 營業時間 | ✅ 已確認 | **週一至週五 09:00 – 18:00**（週六、日公休） |
| 社群媒體連結 | ✅ 已確認 | 暫不放 |
| Google Maps 嵌入 | ✅ 已確認 | 保留現有嵌入 |
| 隱私權政策頁面 | ✅ 已確認 | **啟用 GA4，需做隱私權政策頁（詳見 §18）** |
| 產品文本擴充 | ✅ 已確認 | 由計畫生成，詳見附錄 B |

---

## 11. 部署設定

### 11.1 `firebase.json` 調整

```diff
  {
    "hosting": {
-     "public": "public",
+     "public": ".output/public",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "headers": [
        ... (快取策略不動)
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  }
```

### 11.2 `.gitignore` 新增項目

```
# Nuxt
.nuxt/
.output/
node_modules/
.data/

# Build
dist/

# pnpm
.pnpm-store/
```

### 11.3 `package.json` 部署腳本

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "build:data": "python scripts/update_products.py",
    "build:all": "npm run build:data && npm run generate",
    "deploy": "npm run build:all && firebase deploy --only hosting",
    "postinstall": "nuxt prepare"
  }
}
```

### 11.4 新部署流程

```bash
# 更新產品資料
python scripts/update_products.py   # 或 pnpm build:data

# 本地預覽
pnpm dev                              # 開發模式
pnpm generate && pnpm preview         # 生產模式預覽

# 部署
pnpm deploy
```

---

## 12. 執行階段（Phases）

> 各階段皆可獨立 commit、各自可驗證。建議開一個 `nuxt-migration` 分支進行。

### Phase 0：準備（風險：低）

- [ ] 建立 git branch `nuxt-migration`
- [ ] 初始化 Nuxt 3 專案於現有 repo（注意：不覆蓋現有檔案）
  - 策略：建立 Nuxt 檔案於各自目錄，暫時保留 `public/*.html` 和 `public/javascripts/` 直到 Phase 6
- [ ] 安裝必要套件：`nuxt`, `typescript`, `@nuxtjs/seo`, `@nuxt/image`, `@vueuse/nuxt`
- [ ] 建立 `app.vue`、`nuxt.config.ts`、`tsconfig.json`
- [ ] 驗證：`pnpm dev` 能跑出空白頁面

### Phase 1：資料層與型別

- [ ] 修改 `scripts/update_products.py`，輸出路徑改為 `assets/data/products.json`
- [ ] 執行腳本驗證 JSON 正確
- [ ] 建立 `composables/useProducts.ts` 與 TypeScript 型別
- [ ] 建立 `utils/slug.ts`
- [ ] 驗證：在 `app.vue` 暫時列出所有產品名稱可正常顯示

### Phase 2：CSS 搬移與字體

- [ ] 複製 `public/css/*.css` 至 `assets/css/*.css`
- [ ] 在 `nuxt.config.ts` 全域引入所有 CSS
- [ ] 建立 `layouts/default.vue` 空殼（只有 `<slot/>`）
- [ ] 驗證：CSS 生效，頁面背景為紅色 rgb(105,3,3)

### Phase 3：Layout + Header + 新頁尾

- [ ] `components/layout/TopHeader.vue`（不含隱藏選單邏輯）
- [ ] `components/layout/SiteFooter.vue`（現代化版本）
  - [ ] 品牌區塊
  - [ ] 網站導覽
  - [ ] 聯絡資訊（click-to-call）
  - [ ] Google 地圖
  - [ ] 底部版權
  - [ ] LocalBusiness JSON-LD
- [ ] `layouts/default.vue` 組合 Header + slot + Footer
- [ ] 驗證：一個空白頁面能看到完整頁首頁尾，響應式正常

### Phase 4：首頁基本結構（先不含動畫）

- [ ] `pages/index.vue`
- [ ] `components/home/MainImageHero.vue`
- [ ] `components/home/CompanyNameSpacer.vue`
- [ ] `components/home/ImageWall.vue`（含輪播邏輯，用 CSS transition）
- [ ] `components/home/CategoryButtons.vue`
- [ ] `components/home/CategoryIntro.vue`
- [ ] `components/home/ProductCardList.vue`
- [ ] `components/home/ProductCard.vue`
- [ ] `composables/useCategoryState.ts`
- [ ] 驗證：首頁完整可用，分類切換、產品卡展開都正常

### Phase 5：其他頁面

- [ ] `pages/intro.vue`（工廠介紹）
- [ ] `pages/contact.vue`（聯絡我們）
- [ ] `pages/products/[slug].vue`（產品詳細頁）
- [ ] 在 `nuxt.config.ts` 加入產品頁 prerender hook
- [ ] 驗證：所有頁面可訪問、產品詳細頁有對應資料

### Phase 6：隱藏選單 + 特效

- [ ] `components/layout/HiddenMenu.vue`（完整功能）
- [ ] `components/effects/FlickeringCanvas.vue`（ClientOnly）
- [ ] `components/effects/DecoDiamond.vue`（ClientOnly）
- [ ] 驗證：特效正常播放、不影響 SSR 輸出

### Phase 7：SEO 強化

- [ ] 每頁 `useSeoMeta` 設定
- [ ] 產品頁的 `ProductStructuredData` 組件（JSON-LD）
- [ ] sitemap.xml 自動生成驗證
- [ ] robots.txt 驗證
- [ ] Open Graph 圖片驗證（用 Facebook 分享除錯工具）
- [ ] 用 Google 的 Rich Results Test 驗證結構化資料
- [ ] 驗證：所有 meta 正確、爬蟲可見完整內容

### Phase 8：清理與部署

- [ ] 刪除 `public/*.html`、`public/css/`、`public/javascripts/`
- [ ] 保留 `public/image/*`、`public/favicon*`、`public/site.webmanifest`
- [ ] 刪除 `public/product_infoCard.json`（已搬至 `assets/data/`）
- [ ] 更新 `firebase.json`：`public: ".output/public"`
- [ ] 更新 `.gitignore` 加入 Nuxt 相關忽略
- [ ] 更新 `README.md` 說明新流程
- [ ] `pnpm generate && firebase deploy --only hosting`
- [ ] 線上驗證：
  - [ ] 所有頁面可訪問
  - [ ] 響應式正常
  - [ ] Lighthouse 分數（SEO / Performance / Accessibility / Best Practices 各 > 90）
  - [ ] 產品資料正確
  - [ ] 快取標頭生效

### Phase 9：Merge

- [ ] PR: `nuxt-migration` → `main`
- [ ] 本地最終驗證
- [ ] Merge

---

## 13. 驗證清單（Acceptance Criteria）

完成後必須通過：

### 功能正確性
- [ ] 首頁可顯示形象圖、標語、照片牆、分類按鈕、產品介紹、產品卡
- [ ] 5 個分類按鈕切換正確
- [ ] 產品卡點擊展開正確
- [ ] 隱藏選單可開關、產品列表正確
- [ ] 工廠介紹頁顯示完整內容
- [ ] 聯絡我們頁顯示完整內容
- [ ] 每個產品有獨立頁面可訪問
- [ ] 頁尾所有連結可點擊（包含 `tel:`、Google Maps）
- [ ] 404 頁面正確

### 響應式
- [ ] 桌機版（>1200px）正常
- [ ] 平板版（800–1200px）正常
- [ ] 手機版（<500px）正常

### SEO
- [ ] 每頁有獨立的 `<title>` 與 `<meta description>`
- [ ] 每頁有 Open Graph meta
- [ ] 產品頁有 Product JSON-LD
- [ ] 全站有 LocalBusiness JSON-LD
- [ ] `/sitemap.xml` 可訪問且包含所有頁面
- [ ] `/robots.txt` 可訪問
- [ ] HTML 源碼中可見完整產品資訊（禁用 JS 也能看到）
- [ ] Google Rich Results Test 通過

### 效能
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse SEO > 95
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] 首屏載入 < 2 秒

### 部署
- [ ] Firebase Hosting 部署成功
- [ ] 快取標頭與現狀一致
- [ ] `.output/public` 產出正確

---

## 14. 風險與緩解

| 風險 | 機率 | 影響 | 緩解策略 |
|------|------|------|---------|
| CSS 在 Nuxt 全域引入後樣式衝突 | 中 | 中 | 先不動 CSS，全域引入；若出問題再切為 scoped |
| 現有 JS 輪播動畫移植後行為不同 | 中 | 低 | 先用 CSS transition 實作；若不理想再改 Vue Transition |
| Canvas 動畫在 SSG 時報錯 | 低 | 中 | 全程用 `<ClientOnly>` 包裝 |
| 中文 slug 產生的 URL 編碼問題 | 低 | 中 | 使用 `encodeURIComponent`，或改用羅馬拼音 slug 映射表 |
| Prerender 產品頁數量多導致 build 慢 | 低 | 低 | 僅 15 個產品，不會是問題 |
| Firebase Hosting 對 SPA rewrites 與 SSG 路由衝突 | 中 | 中 | 移除現有 `rewrites` 到 `/index.html`，改成針對 404 的 fallback |
| Google Fonts Early Access 服務未來可能停止 | 低 | 中 | 改用自行託管字體檔案 |
| 遷移中途需要緊急修改正式站 | 中 | 中 | `main` 分支隨時保持可部署，`nuxt-migration` 分支獨立作業 |

---

## 15. 回滾計畫（Rollback）

若 Nuxt 版上線後出現嚴重問題：

1. 切回 `main` 分支
2. 執行 `firebase deploy --only hosting`（用舊的純 HTML 版本）
3. 線上即刻回到原始版本

因為 Firebase Hosting 支援版本歷史，也可以直接在 Firebase Console 一鍵 rollback 到前一版 release。

---

## 16. 執行前業主確認（已完成）

| # | 項目 | 狀態 | 結論 |
|---|------|------|------|
| 1 | 頁尾公司介紹文案 | ✅ | 由計畫生成 3 個選項（附錄 A），擇一使用 |
| 2 | 營業時間 | ✅ | 週一至週五 09:00 – 18:00（週六、日公休） |
| 3 | 是否開啟 Google Analytics | ✅ | **啟用**，並需做隱私權政策頁 |
| 4 | 電子郵件 | ✅ | 不放 |
| 5 | 社群媒體 | ✅ | 不放 |
| 6 | 公司英文名 | ✅ | **Chong Guang**（漢語拼音，詳附錄 C） |
| 7 | 每個產品一頁 | ✅ | **同意**，並擴充文本（附錄 B） |
| 8 | 首頁 SEO 關鍵字 | ✅ | 彰化、傳統蠟燭、蠟燭、斗燭、祭祀、拜拜 + 衍生字詞 |

**所有先決條件已就緒，待業主最終審核計畫後即可進入 Phase 0。**

---

## 17. 後續可能擴展（本計畫不做）

留作備忘，未來若需要時可評估：

- 部落格 / 文章系統（用 `@nuxt/content`）
- 產品搜尋與過濾
- 線上詢價表單（搭配 Firebase Functions 或第三方表單服務）
- 多語系（英文版本）
- PWA 支援
- 深色模式
- 3D 商品預覽（Three.js）

---

## 18. 參考資源

- Nuxt 3 文件：https://nuxt.com
- `@nuxtjs/seo`：https://nuxtseo.com
- `@nuxt/image`：https://image.nuxt.com
- schema.org Product：https://schema.org/Product
- schema.org LocalBusiness：https://schema.org/LocalBusiness
- Google Rich Results Test：https://search.google.com/test/rich-results
- Lighthouse：https://pagespeed.web.dev

---

---

## 18. 隱私權政策頁面設計

因本站啟用 Google Analytics 4，需明確告知訪客個資收集範圍與用途。以下為頁面規劃。

### 18.1 頁面位置與結構

- 路由：`/privacy`
- 頁面標題：`隱私權政策 | 重光企業社`
- 導覽位置：頁尾底部列（與版權聲明同一行）
- 樣式：保持與其他頁面一致（白色卡片、宋體）

### 18.2 內容大綱（草稿）

```
# 隱私權政策

重光企業社（以下稱「本網站」）重視您的個人隱私。以下說明本網站蒐集、
使用與保護訪客資訊的方式。

## 一、本網站蒐集的資訊

本網站為純展示性網站，不提供會員註冊、線上購物或意見留言等功能。
我們僅透過 Google Analytics 4 蒐集以下非個人身分識別資訊，用於了解
網站使用狀況與改善內容：

- 瀏覽器類型與版本
- 作業系統
- 造訪的頁面與停留時間
- 來訪時間
- 來源網址（Referrer）
- 概略地理位置（國家／城市層級，不會追蹤精確位置）
- 匿名化的裝置識別碼

上述資訊經 Google Analytics 匿名化處理，無法用於識別個別使用者身分。

## 二、Cookie 的使用

本網站使用 Google Analytics 所設定的 Cookie（`_ga`、`_ga_*` 系列）
以統計訪客行為。您可透過瀏覽器設定拒絕 Cookie，但這可能影響部分
功能（例如頁面瀏覽統計將不計入分析資料）。

## 三、資料的使用目的

- 了解訪客對哪些產品與分類感興趣，以優化網站內容呈現
- 分析網站流量來源，改善 SEO 與使用體驗
- 不會將資料用於廣告投放或轉售給第三方

## 四、資料分享與第三方服務

本網站使用下列第三方服務：

- **Google Analytics 4**（Google LLC）— 流量統計分析
- **Google Fonts**（Google LLC）— 字體載入
- **Google Maps**（Google LLC）— 地圖嵌入
- **Firebase Hosting**（Google LLC）— 網站託管

以上服務均由 Google 提供，其隱私權政策請參閱：
https://policies.google.com/privacy

## 五、資料保留期限

Google Analytics 預設保留訪客資料 14 個月，到期後由 Google 自動刪除。

## 六、聯絡資訊

若您對本網站的隱私權政策有任何疑問，請透過以下方式聯絡：

- 電話：04-7372790
- 地址：彰化市國聖里聖安路 220 號

## 七、政策更新

本政策可能隨時更新，修訂版本將於此頁面公告，請定期查看。

最後更新日期：2026-04-11
```

### 18.3 技術實作要點

- 頁面為純靜態 HTML，無動態內容
- 無互動需求，不需 `<ClientOnly>`
- 加入 `<meta name="robots" content="noindex, follow">` — 此頁不需被搜尋引擎收錄，但保留連結流通
- 頁面底部日期可用構建時變數動態填入

---

## 19. 附錄 A：公司介紹文案（3 選項）

供業主選擇或綜合使用。每則控制在 2~3 句、涵蓋 SEO 關鍵字（彰化、傳統、手工、蠟燭、斗燭、祭祀）。

### 選項 A：傳承型（推薦）
> 紮根彰化的傳統手工蠟燭工坊，重光企業社專製佛杯、蓮花、旺來、葫蘆與斗燭，陪伴台灣家庭走過每一次祭祀與節慶。以職人之心，為每一次祈願點亮光明。

### 選項 B：工藝型
> 重光企業社—彰化在地的手工蠟燭工廠。數十年如一日，堅持以傳統工序製作佛杯、蓮花、旺來、葫蘆、斗燭等宗教祭祀蠟燭，用每一根蠟燭承載匠人的堅持與信仰的敬意。

### 選項 C：簡潔型
> 彰化重光企業社，專業手工蠟燭與傳統斗燭製造。為拜拜、祭祀、節慶點亮光明，傳承傳統信仰文化。

### 頁尾簡短版（給頁尾品牌區塊用）
> 傳承彰化傳統蠟燭工藝，為每一次祈願點亮光明。

---

## 20. 附錄 B：15 項產品擴充文本

每個產品提供三層文本：
1. **Tagline**（30 字內）— 用於產品卡片、列表簡述
2. **Detail**（200~300 字）— 用於產品詳細頁主文
3. **Features**（3~5 個重點）— 用於產品詳細頁「商品特色」列表

所有文本刻意融入搜尋關鍵字（祭祀、拜拜、傳統、祈福等），提升 SEO。

---

### B-1. 佛杯（Type-1）

- **Tagline**：一對小巧佛杯，日常祈福與初一十五上香的經典選擇。
- **Detail**：佛杯是傳統宗教祭祀中最常見也最貼近日常的蠟燭造型。重光企業社的手工佛杯，採用經典的紅、黃兩色，造型簡潔端莊，火光溫和而持久，無論是日常早晚上香、農曆初一十五拜拜，或是神明生日、家中神桌換香，都是最實用的必備品項。每對燃燒時間約一天，容易掌握更換節奏，是神壇、寺廟、家庭佛堂的穩定供應選擇。色彩飽和、質地紮實，批發或零售均可供應。
- **Features**：
  - 紅、黃兩色經典造型，適用各類宗教儀式
  - 燃燒時間約 1 天，便於每日更換
  - 1 箱 48 對，適合廟宇、神壇大量使用
  - 彰化手工製作，品質穩定
  - 常備現貨，可批發零售

---

### B-2. 五號蓮花（Type-2）

- **Tagline**：小巧蓮花造型，佛堂拜拜與日常祈福的清雅選擇。
- **Detail**：蓮花在佛教中象徵清淨與覺悟，是供奉佛菩薩的首選造型。重光企業社的五號蓮花蠟燭為標準尺寸，紅、黃兩色可選，花瓣雕塑細膩，燃燒時火光映照蓮形，莊嚴而優雅。適合家庭佛堂、寺廟供佛、功德法會、誦經共修等場合。燃燒時間約 1.5 天，兼顧實用性與儀式感，是佛教信眾供佛拜拜的傳統經典之選。彰化在地手工製作，傳承自老師傅的工序。
- **Features**：
  - 蓮花造型，供佛、法會、誦經首選
  - 紅、黃雙色選擇
  - 燃燒時間約 1.5 天
  - 1 箱 36 對，家庭與寺廟皆適用
  - 傳統手工製作，細節精緻

---

### B-3. 2號立體蓮花（Type-2）

- **Tagline**：大型立體蓮花造型，莊嚴的供佛與法會用蠟燭。
- **Detail**：2 號立體蓮花為重光企業社的進階蓮花造型產品，尺寸較五號為大，呈現完整的立體蓮花雕塑。適合寺廟正殿、大型法會、重要祭祀活動使用。燃燒時間長達 4 天，適合需要延長供奉的場合。鮮豔黃色象徵光明與智慧，點燃後燭光柔和持久，為祭祀空間帶來肅穆莊嚴的氛圍。彰化手工製作，適合寺廟、佛堂、法會主辦單位採購。
- **Features**：
  - 立體蓮花造型，尺寸大、雕塑感強
  - 燃燒時間約 4 天，適合長時間供奉
  - 鮮豔黃色，象徵光明智慧
  - 1 箱 12 對，適合寺廟、法會
  - 正殿、法會、重大祭祀首選

---

### B-4. 5號旺來（Type-3）

- **Tagline**：小巧鳳梨造型，招財納福的日常拜拜蠟燭。
- **Detail**：「旺來」取自台語「鳳梨」諧音，象徵好運旺旺來，是台灣傳統祭祀中最受歡迎的造型之一。重光企業社的 5 號旺來為最小尺寸，造型飽滿精緻，紅色象徵喜慶與好運。適合日常拜拜、祭祖、商家開市、年節祭祀使用。燃燒時間約 1 天，方便每日替換。1 箱 48 對大容量，是神壇、店面、家庭神桌常備供品。彰化在地手工製作，價格親民，招財納福的經典選擇。
- **Features**：
  - 鳳梨造型，象徵「旺旺來」好運
  - 適合商家開市、年節、日常拜拜
  - 燃燒時間約 1 天
  - 1 箱 48 對，常備首選
  - 彰化手工製作，經典傳統

---

### B-5. 3號旺來（Type-3）

- **Tagline**：中型旺來造型，拜拜祭祀與節慶祈福的實用選擇。
- **Detail**：3 號旺來為中型尺寸，造型比 5 號更顯穩重，適合初一十五、節慶、祭祖等較為正式的場合使用。燃燒時間約 2.5 天，比小型更耐久，減少更換頻率。紅色蠟體飽滿亮麗，「旺來」寓意深植台灣民間信仰，是傳統祭祀不可或缺的吉祥造型。適合宮廟、家庭、企業採購，彰化重光手工製作，品質穩定可靠。
- **Features**：
  - 中型鳳梨造型，造型穩重
  - 燃燒時間約 2.5 天
  - 1 箱 24 對，適合節慶與定期祭祀
  - 紅色吉祥色，象徵好運
  - 傳統彰化手工製作

---

### B-6. 2號旺來(B)（Type-3）

- **Tagline**：大型旺來蠟燭，重要祭祀與節慶儀式的顯眼選擇。
- **Detail**：2 號旺來尺寸再升級，造型飽滿、氣勢莊重，是重要祭典、廟會、家族大拜拜的首選。紅色蠟體象徵福氣滿盈，造型寓意「旺旺來」，在神桌上擺放顯眼大方。燃燒時間長達 4.5 天，適合需要延長供奉的重要儀式。彰化重光企業社堅持手工製作，每一根旺來蠟燭都經過師傅仔細塑形，品質與視覺感皆有保證。
- **Features**：
  - 大型旺來造型，氣勢莊重
  - 燃燒時間約 4.5 天
  - 1 箱 12 對
  - 廟會、家族祭典首選
  - 手工塑形，品質可靠

---

### B-7. 1號旺來(B)（Type-3）

- **Tagline**：特大號旺來蠟燭，寺廟正殿與重大祭典的氣派選擇。
- **Detail**：1 號旺來為較大型的旺來蠟燭，體積壯觀、視覺震撼，是寺廟正殿、重大法會、大型祭典中代表虔誠與豐盛的供品。燃燒時間長達 7 天，適合跨日或多日的祭祀活動，不需頻繁更換。紅色飽滿亮麗，鳳梨造型線條清晰立體，擺放神桌上氣勢十足。彰化重光手工塑製，是資深信眾與寺廟長期合作的可靠選擇。
- **Features**：
  - 特大號鳳梨造型，氣勢十足
  - 燃燒時間約 7 天，跨日祭祀不用替換
  - 1 箱 6 對
  - 寺廟正殿、大型法會專用
  - 手工塑製，細節立體

---

### B-8. 10斤旺來（Type-3）

- **Tagline**：巨型 10 斤旺來蠟燭，寺廟鎮殿與重大慶典的氣派之選。
- **Detail**：10 斤旺來是重光企業社的巨型旺來蠟燭，單件重量約 10 台斤，氣勢驚人。適合寺廟鎮殿供奉、廟宇落成、神明慶典、元宵點燈等重大場合。燃燒時間長達 13 天，一次點燃即可覆蓋整個祭典週期。紅色飽滿，鳳梨造型線條立體，放置神桌或供案上象徵財源廣進、好運旺旺來。此規格為較少見的大尺寸，適合寺廟、宮廟、廟會主辦單位訂購。彰化重光手工塑製，每一根都是匠人心血之作。
- **Features**：
  - 單件約 10 台斤，極具氣勢
  - 燃燒時間長達 13 天
  - 1 箱 3 對，寺廟、廟會專用
  - 適合鎮殿、慶典、廟宇落成
  - 彰化手工塑製，工藝可觀

---

### B-9. 20斤旺來（Type-3）

- **Tagline**：頂級 20 斤超大旺來蠟燭，鎮殿等級的宗教供品。
- **Detail**：20 斤旺來是重光企業社的頂級旗艦產品，單件重量高達 20 台斤，為鎮殿等級的超大型旺來蠟燭。專為寺廟主殿、重大慶典、廟宇建醮、百年紀念等最高等級的宗教場合打造。體積壯觀、線條立體，擺放於供案氣勢凌駕一切。適合寺廟、宮廟、大型祭典主辦單位訂製。彰化重光在地手工塑製，每一根皆經過資深師傅細心雕琢，是傳統蠟燭工藝的極致展現。
- **Features**：
  - 單件約 20 台斤，鎮殿等級
  - 1 對裝，適合寺廟鎮殿
  - 建醮、慶典、百年紀念首選
  - 傳統手工塑製，工藝極致
  - 彰化在地製造，品質保證

---

### B-10. 5號葫蘆（Type-4）

- **Tagline**：小巧葫蘆造型，招福納祥的日常祭祀用蠟燭。
- **Detail**：葫蘆在民間信仰中象徵「福祿」與「招福納祥」，是道教、佛教與民間祭祀常見的吉祥造型。重光企業社的 5 號葫蘆為小型規格，造型圓潤飽滿，紅色喜氣，適合日常拜拜、農曆節氣祭祀、家庭神桌供奉。燃燒時間約 1 天，方便更換。1 箱 48 對，是神壇、家庭、宮廟的常備選擇。彰化手工製作，傳承傳統葫蘆造型的線條美感。
- **Features**：
  - 葫蘆造型，象徵福祿雙全
  - 燃燒時間約 1 天
  - 1 箱 48 對，常備首選
  - 道教、佛教、民間信仰通用
  - 彰化手工製作，線條飽滿

---

### B-11. 3號葫蘆（Type-4）

- **Tagline**：中型葫蘆蠟燭，節慶祭祀與祈福法會的實用選擇。
- **Detail**：3 號葫蘆為中型規格，造型飽滿、線條分明，是節慶拜拜與祈福法會的理想選擇。紅色象徵喜慶與福氣，擺放神桌顯得莊重大方。燃燒時間約 2.6 天，比小型更耐久，減少更換頻率，適合多日祭祀活動。此品項另備有黃色版本可預先訂購，滿足不同祭祀需求。1 箱 24 對，適合宮廟、家庭、企業團體採購。彰化重光手工製作，品質穩定。
- **Features**：
  - 中型葫蘆造型，線條分明
  - 燃燒時間約 2.6 天
  - 1 箱 24 對
  - 另有黃色版本可預訂
  - 節慶、祈福法會適用

---

### B-12. 2號葫蘆（Type-4）

- **Tagline**：大型葫蘆造型，重要祭祀與多日供奉的首選。
- **Detail**：2 號葫蘆屬大型規格，造型厚實穩重，是正式祭祀、宮廟供奉、家族大拜拜的首選。燃燒時間約 4.5 天，適合跨日祭典不需頻繁更換。紅燈昏黃之下，葫蘆燭光靜靜流轉，象徵祈求天地庇護、福祿雙全。此品項另備有黃色版本，需預先訂購。彰化重光手工塑製，每一根葫蘆蠟燭皆展現傳統工藝的厚度與美感。
- **Features**：
  - 大型葫蘆造型，穩重大氣
  - 燃燒時間約 4.5 天
  - 1 箱 12 對
  - 另有黃色版本可預訂
  - 宮廟、家族祭典首選

---

### B-13. 1號葫蘆（Type-4）

- **Tagline**：特大號葫蘆蠟燭，寺廟正殿與重大祭典的莊嚴供品。
- **Detail**：1 號葫蘆為重光葫蘆系列的最大尺寸，體積壯觀、造型莊嚴，是寺廟正殿、重大法會、建醮、神明聖誕等最高規格祭祀的供品選擇。燃燒時間長達 7 天，一次點燃即可覆蓋整個祭典週期。紅色飽滿，葫蘆線條立體，象徵「福祿萬代」、「子孫綿延」的吉祥寓意。另備有黃色版本可預先訂購。彰化重光手工塑製，為宮廟與資深信眾長期信賴的品項。
- **Features**：
  - 特大號葫蘆造型，氣勢莊嚴
  - 燃燒時間長達 7 天
  - 1 箱 6 對
  - 另有黃色版本可預訂
  - 寺廟正殿、建醮、重大法會適用

---

### B-14. 斗燭（36入）（Type-5）

- **Tagline**：36 入裝一斤斗燭，廟會祭祀與祭改法會的傳統首選。
- **Detail**：斗燭是台灣民間宗教最具代表性的祭祀蠟燭之一，形如糧斗、寓意富足，是廟會、拜斗、祭改法會、消災祈福儀式中不可或缺的供品。此規格為 36 入裝一斤斗燭，尺寸適中，適合大量使用與多人共點的場合。紅色斗燭熾熱燃燒，象徵生命中的希望與堅韌。彰化重光企業社專業製作傳統斗燭數十年，為全台宮廟、道壇、信眾提供穩定品質的斗燭供應。此品項需要訂製，歡迎來電洽詢詳細規格與交貨時程。
- **Features**：
  - 36 入裝，每斤 58 元
  - 廟會、拜斗、祭改法會專用
  - 彰化專業訂製，品質穩定
  - 支援宮廟長期供貨合作
  - 歡迎來電 04-7372790 洽詢

---

### B-15. 斗燭（24入）（Type-5）

- **Tagline**：24 入裝斗燭，重大法會與拜斗儀式的莊重選擇。
- **Detail**：24 入裝斗燭為較大規格，單支重量更足、氣勢更顯，適合重大法會、拜斗儀式、建醮、消災祭改等隆重場合。斗燭的形制源自傳統「五斗」信仰，象徵五方五斗星君的庇佑，是道教與民間信仰中祈福消災的核心供品。紅色斗燭燃燒時火光穩定、莊嚴肅穆，象徵將祈願送達神明之前。彰化重光企業社以傳統工序訂製斗燭，規格可依法會需求調整。此品項需要訂製，請來電洽詢。
- **Features**：
  - 24 入裝，每斤 58 元
  - 大型法會、拜斗、建醮首選
  - 可依法會需求訂製規格
  - 彰化專業訂製，傳承傳統工序
  - 歡迎來電 04-7372790 洽詢

---

## 21. 附錄 C：公司英文名資訊

- **英文名**：**Chong Guang**（漢語拼音）
  - 「重」：Chong（ㄔㄨㄥˊ）
  - 「光」：Guang（ㄍㄨㄤ）
- **完整英文全稱建議**：`Chong Guang Enterprise`（用於 schema.org `alternateName`）
- **其他可選音譯（備查）**：
  - Wade-Giles：Chung Kuang
  - 通用拼音：Jhongguang
- **使用位置**：
  - 頁尾品牌區塊：中英對照 `重光企業社 · Chong Guang`
  - schema.org LocalBusiness：`"alternateName": "Chong Guang Enterprise"`
  - Open Graph `og:site_name`：`重光企業社 Chong Guang`

---

**計畫版本**：v1.1
**建立日期**：2026-04-11
**最後更新**：2026-04-11（業主確認後新增隱私權政策、產品文本、英文名資訊）
**狀態**：**待業主最終審核計畫，通過後進入 Phase 0**
