<template>
  <ClientOnly>
    <div
      id="fireCanvas_backGround"
      ref="bgRef"
      class="fireCanvas_BG"
    >
      <canvas ref="canvasRef"></canvas>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const bgRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  const canvas = canvasRef.value
  const bg = bgRef.value
  if (!canvas || !bg) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const light = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 5,
    alpha: 0,
  }

  const flickerLight = () => {
    light.alpha += 0.02
    light.radius += 50
  }

  const drawLight = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = `rgba(255, 215, 158, ${light.alpha})`
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(light.x, light.y, light.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    flickerLight()
  }

  let frameCount = 0
  const maxFrames = 50

  const animate = () => {
    if (frameCount <= maxFrames) {
      frameCount++
      drawLight()
      setTimeout(() => {
        requestAnimationFrame(animate)
      }, 15)
    }

    if (frameCount === maxFrames) {
      bg.classList.add('close')
      canvas.classList.add('fireCanvas_BG')
      canvas.classList.add('close')
      document.body.style.overflow = 'auto'
    }
  }

  requestAnimationFrame(animate)
})
</script>
