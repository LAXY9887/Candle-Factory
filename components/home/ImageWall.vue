<template>
  <div class="image-wall-wraper">
    <div class="imageWall-container">
      <!-- 切換按鈕 -->
      <button
        class="changeImageBTN"
        style="right: 0"
        aria-label="下一張"
        type="button"
        @click="switchImage('right')"
      ></button>
      <button
        class="changeImageBTN"
        style="left: 0"
        aria-label="上一張"
        type="button"
        @click="switchImage('left')"
      ></button>

      <!-- 圖片（使用 Vue 的 transition） -->
      <img
        v-for="(img, i) in images"
        :key="img"
        class="wall-image"
        :src="img"
        :alt="`照片牆 ${i + 1}`"
        :style="{ opacity: i === currentIndex ? 1 : 0, transition: 'opacity 0.8s ease' }"
      >

      <!-- 點點指示器 -->
      <div class="image-wall-dot-container">
        <div
          v-for="(_, i) in images"
          :key="`dot-${i}`"
          class="image-wall-dot"
        ></div>
      </div>

      <div class="image-wall-dot-moving-track">
        <div
          v-for="(_, i) in images"
          :key="`moving-${i}`"
          class="image-wall-moving-dot"
          :style="{ opacity: i === currentIndex ? 1 : 0 }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const images = [
  '/image/image wall/image wall 1.jpg',
  '/image/image wall/image wall 2.jpg',
  '/image/image wall/image wall 3.jpg',
  '/image/image wall/image wall 4.jpg',
  '/image/image wall/image wall 5.jpg',
]

const currentIndex = ref(0)
const autoRenderTime = 15000
let intervalId: ReturnType<typeof setInterval> | null = null

const switchImage = (direction: 'left' | 'right') => {
  if (direction === 'right') {
    currentIndex.value = (currentIndex.value + 1) % images.length
  } else {
    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
  }
}

onMounted(() => {
  intervalId = setInterval(() => switchImage('right'), autoRenderTime)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
