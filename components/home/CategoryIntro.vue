<template>
  <div
    v-for="cat in categories"
    :key="cat.type"
    class="product-intro-container"
    :style="{ display: cat.type === currentType ? 'flex' : 'none' }"
  >
    <div class="product-intro-context">
      <!-- 圖 -->
      <div class="product-intro-figure">
        <img :src="`/${cat.image}`" :alt="`${cat.name}蠟燭介紹`">
      </div>
      <!-- 文 -->
      <div class="product-intro-text">
        <p>{{ cat.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductType } from '~/types/product'

const props = defineProps<{
  currentType: ProductType
}>()

const { categories } = useProducts()

void props
</script>
