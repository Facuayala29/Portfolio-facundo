<template>
  <section class="hero" id="hero" ref="heroEl">

    <!-- layered sky -->
    <div class="hero__sky" aria-hidden="true">
      <div class="sky-base"></div>
      <div class="sky-radial" :class="isDay ? 'sky-radial--day' : 'sky-radial--night'"></div>
      <div class="sky-haze"></div>
      <!-- extra illumination from celestial body direction -->
      <div class="sky-celestial-glow" :class="isDay ? 'sky-cg--day' : 'sky-cg--night'"></div>
    </div>

    <!-- noise -->
    <canvas class="hero__noise" ref="noiseEl" aria-hidden="true"></canvas>


    <!-- vignette -->
    <div class="hero__vignette" aria-hidden="true"></div>

    <!-- sparkle stars (night) -->
    <template v-if="!isDay">
      <svg v-for="s in STARS" :key="s.id" class="star"
        :style="{ left: s.x + '%', top: s.y + '%', '--delay': s.delay + 's', '--sz': s.sz + 'px' }"
        viewBox="-1 -1 2 2" aria-hidden="true">
        <path d="M0,-1 L.2,-.2 L1,0 L.2,.2 L0,1 L-.2,.2 L-1,0 L-.2,-.2Z" fill="currentColor"/>
      </svg>
    </template>

    <!-- small floating decorative accents -->

    <svg class="deco deco--b" viewBox="-1 -1 2 2" aria-hidden="true">
      <path d="M0,-1 L.2,-.2 L1,0 L.2,.2 L0,1 L-.2,.2 L-1,0 L-.2,-.2Z" fill="currentColor"/>
    </svg>

    <svg class="deco deco--d" viewBox="-1 -1 2 2" aria-hidden="true">
      <path d="M0,-1 L.14,-.14 L1,0 L.14,.14 L0,1 L-.14,.14 L-1,0 L-.14,-.14Z" fill="currentColor"/>
    </svg>

    <!-- celestial body -->
    <div class="hero__celestial" ref="celestialEl" aria-hidden="true" :class="{ 'cel--hidden': _celestialRising }">
      <div class="celestial-wrap">
        <img :src="isDay ? dayCelestial : nightCelestial" class="celestial-img" alt="" />
      </div>
    </div>

    <!-- scattered mid-sky clouds — organic blobs -->
    <svg class="hero__midclouds" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="mcf1" x="-15%" y="-60%" width="130%" height="220%"><feGaussianBlur stdDeviation="12"/></filter>
        <filter id="mcf2" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="mcf3" x="-8%"  y="-30%" width="116%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <!-- far background soft blobs -->
      <path filter="url(#mcf1)" fill="var(--cloud-fill)" opacity="0.25" d="
        M80,80 C95,60 120,50 148,58 C172,65 185,50 210,44
        C235,38 258,52 278,62 C298,72 308,55 330,50
        C355,44 378,58 395,68 L395,100 L80,100 Z"/>
      <path filter="url(#mcf1)" fill="var(--cloud-fill)" opacity="0.20" d="
        M820,65 C840,45 868,38 900,46 C928,54 945,38 975,32
        C1005,26 1032,42 1055,52 C1075,61 1088,44 1112,40
        C1138,35 1162,50 1180,62 L1180,95 L820,95 Z"/>
      <!-- mid layer blobs -->
      <path filter="url(#mcf2)" fill="var(--cloud-fill)" opacity="0.32" d="
        M150,95 C168,72 198,62 228,72 C254,80 268,62 295,55
        C322,48 348,64 370,76 C390,87 400,68 425,62
        C452,55 475,72 492,84 L492,115 L150,115 Z"/>
      <path filter="url(#mcf2)" fill="var(--cloud-fill)" opacity="0.28" d="
        M940,82 C958,60 988,52 1018,62 C1044,71 1060,54 1088,48
        C1116,42 1142,58 1162,70 C1180,80 1192,62 1218,56
        C1246,50 1270,66 1290,78 L1290,110 L940,110 Z"/>
      <!-- crisper accent blobs -->
      <path filter="url(#mcf3)" fill="var(--cloud-fill)" opacity="0.20" d="
        M400,118 C415,102 438,95 462,103 C484,110 496,96 518,91
        C542,86 564,100 582,110 L582,132 L400,132 Z"/>
      <path filter="url(#mcf3)" fill="var(--cloud-fill)" opacity="0.18" d="
        M750,105 C765,88 790,82 815,90 C838,98 852,83 876,78
        C902,72 925,88 944,100 L944,125 L750,125 Z"/>
    </svg>

    <!-- PNG cloud bottom — layered stack for depth -->
    <div class="hero__cloud-bottom" aria-hidden="true">
      <div class="cb cb--haze"></div>
      <div class="cb cb--back"></div>
      <div class="cb cb--mid-l"></div>
      <div class="cb cb--mid-r"></div>
      <div class="cb cb--tall-l"></div>
      <div class="cb cb--front-l"></div>
      <div class="cb cb--front-r"></div>
    </div>

    <!-- hero text content — centered -->
    <div class="hero__content" ref="contentEl">
      <div class="hero__text-wrap">
        <p class="hero__label">{{ t('hero.label') }}</p>
        <h1 class="hero__title">
          <span class="hero__title-main">{{ t('hero.titleMain') }}</span>
          <em class="hero__title-sub">{{ t('hero.titleSub') }}</em>
        </h1>
      </div>

      <!-- tagline floats bottom-right -->
      <div class="hero__tagline-anchor">
        <p class="hero__tagline"
           :style="isDay ? { color: '#1B263B', opacity: '0.95', textShadow: 'none' } : {}">{{ tagline }}</p>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useTheme, _celestialRising } from '../composables/useTheme.js'
