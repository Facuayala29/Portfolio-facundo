<template>
  <section class="about" id="about" ref="aboutEl">
    <img class="about__graffiti-svg about__graffiti-svg--r" src="/graffiti/g02.svg" alt="" aria-hidden="true" draggable="false" loading="lazy" decoding="async" data-reveal="right" data-delay="0.05" />

    <div class="about__scroll">
      <div class="about__pin" ref="pinEl">
        <div class="about__inner">

          <div class="about__header" ref="headerEl">
            <span class="tag">{{ t('about.tag') }}</span>
            <span class="about__header-line"></span>
          </div>

          <div class="about__body">
            <div class="about__video-col" ref="videoColEl">
              <div class="about__video-wrap">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1"
                  title="About video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="about__video-glow"></div>
            </div>

            <div class="about__text-col" ref="textColEl">
              <p class="about__bio-text">
                <template v-for="(word, wi) in bioWords" :key="wi">
                  <span class="word-span">{{ word }}</span>{{ ' ' }}
                </template>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const aboutEl = ref(null)
const pinEl = ref(null)
const headerEl = ref(null)
const videoColEl = ref(null)
const textColEl = ref(null)

const bioWords = computed(() => {
  const bio = t('about.bio')
  return typeof bio === 'string' ? bio.split(' ') : []
})

function easeOut(t) { return 1 - Math.pow(1 - t, 3) }
function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 }
function phase(p, s, e) { return Math.max(0, Math.min(1, (p - s) / (e - s))) }

let ticking = false
let measured = false
let natOffX = 0
let natOffY = 0

function measure() {
  if (!pinEl.value || !videoColEl.value) return

  const prevT = videoColEl.value.style.transform
  const prevO = videoColEl.value.style.opacity
  videoColEl.value.style.transform = 'none'
  videoColEl.value.style.opacity = '1'

  const pr = pinEl.value.getBoundingClientRect()
  const vr = videoColEl.value.getBoundingClientRect()
  const pinCX = pr.left + pr.width / 2
  const pinCY = window.innerHeight / 2
  const vCX = vr.left + vr.width / 2
  const vCY = vr.top + vr.height / 2 - pr.top

  natOffX = pinCX - vCX
  natOffY = pinCY - vCY

  videoColEl.value.style.transform = prevT
  videoColEl.value.style.opacity = prevO
  measured = true
}

function tick() {
  if (!aboutEl.value || !pinEl.value || !videoColEl.value) return

  const rect = aboutEl.value.getBoundingClientRect()
  const scrollable = aboutEl.value.offsetHeight - window.innerHeight
  const p = Math.max(0, Math.min(1, -rect.top / scrollable))

  if (!measured) measure()

  if (pinEl.value) {
    const alpha = Math.round(phase(p, 0, 0.15) * 255).toString(16).padStart(2, '0')
    pinEl.value.style.background = `#0a0a0c${alpha}`
  }

  if (headerEl.value) {
    const hp = easeOut(phase(p, 0.08, 0.22))
    headerEl.value.style.opacity = hp
    headerEl.value.style.transform = `translateY(${(1 - hp) * 18}px)`
  }

  const scaleP = easeOut(phase(p, 0.00, 0.35))
  const rotP = easeInOut(phase(p, 0.00, 0.40))
  const settleP = easeInOut(phase(p, 0.20, 0.58))
  const sc = 0.60 + scaleP * 0.40
  const rotY = (1 - rotP) * 36
  const rotX = (1 - rotP) * 12
  const tx = natOffX * (1 - settleP)
  const ty = natOffY * (1 - settleP)

  videoColEl.value.style.opacity = 1
  videoColEl.value.style.transform =
    `translate(${tx}px, ${ty}px) perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${sc})`

  if (textColEl.value) {
    const tp = easeOut(phase(p, 0.42, 0.80))
    textColEl.value.style.opacity = tp
    textColEl.value.style.transform = `translateX(${(1 - tp) * 80}px)`

    const wordEls = textColEl.value.querySelectorAll('.word-span')
    const total = wordEls.length
    wordEls.forEach((span, i) => {
      const threshold = 0.58 + (i / (total - 1)) * 0.42
      span.style.color = p >= threshold
        ? 'rgba(245,245,240,0.82)'
        : 'rgba(245,245,240,0.15)'
    })
  }
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => { tick(); ticking = false })
}

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => { measure(); requestAnimationFrame(tick) })
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.about__graffiti-svg {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 1;
}
.about__graffiti-svg--r {
  width: clamp(320px, 48vw, 680px);
  top: 8%;
  right: -18%;
  transform: rotate(7deg) scaleY(1.06);
  opacity: 0.82;
  z-index: 2;
}

.about {
  position: relative;
  /* pulls up so the about pin fires during manifesto's last split phase */
  margin-top: -60vh;
  z-index: 2;
}
.about__scroll {
  position: relative;
  z-index: 3;
  height: 280vh;
  overflow-x: clip;
}

.about__pin {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
}

.about__inner { padding: 0 2.5rem; }

.about__header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 4rem;
  opacity: 0;
  will-change: transform, opacity;
}
.tag {
  font-family: var(--font-graffiti);
  font-size: clamp(0.85rem, 1.4vw, 1.2rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.35;
  white-space: nowrap;
}
.about__header-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.07);
}

.about__body {
  display: flex;
  gap: 5rem;
  align-items: center;
}

.about__video-col {
  flex: 0 0 45%;
  min-width: 0;
  position: relative;
  opacity: 1;
  transform: perspective(1000px) rotateY(36deg) rotateX(12deg) scale(0.60);
  transform-origin: center center;
  will-change: transform, opacity;
}
.about__video-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 1.4rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset;
  background: #0f0f0f;
}
.about__video-wrap iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.about__video-glow {
  position: absolute;
  inset: -40px;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 55%,
    rgba(135,22,51,0.20) 0%,
    rgba(100,20,200,0.12) 45%,
    transparent 72%);
  filter: blur(35px);
  pointer-events: none;
}

.about__text-col {
  flex: 1;
  min-width: 0;
  opacity: 0;
  transform: translateX(70px);
  will-change: transform, opacity;
}
.about__bio-text {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.3vw, 1.15rem);
  line-height: 1.9;
  font-weight: 300;
  letter-spacing: 0.01em;
  margin: 0;
}
.word-span {
  display: inline;
  color: rgba(245,245,240,0.15);
}

@media (max-width: 768px) {
  .about__body { flex-direction: column-reverse; gap: 3rem; }
  .about__video-col { flex: 0 0 auto; width: 100%; }
  .about__text-col { flex: 0 0 auto; width: 100%; }
}
</style>
