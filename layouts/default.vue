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
// Phase 6: layout 現在包含 HiddenMenu
// Phase 6 沒把 FlickeringCanvas 放 layout 是因為它只應該在首頁出現
</script>
