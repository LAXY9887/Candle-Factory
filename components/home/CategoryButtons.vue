<template>
  <div class="product-function-btn-container">
    <div class="product-button-list-container">
      <template v-for="cat in categories" :key="cat.type">
        <!-- 左間隔 -->
        <div></div>

        <!-- 按鈕 -->
        <div>
          <span
            class="class-btn function-btn-text"
            :class="{ active: currentType === cat.type }"
            :data-type="cat.type"
            role="button"
            tabindex="0"
            @click="onSelect(cat.type)"
            @keydown.enter="onSelect(cat.type)"
            @keydown.space.prevent="onSelect(cat.type)"
          >{{ cat.name }}</span>
        </div>

        <!-- 右間隔 -->
        <div></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductType } from '~/types/product'

const props = defineProps<{
  currentType: ProductType
}>()

const emit = defineEmits<{
  change: [type: ProductType]
}>()

const { categories } = useProducts()

const onSelect = (type: ProductType) => {
  emit('change', type)
}

// 用 props 避免未使用警告
void props
</script>

<style scoped>
.class-btn {
  transition: color 0.2s;
}
.class-btn.active {
  color: rgb(171, 26, 26);
  text-decoration: underline;
  text-underline-offset: 0.5vw;
}
</style>
