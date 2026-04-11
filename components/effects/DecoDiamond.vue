<template>
  <ClientOnly>
    <canvas ref="canvasRef" :id="id"></canvas>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string
    color?: string
  }>(),
  {
    id: 'deco-diamond',
    color: 'red',
  },
)

const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  // 強制讓 canvas 的內部解析度等於 CSS 尺寸
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cx = canvas.width / 2
  const cy = canvas.height / 2

  ctx.beginPath()
  ctx.moveTo(cx, cy - cy) // 上
  ctx.lineTo(cx + cx, cy) // 右
  ctx.lineTo(cx, cy + cy) // 下
  ctx.lineTo(cx - cx, cy) // 左
  ctx.closePath()
  ctx.fillStyle = props.color
  ctx.fill()
})
</script>
