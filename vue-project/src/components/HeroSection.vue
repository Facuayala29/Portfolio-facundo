<template>
  <section class="hero" id="hero" ref="heroEl">
    <canvas class="hero__noise" ref="noiseEl"></canvas>

    <div class="hero__word hero__word--port" ref="wordPortEl" aria-hidden="true">PORT</div>

    <img class="hero__character" src="/character.svg" alt="" aria-hidden="true" draggable="false" ref="characterEl" />

    <div class="hero__photo-wrap" ref="photoWrapEl">
      <img class="hero__photo" src="/hero.png" alt="Facundo Ayala Munoz" draggable="false" @error="e => e.target.style.display='none'" />
    </div>

    <div class="hero__word hero__word--folio" ref="wordFolioEl" aria-hidden="true">FOLIO</div>

    <img class="hero__gsv hero__gsv--1" src="/graffiti/g01.svg" alt="" aria-hidden="true" draggable="false" ref="gsv1El" />
    <img class="hero__gsv hero__gsv--2" src="/graffiti/g03.svg" alt="" aria-hidden="true" draggable="false" ref="gsv2El" />

    <div class="hero__rule hero__rule--top"></div>
    <div class="hero__rule hero__rule--mid"></div>

    <div class="hero__vignette"></div>

    <div class="hero__corner hero__corner--tl"><span>©2K26</span></div>
    <div class="hero__corner hero__corner--tr"><span>Aarhus, DK</span></div>
    <div class="hero__corner hero__corner--bl">
      <span class="hero__tagline" v-html="heroTagline"></span>
    </div>
    <div class="hero__corner hero__corner--br"><span>Facundo Ayala Munoz</span></div>

    <div class="hero__scroll-hint" ref="scrollHintEl">
      <div class="scroll-line-wrap"><div class="scroll-line"></div></div>
      <span>Scroll</span>
    </div>

    <div class="hero__red-line"></div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
const heroTagline = computed(() => t('hero.tagline').replace('\n', '<br/>'))

const heroEl = ref(null)
const noiseEl = ref(null)
const wordPortEl = ref(null)
const wordFolioEl = ref(null)
const photoWrapEl = ref(null)
const characterEl = ref(null)
const scrollHintEl = ref(null)
const gsv1El = ref(null)
const gsv2El = ref(null)

let animId = null
let mx = 0, my = 0
let tmx = 0, tmy = 0
let gsvAlpha = 0

function lerp(a, b, t) { return a + (b - a) * t }

function initNoise() {
  const canvas = noiseEl.value
  const ctx = canvas.getContext('2d')
  let fr = 0
  let noiseId = null
  let alive = true

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  ;(function loop() {
    if (!alive) return
    if (++fr % 3 === 0) {
      const { width: w, height: h } = canvas
      const img = ctx.createImageData(w, h)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255
        d[i] = d[i+1] = d[i+2] = v
        d[i+3] = 9
      }
      ctx.putImageData(img, 0, 0)
    }
    noiseId = requestAnimationFrame(loop)
  })()

  return () => {
    alive = false
    cancelAnimationFrame(noiseId)
    window.removeEventListener('resize', resize)
  }
}

