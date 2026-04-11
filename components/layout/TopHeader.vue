<template>
  <header class="top-mobile-header">
    <div class="top-mobile-header-wrapper">
      <!-- LOGO -->
      <div class="logo-container">
        <NuxtLink to="/">
          <img class="logo-desktop" src="/image/Logo.png" alt="重光企業社 Logo">
        </NuxtLink>
        <NuxtLink to="/">
          <img class="logo-mobile" src="/image/Logo icon.png" alt="重光企業社 Logo">
        </NuxtLink>
      </div>

      <!-- 功能按鈕 -->
      <nav class="function-btn-container">
        <div class="button-list-container">
          <!-- 第一組 -->
          <div></div>
          <NuxtLink to="/intro">
            <div>
              <span class="function-btn-text">工廠介紹</span>
            </div>
          </NuxtLink>
          <div></div>

          <!-- 第二組 -->
          <div></div>
          <div>
            <NuxtLink to="/#targetElement">
              <span class="function-btn-text">產品列表</span>
            </NuxtLink>
          </div>
          <div></div>

          <!-- 第三組 -->
          <div></div>
          <NuxtLink to="/contact">
            <div>
              <span class="function-btn-text">聯絡我們</span>
            </div>
          </NuxtLink>
          <div></div>
        </div>

        <!-- 隱藏選單按鈕 -->
        <button
          class="list-icon-btn-container"
          aria-label="開啟選單"
          type="button"
          @click="toggleMenu"
        >
          <div class="icon-img-container">
            <img src="/image/list icon.png" alt="list-icon">
          </div>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const { toggle: toggleMenu } = useHiddenMenu()
</script>
