<template>
  <div>
    <!-- 1. 首頁形象圖 + 標語 -->
    <HomeMainImageHero />

    <!-- 2. 企業名稱 + 分隔線 -->
    <HomeCompanyNameSpacer />

    <!-- 3. 照片牆 -->
    <HomeImageWall />

    <!-- 4. 產品專區 -->
    <div class="product-section">
      <!-- 標題 -->
      <h2 id="targetElement" class="product-section-title">產品專區</h2>

      <!-- 分隔線 -->
      <hr class="product-section-line">

      <!-- 分類按鈕 -->
      <HomeCategoryButtons
        :current-type="currentType"
        @change="(t) => (currentType = t)"
      />

      <!-- 分隔線 -->
      <hr class="product-section-line">

      <!-- 分類介紹區塊 -->
      <HomeCategoryIntro :current-type="currentType" />

      <!-- 產品資訊卡列表 -->
      <HomeProductCardList :current-type="currentType" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { currentType } = useCategoryState('Type-3')

useSeoMeta({
  title: '重光企業社 | 彰化傳統手工蠟燭工廠 | 斗燭・祭祀蠟燭・拜拜用品',
  description:
    '彰化重光企業社，專業手工蠟燭與傳統斗燭製造工廠。供應佛杯、蓮花、旺來、葫蘆、斗燭等宗教祭祀拜拜用蠟燭，批發零售皆可。傳承傳統工藝，為每一次祈願點亮光明。',
  ogTitle: '重光企業社 - 彰化傳統手工蠟燭工廠',
  ogDescription:
    '彰化在地手工蠟燭工坊，專製傳統斗燭、佛杯、蓮花、旺來、葫蘆蠟燭，祭祀拜拜首選。',
  ogImage: 'https://candle-factory-website.web.app/image/main image large.png',
  twitterCard: 'summary_large_image',
})
</script>
