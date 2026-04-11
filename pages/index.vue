<template>
  <div class="home-placeholder">
    <h1>重光企業社</h1>
    <p>Nuxt 3 SSG 骨架已就緒 - Phase 0 完成</p>
    <p>彰化 · 傳統蠟燭 · 斗燭 · 祭祀 · 拜拜</p>
    <ul>
      <li>Phase 1: 資料層與型別</li>
      <li>Phase 2: CSS 搬移</li>
      <li>Phase 3: Layout + Header + 現代化頁尾</li>
      <li>Phase 4: 首頁完整內容</li>
      <li>Phase 5: 其他頁面 + 產品詳細頁</li>
      <li>Phase 6: 隱藏選單 + 特效</li>
      <li>Phase 7: SEO 強化</li>
      <li>Phase 8: 部署驗證</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
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
}
h1 {
  color: #690303;
}
</style>