import { useI18n } from '../composables/useI18n.js'
import dayCelestial   from '../assets/img/celestial_sun.png'
import nightCelestial from '../assets/img/celestial_moon.png'

const { theme, isDay } = useTheme()
const { t } = useI18n()

const tagline = computed(() =>
  isDay.value
    ? t('hero.taglineDay')
    : t('hero.taglineNight')
)

const heroEl      = ref(null)
const noiseEl     = ref(null)
const celestialEl = ref(null)
const contentEl   = ref(null)

const STARS = [
  { id:1,  x:7,  y:5,  delay:0.0, sz:9  },
  { id:2,  x:21, y:12, delay:0.8, sz:6  },
  { id:3,  x:36, y:4,  delay:1.5, sz:7  },
  { id:4,  x:52, y:9,  delay:0.3, sz:5  },
  { id:5,  x:66, y:3,  delay:1.2, sz:10 },
  { id:6,  x:13, y:20, delay:1.9, sz:5  },
  { id:7,  x:44, y:16, delay:0.6, sz:7  },
  { id:8,  x:28, y:26, delay:2.2, sz:5  },
  { id:9,  x:60, y:19, delay:1.0, sz:8  },
  { id:10, x:77, y:7,  delay:1.7, sz:6  },
  { id:11, x:85, y:18, delay:0.9, sz:5  },
  { id:12, x:8,  y:32, delay:2.5, sz:4  },
]

// parallax
let mx = 0, my = 0, lx = 0, ly = 0, raf = null
let visible = false

function lerp(a, b, t) { return a + (b - a) * t }

function loop() {
  lx = lerp(lx, mx, 0.055)
  ly = lerp(ly, my, 0.055)
  if (celestialEl.value) {
    celestialEl.value.style.transform = `translate(${lx * 22}px, ${ly * 16}px)`
  }
  raf = requestAnimationFrame(loop)
}

function onMouse(e) {
  if (!visible) return
  const r = heroEl.value?.getBoundingClientRect()
  if (!r) return
  mx = ((e.clientX - r.left) / r.width  - 0.5) * 2
  my = ((e.clientY - r.top)  / r.height - 0.5) * 2
}

function onScroll() {
  if (!heroEl.value || !contentEl.value) return
  const p = Math.min(window.scrollY / (heroEl.value.offsetHeight * 0.5), 1)
  contentEl.value.style.opacity   = String(1 - p * 0.8)
  contentEl.value.style.transform = `translateY(${-p * 35}px)`
}

function initNoiseCanvas(canvasRef, alpha, speed) {
  const c = canvasRef.value
  if (!c) return
  const ctx = c.getContext('2d')
  let id = null
  let frame = 0
  const resize = () => {
    c.width  = Math.ceil(window.innerWidth  / 2)
    c.height = Math.ceil(window.innerHeight / 2)
    c.style.width  = window.innerWidth  + 'px'
    c.style.height = window.innerHeight + 'px'
  }
  resize()
  window.addEventListener('resize', resize)
  const draw = () => {
    frame++
    if (frame % speed === 0) {
      const w = c.width, h = c.height
      const img = ctx.createImageData(w, h)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        img.data[i] = img.data[i+1] = img.data[i+2] = v
        img.data[i+3] = alpha
      }
      ctx.putImageData(img, 0, 0)
    }
    id = requestAnimationFrame(draw)
  }
  draw()
  c._stop = () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
}

let obs = null

// reset parallax and hide celestial during toggle animation
watch(_celestialRising, (rising) => {
  if (rising) {
    mx = 0; my = 0; lx = 0; ly = 0
    if (celestialEl.value) celestialEl.value.style.transform = ''
  }
})
onMounted(() => {
  initNoiseCanvas(noiseEl, 18, 1)   // fast fine grain
  raf = requestAnimationFrame(loop)
  window.addEventListener('mousemove', onMouse, { passive: true })
  window.addEventListener('scroll',    onScroll, { passive: true })
  obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.1 })
  if (heroEl.value) obs.observe(heroEl.value)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMouse)
  window.removeEventListener('scroll', onScroll)
  obs?.disconnect()
  noiseEl.value?._stop?.()
})
</script>

