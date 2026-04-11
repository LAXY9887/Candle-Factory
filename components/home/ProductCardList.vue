<template>
  <div class="infomation-card-container">
    <HomeProductCard
      v-for="product in visibleProducts"
      :key="product.title"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductType } from '~/types/product'

const props = defineProps<{
  currentType: ProductType
}>()

const { products } = useProducts()

const visibleProducts = computed(() => {
  return products.filter((p) => p.type === props.currentType)
})
</script>
