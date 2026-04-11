<template>
  <div class="layout-default">
    <LayoutTopHeader />

    <!-- 頁面主容器 (原 .main-page) -->
    <div class="main-page">
      <slot />
    </div>

    <LayoutSiteFooter />

    <!-- 右側隱藏選單 -->
    <LayoutHiddenMenu />
  </div>
</template>

<script setup lang="ts">
// body 是 display:flex / flex-direction:column / align-items:center
// .layout-default 需要 100% 寬度讓內部元素能正確伸展，
// 否則 .main-page (90%) 和 footer (100%) 會收斂到 auto 寬度
</script>

<style>
.layout-default {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
</style>