<style scoped>
/* ── shell ─────────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 620px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── sky layers ────────────────────────────────────────────────────────────── */
.hero__sky { position: absolute; inset: 0; z-index: 0; }

.sky-base {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 58%, var(--sky-bot) 100%);
}
.sky-radial {
  position: absolute; inset: 0;
}
.sky-radial--night {
  background:
    radial-gradient(ellipse 55% 45% at 78% 14%, rgba(80,120,255,.20) 0%, transparent 70%),
    radial-gradient(ellipse 40% 35% at 20% 80%, rgba(20,60,160,.22) 0%, transparent 65%);
}
.sky-radial--day {
  background:
    radial-gradient(ellipse 60% 55% at 78% 12%, rgba(255,200,60,.48) 0%, transparent 68%),
    radial-gradient(ellipse 80% 40% at 50% 90%, rgba(255,130,30,.32) 0%, transparent 60%);
}
.sky-haze {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 100% 50% at 50% 100%, var(--sky-bot) 0%, transparent 65%);
  opacity: 0.75;
}
/* celestial body area illumination */
.sky-celestial-glow {
  position: absolute; inset: 0;
  pointer-events: none;
}
.sky-cg--night {
  background: radial-gradient(ellipse 38% 32% at 83% 18%, rgba(200,175,80,.18) 0%, transparent 72%);
}
.sky-cg--day {
  background: radial-gradient(ellipse 42% 36% at 82% 16%, rgba(255,210,80,.38) 0%, transparent 72%);
}

/* ── noise canvases ────────────────────────────────────────────────────────── */
.hero__noise {
  position: absolute; inset: 0;
  pointer-events: none; z-index: 9;
  mix-blend-mode: overlay; opacity: 0.40;
  image-rendering: pixelated;

}


/* ── vignette ──────────────────────────────────────────────────────────────── */
.hero__vignette {
  position: absolute; inset: 0; z-index: 8;
  background:
    radial-gradient(ellipse 85% 85% at 50% 50%, transparent 45%, rgba(0,0,0,.55) 100%),
    linear-gradient(to bottom, rgba(0,0,0,.18) 0%, transparent 25%, transparent 70%, rgba(0,0,0,.25) 100%);
  pointer-events: none;
}

/* ── sparkle stars ─────────────────────────────────────────────────────────── */
.star {
  position: absolute;
  width: var(--sz, 9px); height: var(--sz, 9px);
  color: var(--star-color);
  animation: twinkle 3.2s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  z-index: 2; pointer-events: none;
}
@keyframes twinkle {
  0%,100% { opacity:.9; transform:scale(1); }
  50%      { opacity:.2; transform:scale(.65); }
}

/* ── decorative accents ────────────────────────────────────────────────────── */
.deco {
  position: absolute; pointer-events: none;
  color: var(--star-color); opacity: .35; z-index: 3;
}
.deco--b { width:14px; height:14px; left:88%; top:55%; animation:twinkle 4s ease-in-out infinite 1s; }
.deco--d { width:10px; height:10px; left:92%; top:30%; animation:twinkle 3.5s ease-in-out infinite 2s; }


/* ── celestial ─────────────────────────────────────────────────────────────── */
.hero__celestial {
  position: absolute;
  top: clamp(2.5rem, 7vh, 5.5rem);
  right: clamp(1.5rem, 5vw, 6rem);
  width: clamp(168px, 21vw, 270px);
  height: clamp(168px, 21vw, 270px);
  z-index: 10; /* above noise (9) and vignette (8) so rendering matches CelestialRise */
  will-change: transform;
}
.celestial-wrap {
  position: relative;
  width: 100%; height: 100%;
}
.celestial-img {
  width: 100%; height: 100%;
  object-fit: contain;
  position: relative; z-index: 1;
  filter: drop-shadow(0 0 28px var(--celestial-glow))
          drop-shadow(0 0 65px var(--celestial-glow));
}



/* ── mid clouds ────────────────────────────────────────────────────────────── */
.hero__midclouds {
  position: absolute; top: 0; left: 0; right: 0;
  height: 45%; z-index: 2; pointer-events: none;
  opacity: 0;
  animation: cloud-fadein 2.2s ease 0.4s forwards;
}
.hero__cloud-bottom {
  /* animation defined in cloud-bottom block */
}
@keyframes cloud-fadein {
  to { opacity: 1; }
}

