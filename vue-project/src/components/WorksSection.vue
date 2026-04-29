<template>
  <section class="works" id="works" ref="sectionEl">
    <div class="works__scroll-track">
      <div class="works__pin">
        <img class="works__gsv works__gsv--2" src="/graffiti/g01.svg" alt="" aria-hidden="true" draggable="false" loading="lazy" decoding="async" data-reveal="left" data-delay="0.1" />

        <div class="works__intro">
          <p class="works__label" data-reveal="up" data-delay="0.05">{{ t('works.tag') }}</p>
          <h2 class="works__title" data-reveal="up" data-delay="0.2" v-html="t('works.title').replace('\n', '<br/>')"></h2>
        </div>

        <div class="carousel-wrapper">
          <div class="carousel-stage" ref="stageEl">
            <button
              v-for="(project, i) in allProjects"
              :key="project.origIdx"
              :ref="el => { if (el) cardEls[i] = el }"
              class="works-card"
              :style="{ '--glow': project.glow, '--angle': `${i * CARD_STEP}deg` }"
              @click="openModal(project)"
            >
              <div class="works-card__visual" :style="{ background: project.bg }">
                <img v-if="project.cardImage" :src="project.cardImage" :class="['wc-img', { 'wc-img--pixel': project.cardImage.includes('card.png'), 'wc-img--contain': project.cardFit === 'contain' }]" alt="" draggable="false" loading="lazy" decoding="async" />
                <template v-else>
                  <div class="wc-circle" :style="{ background: project.accent }"></div>
                  <div class="wc-bar"></div>
                  <div class="wc-bar wc-bar--2"></div>
                </template>
                <div class="wc-noise"></div>
              </div>
              <div class="works-card__info">
                <span class="works-card__num">0{{ project.origIdx + 1 }}</span>
                <h3 class="works-card__title">{{ project.i18n.title }}</h3>
                <p class="works-card__type">{{ project.i18n.type }}</p>
              </div>

              <div class="works-card__overlay" :style="{ '--bg': project.overlayBg }">
                <div class="overlay-swatch"></div>
                <p class="works-card__desc">{{ project.i18n.desc }}</p>
                <div class="works-card__tags">
                  <span v-for="tag in project.i18n.tags" :key="tag" class="works-tag">{{ tag }}</span>
                </div>
                <span class="works-card__go">↗</span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>

    <ProjectModal :project="activeProject" @close="activeProject = null" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import ProjectModal from './ProjectModal.vue'

const { t } = useI18n()

const sectionEl = ref(null)
const stageEl = ref(null)
const cardEls = ref([])
const activeProject = ref(null)

function openModal(project) { activeProject.value = project }

const N = 5
const CARD_STEP = 360 / N

let currentAngle = 0
let targetAngle = 0
let animId = null
let vh = 0, sectionH = 0, sectionTop = 0

function lerp(a, b, t) { return a + (b - a) * t }

function tick() {
  currentAngle = lerp(currentAngle, targetAngle, 0.07)

  if (stageEl.value) {
    stageEl.value.style.transform = `rotateY(${-currentAngle}deg)`
  }

  cardEls.value.forEach((card, i) => {
    if (!card) return
    let a = (i * CARD_STEP - currentAngle) % 360
    if (a >  180) a -= 360
    if (a < -180) a += 360
    card.style.opacity = Math.max(0.04, 1 - Math.abs(a) / 180 * 1.6)
  })

  animId = requestAnimationFrame(tick)
}

function cacheLayout() {
  vh = window.innerHeight
  if (sectionEl.value) {
    sectionH = sectionEl.value.offsetHeight
    sectionTop = sectionEl.value.offsetTop
  }
}

function onScroll() {
  if (sectionH - vh <= 0) return
  const progress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / (sectionH - vh)))
  targetAngle = progress * (N - 1) * CARD_STEP
}

const base = {
  bg: 'linear-gradient(135deg,#1a0810,#120509)',
  accent: 'rgba(135,22,51,0.7)',
  glow: 'rgba(135,22,51,0.55)',
  overlayBg: 'rgba(18,5,9,0.96)',
}

const projectStyles = [
  { ...base, cardImage: '/urbanecho/mockup.webp', images: ['/urbanecho/sketch1.jpeg', '/urbanecho/sketch2.jpeg', '/urbanecho/mockup.webp', '/urbanecho/video.mp4', '/urbanecho/video2.mp4'] },
  { ...base, cardImage: '/mario/poster.webp', images: ['/mario/sketch.jpeg', '/mario/poster.webp', '/mario/print.jpeg'] },
  { ...base, cardImage: '/core/cover.webp', images: ['/core/logo.webp', '/core/magazine.pdf', '/core/magazine-cover.webp', '/core/mockup.webp'] },
  { ...base, cardImage: '/food/poster.webp', images: ['/food/sketch.jpeg', '/food/poster.webp', '/food/mockup.webp'] },
  { ...base, cardImage: '/greenloop/mockup.webp', images: ['/greenloop/sketch.jpeg', '/greenloop/logo-green.webp', '/greenloop/mockup.webp'] },
]

