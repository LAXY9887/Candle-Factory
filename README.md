# 重光企業社 - 蠟燭工廠網站

彰化重光企業社的形象網站，展示傳統手工蠟燭與斗燭產品。

- **線上網址**：https://candle-factory-website.web.app
- **框架**：Nuxt 3 + TypeScript（SSG 靜態生成）
- **部署平台**：Firebase Hosting
- **營運成本**：$0（維持免費方案）

---

## 技術棧

| 項目 | 使用 |
|------|------|
| 框架 | Nuxt 3 + Vue 3 + TypeScript |
| 建置 | Vite 7 + Nitro 2 |
| 模式 | `nuxt generate`（SSG，純靜態輸出） |
| 套件管理 | pnpm |
| 字體 | cwTeXFangSong（Google Fonts Early Access 宋體） |
| 部署 | Firebase Hosting |

---

## 專案結構

```
WebSiteProject_Candle/
├── Assets/                      # 原始設計素材 (.gitignore)
│   └── data/
│       └── 產品清單.csv          # 產品資料來源 (BIG5/UTF-8)
├── app.vue                      # Nuxt 根組件
├── nuxt.config.ts               # Nuxt 設定 (含 prerender routes)
├── firebase.json                # Firebase Hosting 設定 (快取 + cleanUrls)
├── data/
│   ├── products.json            # 由腳本從 CSV 生成，build time 讀取
│   └── productDetails.ts        # 產品詳細頁的擴充文本（tagline / detail / features）
├── types/
│   └── product.ts               # Category / Product TypeScript 型別
├── utils/
│   └── slug.ts                  # title ↔ ASCII slug 雙向對照
├── composables/
│   ├── useProducts.ts           # 產品資料 composable
│   ├── useCategoryState.ts      # 分類切換（URL query 驅動）
│   └── useHiddenMenu.ts         # 隱藏選單共享狀態
├── layouts/
│   └── default.vue              # 預設版面 (Header + main + Footer + HiddenMenu)
├── pages/
│   ├── index.vue                # 首頁
│   ├── intro.vue                # 工廠介紹
│   ├── contact.vue              # 聯絡我們
│   ├── privacy.vue              # 隱私權政策 (GA4 需要)
│   └── products/
│       └── [slug].vue           # 產品詳細頁 (16 個)
├── components/
│   ├── layout/
│   │   ├── TopHeader.vue
│   │   ├── SiteFooter.vue       # 現代化 4 欄頁尾 + LocalBusiness JSON-LD
│   │   └── HiddenMenu.vue
│   ├── home/
│   │   ├── MainImageHero.vue
│   │   ├── CompanyNameSpacer.vue
│   │   ├── ImageWall.vue        # 無 jQuery 的照片牆輪播
│   │   ├── CategoryButtons.vue
│   │   ├── CategoryIntro.vue
│   │   ├── ProductCardList.vue
│   │   └── ProductCard.vue      # 整張卡 = NuxtLink → 詳細頁
│   └── effects/
│       ├── FlickeringCanvas.vue  # 開場動畫 (暫時停用)
│       └── DecoDiamond.vue
├── public/                      # Nuxt 靜態資源（直接複製到輸出）
│   ├── image/                   # 41 張產品與設計圖
│   ├── favicon*                 # Favicon 套組
│   ├── site.webmanifest
│   └── robots.txt
├── server/
│   └── routes/
│       └── sitemap.xml.ts       # 動態生成 sitemap.xml (prerender 時烘焙為靜態)
├── styles/                      # 11 個 CSS 檔（全域引入於 nuxt.config.ts）
├── scripts/
│   └── update_products.py       # CSV → JSON 更新腳本
├── plans/
│   └── nuxt-migration-plan.md   # 遷移計畫文件 v1.1
├── legacy/
│   └── public/                  # 舊版靜態檔案（保留參考）
└── package.json
```

---

## 產品資料管理流程

```
Assets/data/產品清單.csv
        │
        │  python scripts/update_products.py
        ▼
data/products.json              ← categories (5) + products (16)
        │
        │  nuxt generate (build time import)
        ▼
.output/public/                  ← 靜態 HTML (含完整產品資訊)
        │
        │  firebase deploy --only hosting
        ▼
線上網站
```

### CSV 欄位

`Assets/data/產品清單.csv`

