<template>
  <section class="contact" id="contact" ref="sectionEl">

    <!-- sky layer (matches hero) -->
    <div class="contact__sky" aria-hidden="true">
      <div class="csky-base"></div>
      <div class="csky-haze"></div>
      <div class="csky-glow" :class="isDay ? 'csky-glow--day' : 'csky-glow--night'"></div>
    </div>

    <!-- noise / grain canvas -->
    <canvas class="contact__noise" ref="noiseEl" aria-hidden="true"></canvas>

    <!-- vignette -->
    <div class="contact__vignette" aria-hidden="true"></div>

    <!-- floating stars (night only) -->
    <template v-if="!isDay">
      <svg v-for="s in STARS" :key="s.id" class="cstar"
        :style="{ left: s.x + '%', top: s.y + '%', '--delay': s.delay + 's', '--sz': s.sz + 'px' }"
        viewBox="-1 -1 2 2" aria-hidden="true">
        <path d="M0,-1 L.2,-.2 L1,0 L.2,.2 L0,1 L-.2,.2 L-1,0 L-.2,-.2Z" fill="currentColor"/>
      </svg>
    </template>

    <!-- text content -->
    <div class="contact__content">

      <div class="h-row h-row--left" data-reveal="up" data-delay="0">
        <span class="h-small">{{ t('contact.small') }}</span>
      </div>

      <div class="h-row h-row--center" data-reveal="up" data-delay="0.1">
        <span class="h-huge">{{ t('contact.huge') }}</span>
      </div>

      <div class="h-row h-row--right" data-reveal="up" data-delay="0.18">
        <span class="h-mid"><em>{{ t('contact.mid') }}</em></span>
      </div>

      <div class="h-row h-row--center h-row--cta" data-reveal="up" data-delay="0.28">
        <span class="h-call">{{ t('contact.call') }}</span>
      </div>

      <div class="contact__cta" data-reveal="up" data-delay="0.4">
        <a href="mailto:facuayala29@gmail.com" class="contact__email">
          <span class="email-text">facuayala29@gmail.com</span>
          <span class="email-arrow">↗</span>
        </a>
      </div>

    </div>

        <!-- horizon / ground (mirrors hero cloud aesthetic) -->
    <div class="contact__horizon" aria-hidden="true">
      <div class="ch-ground"></div>
      <div class="ch ch--haze"></div>
      <div class="ch ch--back"></div>
      <div class="ch ch--mid-l"></div>
      <div class="ch ch--mid-r"></div>
      <div class="ch ch--tall-l"></div>
      <div class="ch ch--front-l"></div>
      <div class="ch ch--front-r"></div>
    </div>

    <!-- footer -->
    <footer class="site-footer">
      <div class="footer-icons">
        <a href="https://www.linkedin.com/in/facundo-munoz-ayala/" target="_blank" rel="noopener" class="footer-icon-link" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="mailto:facuayala29@gmail.com" class="footer-icon-link" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </a>
      </div>
      <p class="footer-copy">© 2025 Facundo Ayala Muñoz</p>
    </footer>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { useTheme } from '../composables/useTheme.js'

const { isDay } = useTheme()
const { t } = useI18n()
const sectionEl = ref(null)
const noiseEl   = ref(null)

const STARS = [
  { id:1, x:12, y:8,  delay:0.3, sz:7 },
  { id:2, x:35, y:5,  delay:1.1, sz:5 },
  { id:3, x:58, y:10, delay:0.7, sz:8 },
  { id:4, x:80, y:6,  delay:1.6, sz:6 },
  { id:5, x:92, y:12, delay:0.4, sz:5 },
  { id:6, x:24, y:18, delay:2.0, sz:4 },
  { id:7, x:68, y:16, delay:1.3, sz:6 },
]

function initNoise() {
  const c = noiseEl.value
  if (!c) return
  const ctx = c.getContext('2d')
  let id = null
  const resize = () => {
    c.width  = Math.ceil(window.innerWidth  / 2)
    c.height = Math.ceil(window.innerHeight / 2)
    c.style.width  = window.innerWidth  + 'px'
    c.style.height = window.innerHeight + 'px'
  }
  resize()
  window.addEventListener('resize', resize)
  let frame = 0
  const draw = () => {
    frame++
    if (frame % 2 === 0) {
      const w = c.width, h = c.height
      const img = ctx.createImageData(w, h)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        img.data[i] = img.data[i+1] = img.data[i+2] = v
        img.data[i+3] = 16
      }
      ctx.putImageData(img, 0, 0)
    }
    id = requestAnimationFrame(draw)
  }
  draw()
  c._stop = () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
}

