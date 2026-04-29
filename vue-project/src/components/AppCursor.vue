<template>
  <div>
    <div class="cursor" ref="cursorEl"></div>
    <div class="cursor-follower" ref="followerEl"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorEl = ref(null)
const followerEl = ref(null)

let mouseX = 0, mouseY = 0
let followerX = 0, followerY = 0
let raf = null
let moving = false

function lerp(a, b, t) { return a + (b - a) * t }

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  cursorEl.value.style.left = mouseX + 'px'
  cursorEl.value.style.top = mouseY + 'px'
  if (!moving) { moving = true; raf = requestAnimationFrame(tick) }
}

function tick() {
  followerX = lerp(followerX, mouseX, 0.12)
  followerY = lerp(followerY, mouseY, 0.12)
  followerEl.value.style.left = followerX + 'px'
  followerEl.value.style.top  = followerY + 'px'
  if (Math.abs(followerX - mouseX) < 0.3 && Math.abs(followerY - mouseY) < 0.3) {
    moving = false; raf = null; return
  }
  raf = requestAnimationFrame(tick)
}

function onOver(e) {
  cursorEl.value.classList.toggle('expanded', !!e.target.closest('a, button, [data-cursor]'))
}

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return

  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseover', onOver)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onOver)
  cancelAnimationFrame(raf)
})
</script>
