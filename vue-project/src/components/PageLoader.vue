<template>
  <Transition name="loader" @after-leave="$emit('done')">
    <div class="loader" v-if="visible" aria-hidden="true" role="presentation">
      <div class="loader__noise"></div>
      <div class="loader__inner">
        <div class="loader__logo">
          <span class="l-dsgn">Facundo Ayala Muñoz</span>
        </div>

        <!-- cloud PNG progress bar -->
        <div class="loader__bar-wrap">
          <div class="bar-container">
            <!-- ghost: full cloud silhouette at low opacity -->
            <div class="bar-ghost" :class="isDay ? 'ghost--day' : 'ghost--night'"></div>
            <!-- fill: sweeps left-to-right as progress grows -->
            <div class="bar-fill" :class="isDay ? 'fill--day' : 'fill--night'"
                 :style="{ clipPath: `inset(0 ${100 - progress}% 0 0)` }"></div>
          </div>
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
import { useTheme } from '../composables/useTheme.js'

defineEmits(['done'])

const { isDay } = useTheme()
const visible   = ref(true)
const progress  = ref(0)

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
      // short pause at 100%, then fade to hero
      setTimeout(() => { visible.value = false }, 300)
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

/* simple fade out — no cloud wipe on load */
.loader-leave-active { transition: opacity 0.5s ease; }
.loader-leave-to     { opacity: 0; }

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
  font-size: clamp(1.4rem, 5.5vw, 4rem);
  letter-spacing: -0.02em;
  line-height: 1.05;
  display: flex;
  align-items: baseline;
  white-space: nowrap;
  text-align: center;
  max-width: 90vw;
  animation: logoBreath 2s ease-in-out infinite;
}
@keyframes logoBreath {
  0%, 100% { letter-spacing: -0.02em; }
  50%       { letter-spacing: 0.01em; }
}
.l-dsgn { color: var(--red); }

/* ── cloud PNG bar ──────────────────────────────────────────────── */
.loader__bar-wrap { line-height: 0; }

.bar-container {
  position: relative;
  width: clamp(240px, 50vw, 460px);
  /* proportional to cloud_loader.png: 1745 × 482 */
  aspect-ratio: 1745 / 482;
}

/* both layers share the same PNG mask */
.bar-ghost,
.bar-fill {
  position: absolute;
  inset: 0;
  -webkit-mask-image: url('../assets/img/cloud_loader.png');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-image: url('../assets/img/cloud_loader.png');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}

/* ghost: shows the full cloud outline faintly */
.ghost--night { background: rgba(215,165,40,0.20); }
.ghost--day   { background: rgba(88,52,8,0.16); }

/* fill: sweeps across as progress increases */
.fill--night {
  background: linear-gradient(90deg,
    rgba(215,165,40,0.96)  0%,
    rgba(245,208,90,0.88) 60%,
    rgba(255,235,155,0.76) 100%);
}
.fill--day {
  background: linear-gradient(90deg,
    rgba(88,52,8,0.92)    0%,
    rgba(162,98,20,0.82)  60%,
    rgba(198,132,34,0.72) 100%);
}

/* ── pct ────────────────────────────────────────────────────────── */
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

</style>