onMounted(() => { initNoise() })
onUnmounted(() => { noiseEl.value?._stop?.() })
</script>

<style scoped>
/* ── shell ────────────────────────────────────────────────────────────────── */
.contact {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

}

/* ── sky ──────────────────────────────────────────────────────────────────── */
.contact__sky { position: absolute; inset: 0; z-index: 0; }
.csky-base {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 58%, var(--sky-bot) 100%);
  transition: background 1.5s ease;
}
.csky-haze {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 100% 50% at 50% 100%, var(--sky-bot) 0%, transparent 65%);
  opacity: 0.75; transition: background 1.5s ease;
}
.csky-glow { position: absolute; inset: 0; transition: opacity 1.5s ease; }
.csky-glow--night {
  background: radial-gradient(ellipse 40% 35% at 15% 20%, rgba(60,90,200,.15) 0%, transparent 65%);
}
.csky-glow--day {
  background:
    radial-gradient(ellipse 55% 45% at 82% 15%, rgba(255,200,60,.40) 0%, transparent 68%),
    radial-gradient(ellipse 75% 38% at 50% 92%, rgba(255,130,30,.28) 0%, transparent 60%);
}

/* ── noise ────────────────────────────────────────────────────────────────── */
.contact__noise {
  position: absolute; inset: 0; pointer-events: none; z-index: 9;
  mix-blend-mode: overlay; opacity: 0.35; image-rendering: pixelated;
}

/* ── vignette ─────────────────────────────────────────────────────────────── */
.contact__vignette {
  position: absolute; inset: 0; z-index: 8;
  background:
    radial-gradient(ellipse 85% 85% at 50% 50%, transparent 45%, rgba(0,0,0,.45) 100%),
    linear-gradient(to bottom, rgba(0,0,0,.12) 0%, transparent 25%, transparent 65%, rgba(0,0,0,.22) 100%);
  pointer-events: none;
}

/* ── stars ────────────────────────────────────────────────────────────────── */
.cstar {
  position: absolute;
  width: var(--sz,8px); height: var(--sz,8px);
  color: var(--star-color);
  animation: ctwinkle 3.5s ease-in-out infinite;
  animation-delay: var(--delay,0s);
  z-index: 2; pointer-events: none;
}
@keyframes ctwinkle {
  0%,100% { opacity:.85; transform:scale(1); }
  50%      { opacity:.15; transform:scale(.6); }
}

/* ── text content ─────────────────────────────────────────────────────────── */
.contact__content {
  position: relative; z-index: 10;
  padding: clamp(7rem, 14vh, 11rem) clamp(2rem, 6vw, 7rem) 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

/* ── editorial rows ── */
.h-row { display: flex; align-items: baseline; line-height: 1; }
.h-row--left   { justify-content: flex-start; gap: 1.4rem; align-items: center; margin-bottom: 0.4rem; padding-left: 22vw; }
.h-row--center { justify-content: center; }
.h-row--right  { justify-content: flex-end; padding-right: 10vw; }
.h-row--cta    { margin-top: 0.6rem; margin-bottom: 4.5rem; }

.h-small {
  font-family: var(--font-body);
  font-style: italic;
  font-size: clamp(1rem, 2.2vw, 1.7rem);
  color: #f0e8d0;
  opacity: 0.55;
  letter-spacing: 0.02em;
}
.h-huge {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 11vw, 10rem);
  line-height: 0.86;
  letter-spacing: -0.04em;
  color: #f0e8d0;
  text-transform: uppercase;
  text-shadow: none;
}
.h-mid {
  font-family: var(--font-body);
  font-style: italic;
  font-size: clamp(1.2rem, 3vw, 2.6rem);
  color: var(--red);
  letter-spacing: 0.01em;
  opacity: 0.9;
}
.h-call {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2.4rem, 5.5vw, 5rem);
  color: #f0e8d0;
  opacity: 1;
  letter-spacing: -0.02em;
}

