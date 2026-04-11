<template>
  <div v-if="product" class="product-detail">
    <!-- 麵包屑 -->
    <nav class="breadcrumb" aria-label="麵包屑導覽">
      <NuxtLink to="/">首頁</NuxtLink>
      <span class="sep">›</span>
      <NuxtLink :to="`/?category=${product.type}`">{{ product.category }}</NuxtLink>
      <span class="sep">›</span>
      <span>{{ product.title }}</span>
    </nav>

    <div class="product-detail-grid">
      <!-- 圖 -->
      <div class="product-detail-image">
        <img :src="`/${product.image}`" :alt="product.title">
      </div>

      <!-- 資訊 -->
      <div class="product-detail-info">
        <h1 class="product-detail-title">{{ product.title }}</h1>
        <p v-if="detail" class="product-tagline">{{ detail.tagline }}</p>

        <div class="product-meta">
          <div class="meta-row">
            <span class="meta-label">分類</span>
            <NuxtLink :to="`/?category=${product.type}`" class="meta-value">
              {{ product.category }}
            </NuxtLink>
          </div>
          <div class="meta-row">
            <span class="meta-label">規格與價格</span>
            <span class="meta-value">{{ product.price }}</span>
          </div>
        </div>

        <h2 class="section-title">商品特色</h2>
        <ul v-if="detail" class="features-list">
          <li v-for="(feat, i) in detail.features" :key="i">{{ feat }}</li>
        </ul>

        <div class="cta">
          <a href="tel:+886-4-7372790" class="cta-button">
            📞 來電洽詢 04-7372790
          </a>
          <NuxtLink to="/contact" class="cta-button cta-secondary">
            查看聯絡資訊
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 詳細介紹 -->
    <section v-if="detail" class="product-description">
      <h2 class="section-title">商品介紹</h2>
      <p>{{ detail.detail }}</p>
    </section>

    <!-- 回到列表 -->
    <div class="back-link">
      <NuxtLink :to="`/?category=${product.type}`">
        ← 回到{{ product.category }}列表
      </NuxtLink>
    </div>
  </div>

  <div v-else class="not-found">
    <h1>找不到這項產品</h1>
    <NuxtLink to="/">回到首頁</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { productDetails } from '~/data/productDetails'

const route = useRoute()
const { getProductBySlug } = useProducts()

const slug = computed(() => route.params.slug as string)
const product = computed(() => getProductBySlug(slug.value))
const detail = computed(() =>
  product.value ? productDetails[product.value.title] : undefined,
)

const siteUrl = 'https://candle-factory-website.web.app'

// SEO meta
useSeoMeta({
  title: () =>
    product.value
      ? `${product.value.title} - 重光企業社 | 彰化傳統手工蠟燭・斗燭`
      : '產品 - 重光企業社',
  description: () => detail.value?.tagline ?? product.value?.description ?? '',
  ogTitle: () =>
    product.value ? `${product.value.title} - 重光企業社` : '',
  ogDescription: () =>
    detail.value?.tagline ?? product.value?.description ?? '',
  ogImage: () =>
    product.value ? `${siteUrl}/${product.value.image}` : '',
  ogUrl: () => `${siteUrl}/products/${slug.value}`,
  twitterCard: 'summary_large_image',
})

