<template>
  <div class="main-page">
    <h1 style="padding: 2rem; color: #690303">重光企業社</h1>
    <p style="padding: 0 2rem">
      Phase 2 驗證：CSS 已載入<br>
      背景應為深紅 <code>rgb(105, 3, 3)</code>，主容器應為白色圓角卡片，字體應為宋體 <code>cwTeXFangSong</code>。
    </p>

    <section style="padding: 1rem 2rem 2rem">
      <h2 style="color: #690303">分類數量：{{ categories.length }} / 產品數量：{{ products.length }}</h2>
      <ul>
        <li v-for="cat in categories" :key="cat.type">
          <strong>{{ cat.name }}</strong> — {{ getProductsByType(cat.type).length }} 項產品
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const { categories, products, getProductsByType } = useProducts()

useHead({
  title: '重光企業社 | 彰化傳統手工蠟燭工廠 | 斗燭・祭祀蠟燭・拜拜用品',
})
</script>