:root[data-theme="day"] .h-huge  { color: #0e1a35; text-shadow: 0 2px 24px rgba(255,180,60,.25); }
:root[data-theme="day"] .h-small { color: #0e1a35; }
:root[data-theme="day"] .h-call  { color: #0e1a35; }

.contact__cta { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; width: 100%; }

.contact__email {
  display: inline-flex; align-items: center; gap: 0.6rem;
  text-decoration: none;
  color: #f0e8d0;
  width: fit-content;
  transition: gap 0.25s ease, opacity 0.2s;
}
:root[data-theme="day"] .contact__email { color: #0e1a35; }
.contact__email:hover { gap: 1rem; opacity: 0.82; }

.email-text {
  font-family: var(--font-body);
  font-size: clamp(0.88rem, 1.6vw, 1.2rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.1em;
}
.email-arrow {
  font-size: 1.1em;
  line-height: 1;
  transition: transform 0.25s ease;
}
.contact__email:hover .email-arrow { transform: translate(3px, -3px); }

/* ── horizon / ground ────────────────────────────────────────────────────────── */
.contact__horizon {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: clamp(220px, 48vh, 520px);
  z-index: 6; pointer-events: none;
  --ch-ground: #08060200;
}
:root[data-theme="day"] .contact__horizon {
  --ch-ground: #1a3a0800;
}

/* flat ground fill that fades up into transparency */
.ch-ground {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 38%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--ch-ground, transparent) 100%
  );
}

/* shared PNG mask — same cloud asset as hero */
.ch {
  position: absolute;
  -webkit-mask-image: url('../assets/img/cloud_loader.png');
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: bottom center;
  mask-image: url('../assets/img/cloud_loader.png');
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  mask-position: bottom center;
  transition: background 1.5s ease, opacity 1.5s ease;
}

/* atmospheric haze — widest, softest, deepest back */
.ch--haze {
  width: 132%; left: -16%; bottom: 0;
  height: clamp(100px, 22vw, 200px);
  background: var(--cloud-fill);
  opacity: 0.14; filter: blur(20px);
}
/* wide baseline bank */
.ch--back {
  width: 120%; left: -10%; bottom: 0;
  height: clamp(75px, 17vw, 158px);
  background: var(--cloud-fill);
  opacity: 0.24; filter: blur(8px);
}
/* mid left rolling bank */
.ch--mid-l {
  width: 82%; left: -8%; bottom: 0;
  height: clamp(100px, 22vw, 195px);
  background: var(--cloud-fill);
  opacity: 0.46; filter: blur(4px);
}
/* mid right bank, mirrored */
.ch--mid-r {
  width: 75%; right: -7%; bottom: 0;
  height: clamp(85px, 19vw, 170px);
  background: var(--cloud-fill);
  opacity: 0.36; filter: blur(5px);
  transform: scaleX(-1);
}
/* tall left dramatic peak */
.ch--tall-l {
  width: 58%; left: -5%; bottom: 0;
  height: clamp(140px, 31vw, 280px);
  background: var(--cloud-fill-2);
  opacity: 0.70;
}
/* front left crisp layer */
.ch--front-l {
  width: 66%; left: -4%; bottom: 0;
  height: clamp(88px, 20vw, 175px);
  background: var(--cloud-fill-2);
  opacity: 0.88;
}
/* front right crisp, mirrored */
.ch--front-r {
  width: 56%; right: -2%; bottom: 0;
  height: clamp(68px, 15vw, 130px);
  background: var(--cloud-fill-2);
  opacity: 0.80;
  transform: scaleX(-1);
}

/* ── footer ───────────────────────────────────────────────────────────────── */
.site-footer {
  position: relative; z-index: 12;
  margin-top: auto;
  padding: 1.5rem clamp(2rem, 8vw, 9rem) clamp(1.5rem, 3vh, 2.5rem);
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
}
.footer-icons {
  display: flex; align-items: center; gap: 1.2rem;
}
.footer-icon-link {
  display: flex;
  color: #f0e8d0;
  opacity: 0.40;
  transition: opacity 0.2s, transform 0.2s;
}
:root[data-theme="day"] .footer-icon-link { color: #1a2a4a; }
.footer-icon-link:hover { opacity: 1; transform: translateY(-3px); }
.footer-icon-link svg { width: 26px; height: 26px; }
.footer-copy {
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: #f0e8d0;
  opacity: 0.22;
}
:root[data-theme="day"] .footer-copy { color: #1a2a4a; }

/* ── responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .contact__content { padding: 4rem 1.5rem 1.5rem; }
  .site-footer       { padding: 1rem 1.5rem 1.5rem; }
}
</style>
