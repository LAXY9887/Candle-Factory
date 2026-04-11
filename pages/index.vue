<template>
  <div class="home-placeholder">
    <h1>重光企業社</h1>
    <p class="tagline">彰化 · 傳統蠟燭 · 斗燭 · 祭祀 · 拜拜</p>

    <section class="debug-section">
      <h2>Phase 1 驗證：資料層</h2>
      <p>分類數量：{{ categories.length }}</p>
      <p>產品數量：{{ products.length }}</p>

      <h3>分類清單</h3>
      <ul>
        <li v-for="cat in categories" :key="cat.type">
          <strong>{{ cat.name }}</strong> ({{ cat.type }}) —
          {{ getProductsByType(cat.type).length }} 項產品
        </li>
      </ul>

      <h3>產品清單（前 5 項）</h3>
      <ul>
        <li v-for="product in products.slice(0, 5)" :key="product.title">
          <strong>{{ product.title }}</strong>
          ({{ product.category }}) — {{ product.price }}
        </li>
      </ul>

      <h3>Slug 範例</h3>
      <ul>
        <li v-for="slug in getAllProductSlugs().slice(0, 3)" :key="slug">
          {{ slug }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const { categories, products, getProductsByType, getAllProductSlugs } = useProducts()

useHead({
  title: '重光企業社 | 彰化傳統手工蠟燭工廠 | 斗燭・祭祀蠟燭・拜拜用品',
})
</script>

<style scoped>
.home-placeholder {
  padding: 2rem;
  font-family: sans-serif;
  background: #fff;
  color: #333;
  min-height: 100vh;
}
h1 {
  color: #690303;
}
.tagline {
  color: #888;
  font-style: italic;
}
.debug-section {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px dashed #ccc;
  border-radius: 8px;
}
h2 {
  color: #690303;
  margin-top: 0;
}
h3 {
  color: #690303;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
ul {
  margin: 0;
  padding-left: 1.5rem;
}
li {
  margin: 0.25rem 0;
}
</style>
