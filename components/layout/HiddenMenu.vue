<template>
  <aside
    id="hidden-menu-pannel"
    class="hidden-menu"
    :class="{ show: isOpen }"
    tabindex="-1"
  >
    <!-- Menu Title -->
    <div class="hidden-menu-title-container">
      <span class="label-text titleSize-text">產品列表</span>
    </div>

    <hr>

    <!-- 依分類分組 -->
    <div class="menu-option-wapper">
      <div
        v-for="cat in categories"
        :key="cat.type"
        class="hidden-menu-option-container"
      >
        <button
          class="hidden-option-btn"
          type="button"
          @click="toggleDropdown(cat.type)"
        >
          <span>{{ cat.name }}</span>
        </button>
        <hr>
        <ul
          class="hidden-dropdown"
          :class="{ reveal: openedCategory === cat.type }"
        >
          <li
            v-for="product in getProductsByType(cat.type)"
            :key="product.title"
          >
            <NuxtLink
              :to="`/products/${toSlug(product.title)}`"
              @click="close"
            >
              <span>{{ product.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- 聯絡資訊 -->
    <div class="hidden-menu-text-container">
      <hr>
      <span id="contact-text-title" class="contact">聯絡資訊</span>
      <ul class="hidden-contactInfo">
        <li><span class="contact">電話 (公司)：04-7372790</span></li>
        <li><span class="contact">電話 (住家)：04-7279724</span></li>
        <li><span class="contact">地址：彰化市國聖里聖安路 220 號</span></li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { ProductType } from '~/types/product'

const { categories, getProductsByType } = useProducts()
const { isOpen, close } = useHiddenMenu()

const openedCategory = ref<ProductType | null>(null)

const toggleDropdown = (type: ProductType) => {
  openedCategory.value = openedCategory.value === type ? null : type
}
</script>
