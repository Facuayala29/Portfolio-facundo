<template>
  <section class="manifesto" ref="sectionEl">
    <div class="manifesto__scroll">
      <div class="manifesto__pin" ref="pinEl">

        <div class="cards" aria-hidden="true">
          <div class="card card--tl" data-z="0.9">
            <div class="card__shell">
              <video class="card__media" autoplay muted loop playsinline preload="none">
                <source src="/urbanecho/video2.webm" type="video/webm" />
                <source src="/urbanecho/video2.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div class="card card--tr" data-z="1.15">
            <div class="card__shell">
              <img src="/food/poster.webp" class="card__media" alt="" loading="lazy" decoding="async" />
            </div>
          </div>
          <div class="card card--ml" data-z="1.25">
            <div class="card__shell">
              <img src="/core/cover.webp" class="card__media" alt="" loading="lazy" decoding="async" />
            </div>
          </div>
          <div class="card card--mr" data-z="0.85">
            <div class="card__shell">
              <img src="/urbanecho/mockup.webp" class="card__media" alt="" loading="lazy" decoding="async" />
            </div>
          </div>
          <div class="card card--bl" data-z="1.4">
            <div class="card__shell">
              <img src="/greenloop/mockup.webp" class="card__media" alt="" loading="lazy" decoding="async" />
            </div>
          </div>
          <div class="card card--br" data-z="0.75">
            <div class="card__shell">
              <video class="card__media" autoplay muted loop playsinline preload="none">
                <source src="/urbanecho/video.webm" type="video/webm" />
                <source src="/urbanecho/video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div class="text-center">
          <h2 class="text-block">
            <span class="tline" ref="l1">{{ t('manifesto.line1') }}</span>
            <span class="tline" ref="l2">{{ t('manifesto.line2') }}</span>
            <span class="tline tline--row">
              <span ref="l3a">{{ t('manifesto.line3a') }}</span>
              <span class="accent" ref="l3b">{{ t('manifesto.line3b') }}</span>
            </span>
          </h2>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const sectionEl = ref(null)
const pinEl = ref(null)
const l1 = ref(null)
const l2 = ref(null)
const l3a = ref(null)
const l3b = ref(null)

function phase(p, start, end) {
  return Math.max(0, Math.min(1, (p - start) / (end - start)))
}

let ticking = false
let cards = []
let vh = 0, sectionH = 0, sectionTop = 0
let vpCX = 0, vpCY = 0
let cardData = []

function cacheLayout() {
  vh = pinEl.value?.offsetHeight || window.innerHeight
  vpCX = window.innerWidth / 2
  vpCY = vh / 2
  if (sectionEl.value) {
    sectionH = sectionEl.value.offsetHeight
    sectionTop = sectionEl.value.offsetTop
  }
  cardData = cards.map(card => ({
    el: card,
    cx: card.offsetLeft + card.offsetWidth / 2,
    cy: card.offsetTop + card.offsetHeight / 2,
    z: parseFloat(card.dataset.z) || 1,
  }))
}

function tick() {
  if (!sectionEl.value || sectionH - vh <= 0) return

  const p = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / (sectionH - vh)))

  cardData.forEach(({ el, cx, cy, z }) => {
    const scale = 1 + p * z * 2
    const fade = p > 0.52 ? 1 - phase(p, 0.52, 0.68) : 1
    const tx = (scale - 1) * (cx - vpCX)
    const ty = (scale - 1) * (cy - vpCY)
    el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
    el.style.opacity = fade
  })

  if (l1.value) l1.value.style.opacity = 1 - phase(p, 0.70, 0.80)
  if (l2.value) l2.value.style.opacity = 1 - phase(p, 0.80, 0.88)

  const sp = phase(p, 0.88, 1)
  const drift = sp * 420

  if (l3a.value) {
    l3a.value.style.opacity = 1 - sp
    l3a.value.style.transform = `translateX(${-drift}px)`
  }
  if (l3b.value) {
    l3b.value.style.opacity = 1 - sp
    l3b.value.style.transform = `translateX(${drift}px)`
  }
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => { tick(); ticking = false })
}

onMounted(() => {
  nextTick(() => {
    cards = [...sectionEl.value.querySelectorAll('.card')]
    cacheLayout()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', cacheLayout, { passive: true })
    requestAnimationFrame(() => requestAnimationFrame(tick))
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', cacheLayout)
})
</script>

<style scoped>
.manifesto {
  position: relative;
  background: #0a0a0c;
}
.manifesto__scroll {
  height: 500vh;
  height: 500svh;
  position: relative;
  overflow-x: clip;
}
.manifesto__pin {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
}

.cards {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.card {
  position: absolute;
  will-change: transform, opacity;
}

.card--tl { left: 7%; top: 4%; width: 24vw; aspect-ratio: 16/9; }
.card--tr { left: 63%; top: 2%; width: 12vw; aspect-ratio: 7/10; }
.card--ml { left: 5%; top: 36%; width: 13vw; aspect-ratio: 7/10; }
.card--mr { left: 79%; top: 20%; width: 19vw; aspect-ratio: 16/9; }
.card--bl { left: 10%; top: 76%; width: 11vw; aspect-ratio: 1/1; }
.card--br { left: 64%; top: 61%; width: 27vw; aspect-ratio: 16/9; }

.card__shell {
  width: 100%;
  height: 100%;
  border-radius: 0.7rem;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
}
.card__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.text-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  pointer-events: none;
}
.text-block {
  font-family: var(--font-graffiti);
  font-size: clamp(1.6rem, 3.8vw, 3.4rem);
  line-height: 1.35;
  letter-spacing: 0.01em;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: var(--white);
  padding: 0 1.5rem;
}
.tline {
  display: block;
  will-change: opacity;
}
.tline--row {
  display: flex;
  gap: 0.28em;
  justify-content: center;
  overflow: visible;
}
.tline--row span {
  display: inline-block;
  will-change: transform, opacity;
}
.accent { color: var(--red); }

@media (min-width: 769px) and (max-width: 1100px) {
  .card--tl { width: 320px; }
  .card--tr { width: 160px; }
  .card--ml { width: 170px; }
  .card--mr { width: 260px; }
  .card--bl { width: 150px; }
  .card--br { width: 360px; }
}

@media (max-width: 768px) {
  .text-block { font-size: clamp(1.5rem, 6vw, 3.4rem); }
  .card--tl { width: 52vw; left: 2%; }
  .card--tr { width: 28vw; left: 48%; }
  .card--ml { width: 28vw; top: 62%; }
  .card--mr { width: 38vw; left: 62%; }
  .card--bl { width: 24vw; left: 38%; }
  .card--br { width: 54vw; }
}
</style>