// Product JSON-LD 透過 useHead 注入
const productJsonLd = computed(() => {
  const p = product.value
  const d = detail.value
  if (!p) return ''

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: d?.detail ?? p.description,
    image: `${siteUrl}/${p.image}`,
    category: p.category,
    brand: {
      '@type': 'Brand',
      name: '重光企業社 Chong Guang',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/products/${slug.value}`,
      seller: {
        '@type': 'LocalBusiness',
        name: '重光企業社',
      },
    },
  })
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => productJsonLd.value,
      tagPosition: 'bodyClose',
    },
  ],
})
</script>

<style scoped>
.product-detail {
  width: 100%;
  padding: 3vw 5vw 4vw;
  box-sizing: border-box;
}

.breadcrumb {
  font-size: 1.2vw;
  color: #666;
  margin-bottom: 2vw;
}
.breadcrumb a {
  color: rgb(105, 3, 3);
}
.breadcrumb a:hover {
  text-decoration: underline;
}
.breadcrumb .sep {
  margin: 0 0.5vw;
  color: #ccc;
}

.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 4vw;
  align-items: start;
  margin-bottom: 4vw;
}

.product-detail-image img {
  width: 100%;
  height: auto;
  border-radius: 1vw;
  box-shadow: 0 0.3vw 1.5vw rgba(0, 0, 0, 0.15);
}

.product-detail-title {
  font-size: 3vw;
  color: rgb(105, 3, 3);
  margin: 0 0 1vw;
  font-weight: bold;
}

.product-tagline {
  font-size: 1.5vw;
  color: #555;
  margin: 0 0 2vw;
  line-height: 1.6;
}

.product-meta {
  margin-bottom: 2vw;
  padding: 1.5vw;
  background: rgba(105, 3, 3, 0.05);
  border-left: 0.3vw solid rgb(105, 3, 3);
  border-radius: 0.5vw;
}

.meta-row {
  display: flex;
  gap: 1vw;
  margin-bottom: 0.8vw;
  font-size: 1.3vw;
}
.meta-row:last-child { margin-bottom: 0; }

.meta-label {
  color: #888;
  width: 8vw;
  flex-shrink: 0;
}

.meta-value {
  color: #333;
  font-weight: 500;
}

.section-title {
  font-size: 2vw;
  color: rgb(105, 3, 3);
  margin: 2vw 0 1vw;
  padding-bottom: 0.6vw;
  border-bottom: 0.15vw solid rgb(105, 3, 3);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.features-list li {
  font-size: 1.3vw;
  padding: 0.6vw 0 0.6vw 2vw;
  position: relative;
}
.features-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: rgb(171, 26, 26);
  font-weight: bold;
}

.cta {
  display: flex;
  gap: 1vw;
  margin-top: 2.5vw;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  padding: 0.8vw 1.8vw;
  background: rgb(171, 26, 26);
  color: white !important;
  border-radius: 0.5vw;
  font-size: 1.3vw;
  font-weight: bold;
  transition: all 0.2s;
  text-align: center;
}
.cta-button:hover {
  background: rgb(105, 3, 3);
}
.cta-button.cta-secondary {
  background: white;
  color: rgb(171, 26, 26) !important;
  border: 0.15vw solid rgb(171, 26, 26);
}
.cta-button.cta-secondary:hover {
  background: rgb(171, 26, 26);
  color: white !important;
}

.product-description {
  padding: 2vw;
  background: #faf5f5;
  border-radius: 1vw;
  margin-bottom: 3vw;
}
.product-description p {
  font-size: 1.3vw;
  line-height: 2;
  color: #333;
  margin: 0;
}

.back-link {
  margin-top: 2vw;
  padding-top: 2vw;
  border-top: 1px solid #eee;
  font-size: 1.3vw;
}
.back-link a {
  color: rgb(105, 3, 3);
}
.back-link a:hover {
  text-decoration: underline;
}

.not-found {
  padding: 5vw;
  text-align: center;
}

/* 響應式 */
@media screen and (max-width: 1000px) {
  .product-detail-grid {
    grid-template-columns: 1fr;
    gap: 5vw;
  }
  .product-detail-title { font-size: 5vw; }
  .product-tagline { font-size: 2.8vw; }
  .meta-row { font-size: 2.5vw; }
  .meta-label { width: 18vw; }
  .section-title { font-size: 4vw; }
  .features-list li { font-size: 2.8vw; padding-left: 4vw; }
  .cta-button { font-size: 3vw; padding: 2vw 4vw; }
  .product-description p { font-size: 2.8vw; }
  .breadcrumb { font-size: 2.5vw; }
  .back-link { font-size: 2.8vw; }
}
</style>