const allProjects = computed(() => {
  const ps = t('works.projects')
  return projectStyles.map((style, idx) => ({
    ...style,
    origIdx: idx,
    i18n: Array.isArray(ps) ? ps[idx] : { title: '', type: '', desc: '', tags: [] },
  }))
})

onMounted(() => {
  cacheLayout()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', cacheLayout, { passive: true })
  animId = requestAnimationFrame(tick)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', cacheLayout)
  cancelAnimationFrame(animId)
})
</script>

<style scoped>
.works {
  position: relative;
  background: var(--black);
}
.works__scroll-track {
  height: 500vh;
}
.works__pin {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: visible;
  background: var(--black);
}
/* Clip only the carousel, not the graffiti decorations */
.carousel-wrapper { overflow: hidden; }

.works__gsv {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}
.works__gsv--2 {
  width: clamp(480px, 72vw, 920px);
  bottom: -10%;
  left: -34%;
  transform: rotate(-13deg) scaleY(0.88);
  opacity: 0.9;
}

.works__intro {
  position: absolute;
  top: 7rem;
  left: 2.5rem;
  z-index: 200;
  pointer-events: none;
  max-width: 38vw;
}
.works__label {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.35;
  margin-bottom: 0.9rem;
}
.works__title {
  font-family: 'Cyber Brush', var(--font-graffiti);
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 0.95;
  letter-spacing: 0.02em;
  margin-bottom: 0.9rem;
}
.carousel-wrapper {
  position: absolute;
  inset: 0;
  perspective: 1200px;
  perspective-origin: 63% 52%;
}
.carousel-stage {
  position: absolute;
  top: 52%;
  left: 63%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
}

.works-card {
  appearance: none;
  background: none;
  padding: 0;
  font: inherit;
  text-align: left;
  position: absolute;
  width: 260px;
  height: 300px;
  top:  -150px;
  left: -130px;
  border-radius: 1.2rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  background: #0d0d0d;
  color: var(--white);
  cursor: none;
  transform: rotateY(var(--angle)) translateZ(280px);
  transition: border-color 0.4s, box-shadow 0.4s;
  will-change: opacity;
}
.works-card:hover {
  border-color: var(--glow, rgba(255,255,255,0.2));
  box-shadow: 0 0 60px var(--glow, rgba(255,255,255,0.15));
}

.works-card__visual {
  height: 155px;
  margin: 0.2rem 0.7rem 0.7rem;
  border-radius: 0.8rem;
  position: relative;
  overflow: hidden;
}
.wc-circle {
  position: absolute;
  width: 46%; aspect-ratio: 1; border-radius: 50%;
  top: 10%; right: 8%;
  filter: blur(20px); opacity: 0.65;
}
.wc-bar {
  position: absolute;
  height: 2.5px; width: 55%;
  background: rgba(255,255,255,0.10);
  bottom: 28%; left: 8%;
  border-radius: 2px;
}
.wc-bar--2 { width: 35%; bottom: 20%; }
.wc-img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.wc-img--contain {
  object-fit: contain;
  padding: 1.2rem;
}
.wc-img--pixel {
  object-fit: contain;
  object-position: center 32%;
  padding: 0.5rem 0.5rem 1.5rem;
  image-rendering: pixelated;
}
.wc-noise {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  opacity: 0.3; mix-blend-mode: overlay;
}
.works-card__info {
  padding: 1.1rem 1.1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
}
.works-card__num   { font-size: 0.55rem; letter-spacing: 0.2em; opacity: 0.25; }
.works-card__title { font-family: var(--font-display); font-size: 0.88rem; line-height: 1.15; letter-spacing: 0.01em; }
.works-card__type  { font-size: 0.57rem; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.35; }

.works-card__overlay {
  position: absolute;
  inset: 0;
  background: var(--bg, rgba(6,6,8,0.94));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.4rem;
  gap: 0.8rem;
  opacity: 0;
  transition: opacity 0.35s ease;
  z-index: 2;
}
.works-card:hover .works-card__overlay { opacity: 1; }
.overlay-swatch {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--glow);
}
.works-card__desc {
  font-size: 0.76rem; line-height: 1.65;
  font-weight: 300; color: rgba(245,245,240,0.70);
}
.works-card__tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.works-tag {
  font-size: 0.52rem; letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.22rem 0.55rem;
  border: 1px solid var(--glow);
  border-radius: 999px;
  color: rgba(245,245,240,0.6);
}
.works-card__go {
  position: absolute; top: 1.1rem; right: 1.2rem;
  font-size: 1.1rem; color: var(--glow);
}

@media (max-width: 768px) {
  .carousel-wrapper { perspective-origin: 50% 52%; }
  .carousel-stage { left: 50%; }
}
</style>
