<template>
  <NuxtLink
    :id="slug"
    :to="`/products/${slug}`"
    class="infomation-card-wraper product-card-link"
    :class="product.type"
  >
    <div class="image-card-frame">
      <div class="image-text-wraper">
        <img :src="`/${product.image}`" :alt="product.title">

        <div class="infoText">
          <div class="info-Text-container">
            <span class="infoCard-title">{{ product.title }}</span>
            <br>
            <p class="infoCard-context">{{ product.description }}</p>
            <br>
            <p class="infoCard-context">{{ product.price }}</p>

            <span class="product-detail-hint">查看詳細 →</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const slug = computed(() => toSlug(props.product.title))
</script>

<style scoped>
/* 產品卡本身是連結 */
.product-card-link {
  display: block;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.product-card-link:hover {
  transform: translateY(-0.3vw);
}

/* 圖片 hover 效果 */
.product-card-link:hover .image-card-frame {
  box-shadow: 0 0.5vw 1.5vw rgba(105, 3, 3, 0.25);
}

/* 查看詳細 提示 */
.product-detail-hint {
  display: inline-block;
  margin-top: 1vw;
  color: rgb(171, 26, 26);
  font-weight: bold;
  font-size: 1vw;
  opacity: 0.7;
  transition: opacity 0.2s, letter-spacing 0.2s;
}
.product-card-link:hover .product-detail-hint {
  opacity: 1;
  letter-spacing: 0.1em;
}

@media screen and (max-width: 800px) {
  .product-detail-hint {
    font-size: 2vw;
  }
}
@media screen and (max-width: 500px) {
  .product-detail-hint {
    font-size: 3vw;
    opacity: 1;
  }
}
</style>
