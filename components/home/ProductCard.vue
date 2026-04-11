<template>
  <div
    :id="slug"
    class="infomation-card-wraper"
    :class="[product.type, { expan: expanded }]"
    @click="handleClick"
  >
    <div class="image-card-frame" :class="{ expan: expanded }">
      <div class="image-text-wraper" :class="{ trans: expanded }">
        <img :src="`/${product.image}`" :alt="product.title">

        <div class="infoText" :class="{ trans: expanded }">
          <div class="info-Text-container">
            <span class="infoCard-title">{{ product.title }}</span>
            <br>
            <p class="infoCard-context">{{ product.description }}</p>
            <br>
            <p class="infoCard-context">{{ product.price }}</p>

            <!-- 展開時顯示「查看詳細」連結 → 產品詳細頁 (Phase 5) -->
            <NuxtLink
              v-if="expanded"
              :to="`/products/${slug}`"
              class="product-detail-link"
              @click.stop
            >
              查看詳細 →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
  expanded: boolean
}>()

const emit = defineEmits<{
  expand: [title: string]
}>()

const slug = computed(() => toSlug(props.product.title))

const handleClick = () => {
  emit('expand', props.product.title)
}
</script>

<style scoped>
.product-detail-link {
  display: inline-block;
  margin-top: 1vw;
  padding: 0.4vw 1vw;
  color: rgb(171, 26, 26);
  font-weight: bold;
  border: 0.15vw solid rgb(171, 26, 26);
  border-radius: 0.3vw;
  font-size: 1vw;
  transition: all 0.2s;
}
.product-detail-link:hover {
  background: rgb(171, 26, 26);
  color: white;
}
@media screen and (max-width: 800px) {
  .product-detail-link {
    font-size: 2vw;
    padding: 1vw 2vw;
  }
}
@media screen and (max-width: 500px) {
  .product-detail-link {
    font-size: 3vw;
    padding: 1.5vw 3vw;
  }
}
</style>
