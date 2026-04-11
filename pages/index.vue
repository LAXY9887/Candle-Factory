<template>
  <div>
    <div style="padding: 6vw 3vw 3vw; width: 100%; box-sizing: border-box">
      <h1 style="color: #690303; font-size: 3vw; text-align: center">Phase 3 驗證</h1>
      <p style="text-align: center; color: #666">
        頂部 header + 現代化頁尾 + 白色主容器
      </p>

      <section style="padding: 2vw 3vw">
        <h2 style="color: #690303">分類與產品</h2>
        <ul>
          <li v-for="cat in categories" :key="cat.type">
            <strong>{{ cat.name }}</strong> — {{ getProductsByType(cat.type).length }} 項
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { categories, getProductsByType } = useProducts()

useHead({
  title: '重光企業社 | 彰化傳統手工蠟燭工廠 | 斗燭・祭祀蠟燭・拜拜用品',
})
</script>
