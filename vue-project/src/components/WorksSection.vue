<template>
  <section class="works" id="works" ref="sectionEl">
    <div class="works__scroll-track">
      <div class="works__pin">
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
                <img v-if="project.cardImage" :src="project.cardImage" :class="['wc-img', { 'wc-img--pixel': project.cardImage === '/mario/card.png', 'wc-img--contain': project.cardFit === 'contain', 'wc-img--top': project.cardImage.includes('businessdedk') }]" alt="" draggable="false" loading="lazy" decoding="async" />
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
import { useTheme } from '../composables/useTheme.js'
import { useI18n } from '../composables/useI18n.js'
import ProjectModal from './ProjectModal.vue'

const { t } = useI18n()
const { isDay } = useTheme()

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

// night base: deep dark backgrounds
const nightBase = {
  bg: 'linear-gradient(135deg,#1a2a4a,#0e1f3a)',
  accent: 'rgba(80,120,200,0.55)',
  glow: 'rgba(100,145,220,0.50)',
  overlayBg: 'rgba(6,10,22,0.96)',
}
// day base: warm golden backgrounds  
const dayBase = {
  bg: 'linear-gradient(135deg,#f0e8d0,#e8dcc4)',
  accent: 'rgba(180,100,0,0.55)',
  glow: 'rgba(190,120,10,0.55)',
  overlayBg: 'rgba(245,230,185,0.96)',
}

const cardImages = [
  { cardImage: '/businessdedk/banner.png', images: ['/businessdedk/banner.png', '/businessdedk/badge.png', '/businessdedk/businesscard.png', '/businessdedk/newsletter.png', '/businessdedk/brochure.png', '/businessdedk/thermos.png', '/businessdedk/pen.png', '/businessdedk/social-calendar.pdf'], pdfLabel: 'View the social calendar' },
  { cardImage: '/mario/card.webp', images: ['/mario/sketch.jpeg', '/mario/poster.webp', '/mario/print.jpeg', '/mario/card.webp'] },
  { cardImage: '/core/mockup.webp', images: ['/core/logo.webp', '/core/magazine.pdf', '/core/magazine-cover.webp', '/core/mockup.webp'], pdfLabel: 'Check the magazine' },
  { cardImage: '/urbanecho/mockup.webp', images: ['/urbanecho/sketch1.jpeg', '/urbanecho/sketch2.jpeg', '/urbanecho/mockup.webp', '/urbanecho/video.mp4', '/urbanecho/video2.mp4'] },
  { cardImage: '/greenloop/mockup.webp', images: ['/greenloop/sketch.jpeg', '/greenloop/logo-green.webp', '/greenloop/mockup.webp'] },
]

const projectStyles = computed(() => {
  const base = isDay.value ? dayBase : nightBase
  return cardImages.map(img => ({ ...base, ...img }))
})

const allProjects = computed(() => {
  const ps = t('works.projects')
  return projectStyles.value.map((style, idx) => ({
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
  /* night */
  --card-title:    #1a2a4a;
  --card-text:     rgba(26,42,74,0.75);
  --works-card-bg: #f0e8d0;
  --works-title-color: #c47a15;
  --works-label-color:  #f0e8d0;
  --card-border:   rgba(26,42,74,0.15);
  --overlay-bg:    rgba(4,8,20,0.96);
  --overlay-text:  rgba(240,232,208,0.85);
}
:root[data-theme="day"] .works {
  /* day */
  --card-title:    #f0e8d0;
  --card-text:     rgba(240,232,208,0.80);
  --works-card-bg: #1a2a4a;
  --works-title-color: #1a2a4a;
  --works-label-color:  var(--red);
  --card-border:   rgba(240,232,208,0.18);
  --overlay-bg:    rgba(15,28,58,0.97);
  --overlay-text:  rgba(240,232,208,0.88);
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
  opacity: 0.80;
  margin-bottom: 0.9rem;
  color: var(--works-label-color);
}
.works__title {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: 0.02em;
  margin-bottom: 0.9rem;
  color: var(--works-title-color);
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
  border: 1px solid var(--card-border);
  background: var(--works-card-bg);
  color: var(--card-title);
  cursor: none;
  transform: rotateY(var(--angle)) translateZ(280px);
  transition: border-color 0.4s, box-shadow 0.4s;
  will-change: opacity;
}
.works-card:hover {
  border-color: var(--glow, rgba(255,255,255,0.2));
  box-shadow: 0 0 60px var(--glow, rgba(255,255,255,0.15));
}
:root[data-theme="day"] .works-card:hover {
  --works-card-bg: #f0e8d0;
  --card-title:    #1a2a4a;
  --card-text:     rgba(26,42,74,0.75);
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
.wc-img--top {
  object-position: center 60%;
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
.works-card__num   { font-size: 0.55rem; letter-spacing: 0.2em; color: var(--red); opacity: 1; }
.works-card__title { font-family: var(--font-display); font-size: 0.88rem; line-height: 1.15; letter-spacing: 0.01em; color: var(--card-title); font-weight: 700; }
.works-card__type  { font-size: 0.57rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--card-title); opacity: 1; }

.works-card__overlay {
  position: absolute;
  inset: 0;
  background: var(--overlay-bg);
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
  font-weight: 300; color: var(--overlay-text);
}
.works-card__tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.works-tag {
  font-size: 0.52rem; letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.22rem 0.55rem;
  border: 1px solid var(--glow);
  border-radius: 999px;
  color: var(--overlay-text); opacity: 0.72;
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