function mainLoop() {
  mx = lerp(mx, tmx, 0.06)
  my = lerp(my, tmy, 0.06)

  const sy = window.scrollY || 0
  const heroH = heroEl.value?.offsetHeight || 800
  const sp = Math.min(sy / heroH, 1)

  const ux = mx * 18
  const uy = sy * 0.26 + my * 9
  const rotY = mx * 14
  const rotX = my * -10

  if (wordPortEl.value) {
    wordPortEl.value.style.transform =
      `perspective(900px) translateX(${ux}px) translateY(${uy}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`
    wordPortEl.value.style.opacity = String(Math.max(0, 1 - sp * 3.0))
  }

  if (wordFolioEl.value) {
    wordFolioEl.value.style.transform =
      `perspective(900px) translateX(${ux}px) translateY(${uy}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`
    wordFolioEl.value.style.opacity = String(Math.max(0, 1 - sp * 3.0))
  }

  if (characterEl.value) {
    characterEl.value.style.transform =
      `perspective(900px) translateX(calc(-50% + ${ux}px)) translateY(${uy}px) rotateY(${rotY * 0.55}deg) rotateX(${rotX * 0.55}deg)`
    characterEl.value.style.opacity = String(Math.max(0, 1 - sp * 3.0))
  }

  if (photoWrapEl.value) {
    photoWrapEl.value.style.transform =
      `translateX(-50%) translateY(${sy * 0.10}px) translateX(${mx * 8}px)`
    photoWrapEl.value.style.opacity = String(Math.max(0, 1 - sp * 1.6))
  }

  if (scrollHintEl.value) {
    scrollHintEl.value.style.opacity = String(Math.max(0, 1 - sp * 5))
  }

  if (heroEl.value?.classList.contains('loaded') && gsvAlpha < 1) {
    gsvAlpha = Math.min(1, gsvAlpha + 0.013)
  }
  const gsvOp = gsvAlpha * Math.max(0, 1 - sp * 2)

  if (gsv1El.value) {
    gsv1El.value.style.transform = `rotate(-11deg) scaleX(-1) translate(${mx * 11}px, ${sy * 0.14 + my * 7}px)`
    gsv1El.value.style.opacity = String(gsvOp * 0.92)
  }
  if (gsv2El.value) {
    gsv2El.value.style.transform = `rotate(8deg) scaleY(0.92) translate(${mx * 7}px, ${sy * 0.09 + my * 5}px)`
    gsv2El.value.style.opacity = String(gsvOp * 0.96)
  }

  animId = requestAnimationFrame(mainLoop)
}

function onMouseMove(e) {
  tmx = (e.clientX / window.innerWidth - 0.5) * 2
  tmy = (e.clientY / window.innerHeight - 0.5) * 2
}

let cleanupNoise

onMounted(() => {
  cleanupNoise = initNoise()
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  setTimeout(() => heroEl.value?.classList.add('loaded'), 120)
  animId = requestAnimationFrame(mainLoop)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('mousemove', onMouseMove)
  cleanupNoise?.()
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  background: #1c1c1c;
}

.hero__noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 30;
  opacity: 0.28;
  mix-blend-mode: overlay;
}

.hero__word {
  position: absolute;
  bottom: 32%;
  font-family: var(--font-graffiti);
  font-size: clamp(3.5rem, 11vw, 10rem);
  color: rgba(237, 232, 213, 0.20);
  letter-spacing: 0.04em;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  will-change: transform, opacity;
  opacity: 0;
  transition: opacity 1.4s ease 0.3s;
  line-height: 1;
}
.hero.loaded .hero__word { opacity: 1; }

.hero__word--port  { right: calc(50% + 80px); left: auto; z-index: 3; }
.hero__word--folio { left: calc(50% + 80px); right: auto; z-index: 3; }

.hero__character {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  height: 78%;
  width: auto;
  z-index: 6;
  pointer-events: none;
  user-select: none;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 1.4s ease 0.3s;
}
.hero.loaded .hero__character { opacity: 0.92; }

.hero__photo-wrap {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 54%;
  z-index: 5;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
  will-change: transform, opacity;
  opacity: 0;
  transition: opacity 1.6s ease 0.7s;
}
.hero.loaded .hero__photo-wrap { opacity: 1; }
.hero__photo {
  height: 97%;
  width: auto;
  object-fit: contain;
  object-position: bottom center;
  mix-blend-mode: screen;
  filter: contrast(1.1) brightness(0.9);
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 5%);
  mask-image:
    linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
  user-select: none;
  pointer-events: none;
}

.hero__gsv {
  position: absolute;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  will-change: transform, opacity;
}
.hero__gsv--1 {
  width: clamp(560px, 86vw, 1120px);
  bottom: -18%;
  left: -20%;
  z-index: 2;
}
.hero__gsv--2 {
  width: clamp(480px, 74vw, 980px);
  top: -12%;
  right: -22%;
  z-index: 4;
}