/* ── PNG cloud bottom ──────────────────────────────────────────────────────── */
/* shared mask setup */
.cb {
  position: absolute;
  -webkit-mask-image: url('../assets/img/cloud_loader.png');
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: bottom center;
  mask-image: url('../assets/img/cloud_loader.png');
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  mask-position: bottom center;
}

.hero__cloud-bottom {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 0;
  z-index: 6; pointer-events: none;
  animation: cloud-fadein 2.8s ease 0.7s both;
}

/* ── atmospheric haze — deepest, widest, very blurred ── */
.cb--haze {
  width: 130%; left: -15%; bottom: -4vh;
  height: clamp(90px, 20vw, 180px);
  background: var(--cloud-fill);
  opacity: 0.12; filter: blur(18px);
}
/* ── back wide baseline ── */
.cb--back {
  width: 115%; left: -7%; bottom: -2vh;
  height: clamp(70px, 16vw, 150px);
  background: var(--cloud-fill);
  opacity: 0.22; filter: blur(7px);
}
/* ── mid left bank ── */
.cb--mid-l {
  width: 80%; left: -10%; bottom: -1vh;
  height: clamp(90px, 20vw, 180px);
  background: var(--cloud-fill);
  opacity: 0.48; filter: blur(3px);
}
/* ── mid right bank, flipped ── */
.cb--mid-r {
  width: 72%; right: -8%; bottom: 0;
  height: clamp(80px, 17vw, 155px);
  background: var(--cloud-fill);
  opacity: 0.40; filter: blur(4px);
  transform: scaleX(-1);
}
/* ── tall left pillar — main dramatic peak ── */
.cb--tall-l {
  width: 55%; left: -6%; bottom: 0;
  height: clamp(120px, 26vw, 220px);
  background: var(--cloud-fill-2);
  opacity: 0.72;
}
/* ── front left crisp layer ── */
.cb--front-l {
  width: 62%; left: -4%; bottom: 0;
  height: clamp(80px, 18vw, 165px);
  background: var(--cloud-fill-2);
  opacity: 0.90;
}
/* ── front right crisp, flipped ── */
.cb--front-r {
  width: 54%; right: -3%; bottom: 0;
  height: clamp(60px, 13vw, 118px);
  background: var(--cloud-fill-2);
  opacity: 0.82;
  transform: scaleX(-1);
}

/* ── day-mode text ─────────────────────────────────────────────────────────── */
/* ── text content ──────────────────────────────────────────────────────────── */
.hero__content {
  position: absolute; inset: 0; z-index: 11;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  will-change: opacity, transform;
  pointer-events: none;
}

.hero__text-wrap {
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  gap: 0;
  filter: brightness(1.10);
}

.hero__label {
  font-family: var(--font-hero);
  font-style: italic;
  font-size: clamp(1rem, 2.2vw, 1.6rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: #f0e8d0;
  opacity: 0.92;
  margin-bottom: 0.1em;
  transform: translateX(clamp(-10rem, -18vw, -24rem));
}

.hero__title {
  display: flex; flex-direction: column;
  align-items: center; gap: 0;
  line-height: 0.9;
}

.hero__title-main {
  font-family: var(--font-hero);
  font-weight: 800;
  font-style: normal;
  font-size: clamp(4rem, 12vw, 11rem);
  letter-spacing: -0.03em;
  color: #f0e8d0;
  text-shadow:
    0 2px 22px rgba(0,0,0,.22),
    0 0  44px var(--celestial-glow),
    0 0  90px rgba(240,232,208,0.13);
  display: block;
}

.hero__title-sub {
  font-family: var(--font-hero);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(2rem, 5.5vw, 5rem);
  letter-spacing: 0.05em;
  color: #f0e8d0;
  opacity: 1.0;
  display: block;
  transform: translateX(clamp(2rem, 5vw, 6rem));
}

/* tagline — floats bottom right of the viewport */
.hero__tagline-anchor {
  position: absolute;
  bottom: clamp(2.5rem, 7vh, 5rem);
  right: clamp(2rem, 5vw, 5rem);
  text-align: right;
}
.hero__tagline {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.6vw, 1.25rem);
  font-weight: 500;
  letter-spacing: 0.06em;
  color: #f0e8d0;
  opacity: 0.88;
  white-space: nowrap;
  text-shadow: 0 1px 12px rgba(0,0,0,.45);
}



/* ── responsive ────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .hero__celestial { width: clamp(108px, 26vw, 165px); height: clamp(108px, 26vw, 165px); }
  .hero__label     { transform: none; }
  .hero__title-sub { transform: none; }
  .hero__tagline-anchor { right: 1.5rem; }
}

/* hide hero celestial during toggle animation */
.cel--hidden { visibility: hidden; }

/* ── day-mode text — remove glow shadows on bright sky ── */
:global([data-theme="day"]) .hero__title-main { text-shadow: none; }

</style>
