<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Nuxt 根元素需要 100% 寬度，讓 body flex 下的子元素能伸展 */
#__nuxt {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
