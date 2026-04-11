<template>
  <div class="layout-default">
    <LayoutTopHeader />

    <!-- 頁面的容器 (原 .main-page) -->
    <div class="main-page">
      <slot />
    </div>

    <LayoutSiteFooter />
  </div>
</template>

<script setup lang="ts">
// Phase 6 會加 HiddenMenu 和 FlickeringCanvas
</script>
