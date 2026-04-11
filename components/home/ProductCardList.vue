<template>
  <div class="infomation-card-container">
    <HomeProductCard
      v-for="product in visibleProducts"
      :key="product.title"
      :product="product"
      :expanded="expandedTitle === product.title"
      @expand="onExpand"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductType } from '~/types/product'

const props = defineProps<{
  currentType: ProductType
}>()

const { products } = useProducts()

const expandedTitle = ref<string | null>(null)

const visibleProducts = computed(() => {
  return products.filter((p) => p.type === props.currentType)
})

const onExpand = (title: string) => {
  expandedTitle.value = expandedTitle.value === title ? null : title
}

// 切換分類時重置展開狀態
watch(
  () => props.currentType,
  () => {
    expandedTitle.value = null
  },
)
</script>