.hero__rule {
  position: absolute;
  left: 6%;
  right: 6%;
  height: 1px;
  pointer-events: none;
  z-index: 12;
  opacity: 0;
  transition: opacity 1s ease;
}
.hero.loaded .hero__rule { opacity: 1; }
.hero__rule--top {
  top: 5.2rem;
  background: linear-gradient(to right, transparent, rgba(135,22,51,0.35) 30%, rgba(237,232,213,0.12) 70%, transparent);
  transition-delay: 1.4s;
}
.hero__rule--mid {
  bottom: 4.5rem;
  background: linear-gradient(to right, transparent, rgba(237,232,213,0.08) 40%, rgba(135,22,51,0.25) 70%, transparent);
  transition-delay: 1.6s;
}

.hero__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.65) 100%);
  z-index: 20;
  pointer-events: none;
}

.hero__red-line {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--red) 50%, transparent);
  z-index: 32;
  opacity: 0;
  transition: opacity 1s ease 1.8s;
}
.hero.loaded .hero__red-line { opacity: 1; }

.hero__corner {
  position: absolute;
  z-index: 32;
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.9s ease;
  color: rgba(237, 232, 213, 0.32);
  line-height: 1.7;
  font-family: var(--font-body);
}
.hero.loaded .hero__corner { opacity: 1; }
.hero__corner--tl { top: 5rem; left: 2.5rem; transition-delay: 1.0s; }
.hero__corner--tr { top: 5rem; right: 2.5rem; text-align: right; transition-delay: 1.1s; }
.hero__corner--bl { bottom: 2.8rem; left: 2.5rem; transition-delay: 1.2s; }
.hero__corner--br { bottom: 2.8rem; right: 2.5rem; text-align: right; transition-delay: 1.3s; }
.hero__tagline { font-size: 0.55rem; line-height: 1.8; }

.hero__scroll-hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.52rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  z-index: 32;
  opacity: 0;
  transition: opacity 0.8s ease 2.2s;
  color: rgba(237, 232, 213, 0.28);
  will-change: opacity;
  font-family: var(--font-body);
}
.hero.loaded .hero__scroll-hint { opacity: 1; }
.scroll-line-wrap {
  width: 1px;
  height: 44px;
  overflow: hidden;
  background: rgba(237, 232, 213, 0.08);
}
.scroll-line {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, var(--red), rgba(237, 232, 213, 0.45));
  transform-origin: top;
  animation: scrollDrop 2.2s ease-in-out infinite;
}
@keyframes scrollDrop {
  0% { transform: scaleY(0); opacity: 1; }
  50% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1) translateY(100%); opacity: 0; }
}

@media (max-width: 900px) {
  .hero__photo-wrap { width: 65%; }
  .hero__gsv--1 { width: clamp(260px, 70vw, 480px); bottom: -5%; }
  .hero__gsv--2 { width: clamp(220px, 60vw, 400px); top: -3%; }
}
@media (max-width: 600px) {
  .hero { min-height: 100svh; }
  .hero__photo-wrap { width: 90%; opacity: 0.5 !important; }
  .hero__character { height: 65%; }
  .hero__word { font-size: clamp(2.2rem, 14vw, 4rem); bottom: 28%; }
  .hero__word--port { right: calc(50% + 40px); }
  .hero__word--folio { left: calc(50% + 40px); }
  .hero__gsv--1 { width: 85vw; left: -18%; bottom: -5%; }
  .hero__gsv--2 { width: 72vw; right: -20%; top: -3%; }
  .hero__corner { font-size: 0.5rem; letter-spacing: 0.1em; }
  .hero__corner--tl, .hero__corner--tr { top: 4rem; }
  .hero__corner--tl { left: 1.2rem; }
  .hero__corner--tr { right: 1.2rem; }
  .hero__corner--bl { left: 1.2rem; }
  .hero__corner--br { right: 1.2rem; }
}
@media (max-width: 480px) {
  .hero__character { bottom: 18%; }
  .hero__word { bottom: 34%; }
  .hero__photo-wrap { bottom: 5%; }
}
</style>
