<template>
  <Transition name="loader" @after-leave="$emit('done')">
    <div class="loader" v-if="visible" aria-hidden="true" role="presentation">
      <div class="loader__noise"></div>
      <div class="loader__inner">
        <div class="loader__logo">
          <span class="l-dsgn">Facundo Ayala</span>
        </div>
        <div class="loader__track">
          <div class="loader__fill" :style="{ transform: `scaleX(${progress / 100})` }"></div>
        </div>
        <div class="loader__pct">
          <span class="pct-num">{{ Math.round(progress) }}</span>
          <span class="pct-sym">%</span>
        </div>
      </div>
      <div class="loader__tagline">Multimedia Designer Portfolio</div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['done'])

const visible = ref(true)
const progress = ref(0)

onMounted(() => {
  const duration = 2000
  let start = null

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

  function tick(ts) {
    if (!start) start = ts
    const t = Math.min((ts - start) / duration, 1)
    progress.value = easeInOut(t) * 100

    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      progress.value = 100
      setTimeout(() => { visible.value = false }, 350)
    }
  }

  requestAnimationFrame(tick)
})
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loader__noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
}

.loader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  position: relative;
  z-index: 1;
}

.loader__logo {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 12vw, 8rem);
  letter-spacing: -0.02em;
  line-height: 1;
  display: flex;
  align-items: baseline;
  animation: logoBreath 2s ease-in-out infinite;
}
@keyframes logoBreath {
  0%, 100% { letter-spacing: -0.02em; }
  50% { letter-spacing: 0.01em; }
}

.l-dsgn { color: var(--red); }

.loader__track {
  width: 180px;
  height: 1px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
  position: relative;
}
.loader__fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--red), var(--white));
  transform-origin: left;
  transition: transform 0.04s linear;
}

.loader__pct {
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.25em;
  opacity: 0.3;
  line-height: 1;
}
.pct-sym { font-size: 0.6em; }

.loader__tagline {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.55rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  opacity: 0.2;
  white-space: nowrap;
}

.loader-leave-active {
  transition: opacity 0.5s ease, transform 0.5s var(--ease-in-out);
}
.loader-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
