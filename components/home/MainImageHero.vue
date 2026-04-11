<template>
  <div class="main-image-container">
    <!-- 形象圖 -->
    <div class="main-image-figure">
      <img src="/image/main image large.png" alt="重光企業社形象圖 - 彰化傳統手工蠟燭工廠">
    </div>

    <!-- 標語容器 -->
    <div class="slogan-container">
      <!-- 標語旁圖(左) -->
      <div class="slogan-image">
        <img src="/image/candle sprite1.png" alt="">
      </div>

      <!-- 標語 -->
      <h2 class="slogan-text">
        <span><span class="emphesize-text">重</span>燭烈焰薪不滅</span>
        <br>
        <span><span class="emphesize-text">光</span>射四方暖萬家</span>
      </h2>

      <!-- 標語旁圖(右) -->
      <div class="slogan-image">
        <img src="/image/candle sprite2.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 純展示組件
</script>

<style scoped>
/* 覆蓋原 CSS 中 slogan-text 的 h2 預設 margin */
.slogan-text {
  margin: 0;
  font-weight: normal;
}
</style>