| 欄位 | 說明 | 範例 |
|------|------|------|
| 編號 | 流水號 | 1 |
| 商品名稱 | 品名 | 10斤旺來 |
| 分類 | 產品分類 | 旺來 |
| 類型代碼 | 內部代碼 | Type-3 |
| 每箱包裝規格 | 每箱入數 | 3對入 |
| 每箱價格 | 整箱價格 | 1400 |
| 單個零售價 | 零售價 | 500 |
| 圖片路徑 | 相對 public/ | image/10 pineapple info.jpg |
| 敘述 | 簡短說明 | 青磚白瓦間... |
| 備註 | 額外備註 | - |

### 更新產品資訊

```bash
# 1. 編輯 CSV（可用 Excel / VSCode）
# 2. 執行腳本生成 JSON
python scripts/update_products.py

# 3. 部署
pnpm deploy
```

### 分類介紹與產品詳細文本

- **分類介紹** (5 個分類的文字 + 圖)：存在 `data/products.json` 的 `categories` 區段，Python 腳本不會覆寫
- **產品詳細頁文本** (tagline / detail / features)：存在 `data/productDetails.ts`，key 為產品 title

修改這兩者請直接編輯對應檔案。

---

## 開發與部署

### 前置需求

- Node.js 18+
- pnpm 10+
- Python 3（跑 CSV 轉換腳本用）
- Firebase CLI（部署用）

### 安裝

```bash
pnpm install
```

### 常用指令

```bash
# 開發伺服器（hot reload）
pnpm dev

# 從 CSV 重新生成 products.json
pnpm build:data

# 靜態生成（輸出到 .output/public）
pnpm generate

# 本地預覽生成結果
firebase serve --only hosting

# 完整部署流程（CSV → JSON → generate → deploy）
pnpm deploy
```

---

## 部署

### 檢查狀態

```bash
firebase login:list          # 確認登入帳號
firebase projects:list       # 確認專案 candle-factory-website (current)
```

### 手動部署

```bash
# 更新產品資料
python scripts/update_products.py

# 生成靜態檔
pnpm generate

# 部署
firebase deploy --only hosting
```

### 一鍵部署

```bash
pnpm deploy
```

---

## 快取策略

`firebase.json` 中設定：

| 檔案類型 | Cache-Control | 說明 |
|---------|--------------|------|
| `*.html` `*.json` `*.js` `*.css` | `no-cache` | 每次向伺服器確認版本（304 仍可重用） |
| `*.jpg` `*.png` `*.gif` `*.ico` `*.webp` | `max-age=604800` | 圖片 7 天 |
| `/_nuxt/**` | `max-age=31536000, immutable` | Nuxt 產出的檔名含 hash，可永久快取 |

這樣使用者不需手動清快取就能看到最新版。

---

## SEO 規劃

| 項目 | 實作 |
|------|------|
| 每頁獨立 title / description | `useSeoMeta()` |
| Open Graph 標籤 | `useSeoMeta()` |
| LocalBusiness JSON-LD | `components/layout/SiteFooter.vue`（全站） |
| Product JSON-LD | `pages/products/[slug].vue`（每個產品） |
| sitemap.xml | `server/routes/sitemap.xml.ts`（build time 烘焙） |
| robots.txt | `public/robots.txt` |
| 關鍵字策略 | 彰化 / 傳統蠟燭 / 斗燭 / 祭祀 / 拜拜 / 手工蠟燭 / 重光企業社 |
| 每個產品獨立頁面 | `/products/[ascii-slug]` |

---

## 注意事項

### ASCII Slug

Nuxt 3.21 / Nitro 2.13 prerender crawler 對中文字元動態路由有 bug，所以產品 URL 採用拼音 ASCII slug（例如 `10斤旺來` → `10jin-wanglai`）。對照表在 `utils/slug.ts` 與 `nuxt.config.ts`，**修改任一邊時兩邊都要同步**。

### JSON-LD 必須用 useHead

Vue SSR 會剝除 `<template>` 中 `<script>` 標籤的內容。JSON-LD 務必透過 `useHead({ script: [{ innerHTML: ..., tagPosition: 'bodyClose' }] })` 注入。

### 大小寫敏感性

Windows 檔系統大小寫不敏感，`Assets/`（原始素材）與 Nuxt 慣例的 `assets/` 會衝突，所以產品資料目錄改為 `data/` 放在根目錄。

---

## 聯絡資訊

- 公司：重光企業社 · Chong Guang
- 地址：彰化市國聖里聖安路 220 號
- 電話(公司)：04-7372790
- 電話(住家)：04-7279724
- 營業時間：週一至週五 09:00 – 18:00
