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
let raf, mo

function lerp(a, b, t) { return a + (b - a) * t }

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  cursorEl.value.style.left = mouseX + 'px'
  cursorEl.value.style.top = mouseY + 'px'
}

function tick() {
  followerX = lerp(followerX, mouseX, 0.12)
  followerY = lerp(followerY, mouseY, 0.12)
  followerEl.value.style.left = followerX + 'px'
  followerEl.value.style.top  = followerY + 'px'
  raf = requestAnimationFrame(tick)
}

function expand() { cursorEl.value?.classList.add('expanded') }
function contract() { cursorEl.value?.classList.remove('expanded') }

function bindLinks() {
  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.removeEventListener('mouseenter', expand)
    el.removeEventListener('mouseleave', contract)
    el.addEventListener('mouseenter', expand)
    el.addEventListener('mouseleave', contract)
  })
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  raf = requestAnimationFrame(tick)
  bindLinks()

  mo = new MutationObserver(bindLinks)
  mo.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(raf)
  mo?.disconnect()
})
</script>
