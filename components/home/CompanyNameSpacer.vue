<template>
  <div class="company-name-spacer">
    <div class="company-name">
      <h1>&nbsp;重光企業社</h1>

      <!-- 裝飾線條 -->
      <div class="decoration-container">
        <div class="decoration-container-line">
          <hr>
        </div>
        <div class="decoration-container-dot">
          <!-- Phase 6: DecoDiamond.vue (client-only canvas) -->
          <canvas id="deco-diamond"></canvas>
        </div>
        <div class="decoration-container-line">
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Phase 6 會加入 canvas 菱形繪製邏輯
</script>

<style scoped>
/* h1 覆蓋預設 margin，讓原 CSS 的 .company-name span 規則生效 */
.company-name h1 {
  font-size: 6vw;
  font-weight: 900;
  letter-spacing: 10vw;
  margin-bottom: 2vw;
  margin-top: 0;
  white-space: nowrap;
}
</style>
