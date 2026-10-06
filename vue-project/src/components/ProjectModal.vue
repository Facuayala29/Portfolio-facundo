<template>
  <Transition name="modal">
    <div v-if="project" class="modal-overlay" @click.self="$emit('close')" role="dialog" aria-modal="true">
      <div class="modal-panel">

        <button class="modal-close" @click="$emit('close')" aria-label="Close">
          <span></span><span></span>
        </button>


        <div class="modal-body">
          <p class="modal-type">{{ project.i18n.type }}</p>
          <h2 class="modal-title">{{ project.i18n.title }}</h2>

          <div class="modal-section">
            <span class="modal-section__label">{{ t('modal.brief') }}</span>
            <p class="modal-section__text">{{ project.i18n.desc }}</p>
          </div>

          <div class="modal-section">
            <span class="modal-section__label">{{ t('modal.objective') }}</span>
            <p class="modal-section__text">{{ project.i18n.objective }}</p>
          </div>

          <div v-if="project.i18n.process" class="modal-section">
            <span class="modal-section__label">{{ t('modal.process') }}</span>
            <p class="modal-section__text">{{ project.i18n.process }}</p>
            <div v-if="project.i18n.tools?.length" class="modal-tools">
              <span class="modal-tools__label">{{ t('modal.tools') }}</span>
              <span v-for="tool in project.i18n.tools" :key="tool" class="modal-tag">{{ tool }}</span>
            </div>
          </div>

          <div class="modal-section">
            <span class="modal-section__label">{{ t('modal.sketches') }}</span>
            <template v-if="stackItems.length">
              <div
                ref="stageEl"
                class="stack"
                @pointerdown="onPointerDown"
                @pointerup="onPointerUp"
                @pointercancel="swipeX = null"
              >
                <button
                  v-for="(src, i) in stackItems"
                  :key="src"
                  type="button"
                  class="stack-card"
                  :class="{ 'is-front': depthOf(i) === 0, 'is-hidden': depthOf(i) > MAX_BEHIND }"
                  :style="cardStyle(i)"
                  :tabindex="depthOf(i) > MAX_BEHIND ? -1 : 0"
                  :aria-label="depthOf(i) === 0 ? (isVideo(src) ? 'Play video' : 'Next image') : `Show image ${i + 1}`"
                  @click="onCardClick(i)"
                >
                  <video v-if="isVideo(src)" :src="src + '#t=0.1'" class="stack-media" :style="mediaStyle(i)" muted playsinline preload="metadata" @loadedmetadata="e => setRatio(src, e.target.videoWidth, e.target.videoHeight)" />
                  <img v-else :src="src" class="stack-media" :style="mediaStyle(i)" :alt="`${project.i18n.title} ${i + 1}`" decoding="async" draggable="false" @load="e => setRatio(src, e.target.naturalWidth, e.target.naturalHeight)" />
                  <span v-if="isVideo(src)" class="stack-play">▶</span>
                </button>

                <button v-if="stackItems.length > 1" type="button" class="stack-nav stack-nav--prev" aria-label="Previous" @click.stop="prev">‹</button>
                <button v-if="stackItems.length > 1" type="button" class="stack-nav stack-nav--next" aria-label="Next" @click.stop="next">›</button>
              </div>

              <div class="stack-bar">
                <span class="stack-counter">{{ pad(current + 1) }} / {{ pad(stackItems.length) }}</span>
                <div class="stack-actions">
                  <a v-for="pdf in pdfItems" :key="pdf" :href="pdf" target="_blank" rel="noopener" class="stack-action stack-action--pdf">
                    <span class="stack-action__badge">PDF</span>{{ project.i18n.pdfLabel || 'View PDF' }} ↗
                  </a>
                  <button type="button" class="stack-action" @click="lightboxIdx = current">{{ t('modal.zoom') }} ↗</button>
                </div>
              </div>
            </template>
            <div v-else-if="pdfItems.length" class="stack-actions">
              <a v-for="pdf in pdfItems" :key="pdf" :href="pdf" target="_blank" rel="noopener" class="stack-action stack-action--pdf">
                <span class="stack-action__badge">PDF</span>{{ project.i18n.pdfLabel || 'View PDF' }} ↗
              </a>
            </div>
          </div>

          <div class="modal-section">
            <span class="modal-section__label">{{ t('modal.outcome') }}</span>
            <p class="modal-section__text">{{ project.i18n.outcome }}</p>
          </div>

          <div class="modal-tags">
            <span v-for="tag in project.i18n.tags" :key="tag" class="modal-tag">{{ tag }}</span>
          </div>
        </div>

      </div>
    </div>
  </Transition>

  <Transition name="lightbox">
    <div v-if="lightboxIdx !== null" class="lightbox" @click="lightboxIdx = null">
      <button class="lightbox-close" @click="lightboxIdx = null" aria-label="Close"><span></span><span></span></button>
      <div class="lightbox-frame" @click.stop>
        <button v-if="lightboxIdx > 0" class="lightbox-nav lightbox-nav--prev" @click="lightboxIdx--" aria-label="Previous">‹</button>
        <video v-if="lightboxImages[lightboxIdx].endsWith('.mp4')" :src="lightboxImages[lightboxIdx]" class="lightbox-img" controls autoplay loop />
        <img v-else :src="lightboxImages[lightboxIdx]" class="lightbox-img" alt="" />
        <button v-if="lightboxIdx < lightboxImages.length - 1" class="lightbox-nav lightbox-nav--next" @click="lightboxIdx++" aria-label="Next">›</button>
      </div>
      <span class="lightbox-counter">{{ lightboxIdx + 1 }} / {{ lightboxImages.length }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'
const props = defineProps({ project: { type: Object, default: null } })
defineEmits(['close'])

const { t } = useI18n()

const isVideo = src => src.endsWith('.mp4')
const isPdf = src => src.endsWith('.pdf')

// everything that can sit in the stack (images + videos); PDFs become links below it
const stackItems = computed(() => (props.project?.images ?? []).filter(s => !isPdf(s)))
const pdfItems = computed(() => (props.project?.images ?? []).filter(isPdf))
const lightboxImages = stackItems

const lightboxIdx = ref(null)
const current = ref(0)
const MAX_BEHIND = 3

watch(() => props.project, () => { current.value = 0; lightboxIdx.value = null })
// closing the lightbox leaves the stack on the image you were looking at
watch(lightboxIdx, i => { if (i !== null) current.value = i })

const pad = n => String(n).padStart(2, '0')

// how many steps behind the front card this one sits (0 = front)
function depthOf(i) {
  const n = stackItems.value.length
  return n ? (current.value - i + n) % n : 0
}

// each photo keeps its own tilt, so the pile looks tossed rather than fanned
function tiltOf(i) {
  const v = ((i * 37 + 11) % 7) - 3
  return (v === 0 ? 2 : v) * 1.5
}

// ---- layout: sizes are computed so every card behind is guaranteed to peek out ----
const stageEl = ref(null)
const stageW = ref(616)
const stageH = ref(380)
const ratios = ref({})   // src -> width / height, filled in as media loads
const PAD = 5            // card frame around the media, matches .stack-card padding

function setRatio(src, w, h) { if (w && h) ratios.value = { ...ratios.value, [src]: w / h } }

// rendered media size for item i: as big as fits the stage, keeping its own proportions
function sizeOf(i) {
  const r = ratios.value[stackItems.value[i]] || 1.4
  const maxW = Math.min(440, stageW.value * 0.72)
  const maxH = stageH.value * 0.87
  const h = Math.min(maxH, maxW / r)
  return { w: h * r, h }
}
function mediaStyle(i) {
  const { w, h } = sizeOf(i)
  return { width: `${Math.round(w)}px`, height: `${Math.round(h)}px` }
}

// depth -> which side it leans to, how much of it shows, how small it gets
const BEHIND = [
  null,
  { side: -1, peek: 72, s: 0.9,  y: -10 },
  { side: 1,  peek: 60, s: 0.84, y: 12 },
  { side: -1, peek: 26, s: 0.78, y: 0 },
]

function cardStyle(i) {
  const n = stackItems.value.length
  const d = depthOf(i)
  if (d === 0) return { transform: 'translate(-50%, -50%)', zIndex: n + 1 }
  const front = sizeOf(current.value)
  const me = sizeOf(i)
  if (d > MAX_BEHIND) {
    // waiting at the bottom of the pile, about to come round to the front
    return { transform: 'translate(-50%, -50%) translate(40px, 16px) rotate(7deg) scale(0.74)', zIndex: 0 }
  }
  const b = BEHIND[d]
  const halfMe = (me.w + PAD * 2) * b.s / 2
  const halfFront = (front.w + PAD * 2) / 2
  let x, y = b.y
  if (d === 3) {
    // third one back peeks over the top edge instead of the sides
    x = b.side * 24
    y = -Math.max(18, (front.h + PAD * 2) / 2 + b.peek - (me.h + PAD * 2) * b.s / 2)
  } else {
    x = Math.max(36, halfFront + b.peek - halfMe)
    x = Math.min(x, Math.max(36, stageW.value / 2 - halfMe + 6))   // never spill out of the modal
    x *= b.side
  }
  return {
    transform: `translate(-50%, -50%) translate(${Math.round(x)}px, ${Math.round(y)}px) rotate(${tiltOf(i)}deg) scale(${b.s})`,
    zIndex: n - d,
  }
}

function next() { const n = stackItems.value.length; if (n > 1) current.value = (current.value + 1) % n }
function prev() { const n = stackItems.value.length; if (n > 1) current.value = (current.value - 1 + n) % n }

let swiped = false
function onCardClick(i) {
  if (swiped) { swiped = false; return }
  if (depthOf(i) !== 0) { current.value = i; return }
  if (isVideo(stackItems.value[i]) || stackItems.value.length < 2) { lightboxIdx.value = i; return }
  next()
}

const swipeX = ref(null)
function onPointerDown(e) { swipeX.value = e.clientX; swiped = false }
function onPointerUp(e) {
  if (swipeX.value === null) return
  const dx = e.clientX - swipeX.value
  swipeX.value = null
  if (Math.abs(dx) < 45) return
  swiped = true
  dx < 0 ? next() : prev()
  setTimeout(() => { swiped = false }, 0)
}

function onKey(e) {
  if (!props.project) return
  const n = stackItems.value.length
  if (lightboxIdx.value !== null) {
    if (e.key === 'Escape') lightboxIdx.value = null
    else if (e.key === 'ArrowRight' && lightboxIdx.value < n - 1) lightboxIdx.value++
    else if (e.key === 'ArrowLeft' && lightboxIdx.value > 0) lightboxIdx.value--
    return
  }
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}
let ro = null
watch(stageEl, el => {
  ro?.disconnect()
  if (!el) return
  const measure = () => { stageW.value = el.clientWidth; stageH.value = el.clientHeight }
  measure()
  if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(measure); ro.observe(el) }
})
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => { window.removeEventListener('keydown', onKey); ro?.disconnect() })
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 5000;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal-panel {
  position: relative;
  width: 100%;
  max-width: 680px;
  min-height: 75vh;
  max-height: 96vh;
  background: #f0e8d0;
  border: 1px solid rgba(26,42,74,0.14);
  border-bottom: none;
  border-radius: 1.4rem 1.4rem 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
:root[data-theme="day"] .modal-panel {
  background: #1a2a4a;
  border-color: rgba(240,232,208,0.12);
}
:root[data-theme="day"] .modal-title { color: #f0e8d0; }
:root[data-theme="day"] .modal-section__text { color: rgba(240,232,208,0.75); }
:root[data-theme="day"] .modal-section { border-top-color: rgba(240,232,208,0.10); }
:root[data-theme="day"] .modal-tags { border-top-color: rgba(240,232,208,0.10); }
:root[data-theme="day"] .modal-tag { border-color: rgba(240,232,208,0.18); color: rgba(240,232,208,0.65); }
:root[data-theme="day"] .modal-close { background: rgba(240,232,208,0.10); border-color: rgba(240,232,208,0.20); }
:root[data-theme="day"] .modal-close span { background: rgba(240,232,208,0.80); }
:root[data-theme="day"] .modal-close:hover { background: rgba(240,232,208,0.18); }

.modal-close {
  position: absolute;
  top: 1.2rem;
  right: 1.4rem;
  width: 32px;
  height: 32px;
  background: rgba(26,42,74,0.08);
  border: 1px solid rgba(26,42,74,0.18);
  border-radius: 50%;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s;
}
.modal-close:hover { background: rgba(26,42,74,0.14); }
.modal-close span {
  position: absolute;
  width: 12px; height: 1.5px;
  background: rgba(26,42,74,0.75);
  border-radius: 2px;
}
.modal-close span:first-child { transform: rotate(45deg); }
.modal-close span:last-child { transform: rotate(-45deg); }



.modal-body {
  padding: 2rem 2rem 2.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

.modal-type {
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 0.7rem;
  opacity: 0;
  animation: sectionReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.02s forwards;
}

.modal-title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 1.8rem;
  color: #1a2a4a;
  opacity: 0;
  transform: translateY(18px);
  animation: sectionReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.06s forwards;
}

.modal-section {
  border-top: 1px solid rgba(26,42,74,0.10);
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  opacity: 0;
  transform: translateY(22px);
  animation: sectionReveal 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.modal-section:nth-child(3) { animation-delay: 0.08s; }
.modal-section:nth-child(4) { animation-delay: 0.16s; }
.modal-section:nth-child(5) { animation-delay: 0.24s; }
.modal-section:nth-child(6) { animation-delay: 0.32s; }
.modal-section:nth-child(7) { animation-delay: 0.40s; }
@keyframes sectionReveal {
  to { opacity: 1; transform: none; }
}

.modal-section__label {
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--red);
  opacity: 0.7;
}

.modal-section__text {
  font-size: 0.88rem;
  line-height: 1.75;
  color: rgba(26,42,74,0.72);
}

/* ---------- image stack ---------- */
.stack {
  position: relative;
  height: 380px;
  margin: 0.6rem 0 0.2rem;
  touch-action: pan-y;
  user-select: none;
}
.stack-card {
  appearance: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: max-content;   /* without this the card is squeezed to half the stage */
  padding: 5px;
  border: none;
  border-radius: 0.7rem;
  background: #fffaf0;
  box-shadow: 0 6px 18px rgba(10,18,40,0.22);
  line-height: 0;
  cursor: none;
  filter: brightness(0.8) saturate(0.85);
  transition:
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.45s ease,
    opacity 0.35s ease,
    box-shadow 0.45s ease;
  will-change: transform;
}
.stack-card.is-front {
  filter: none;
  box-shadow: 0 18px 44px rgba(10,18,40,0.38);
}
.stack-card.is-hidden {
  opacity: 0;
  pointer-events: none;
}
.stack-card:not(.is-front):not(.is-hidden):hover { filter: brightness(0.95) saturate(1); }
.stack-card:focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }
:root[data-theme="day"] .stack-card { background: #f0e8d0; }

.stack-media {
  display: block;
  object-fit: cover;
  border-radius: 0.45rem;
  pointer-events: none;
  background: rgba(26,42,74,0.12);
}
.stack-play {
  position: absolute;
  inset: 5px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; line-height: 1;
  color: rgba(255,255,255,0.92);
  background: rgba(0,0,0,0.32);
  border-radius: 0.45rem;
}

.stack-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  padding-bottom: 2px;
  font-size: 1.3rem; line-height: 1;
  color: #1a2a4a;
  background: rgba(240,232,208,0.92);
  border: 1px solid rgba(26,42,74,0.18);
  border-radius: 50%;
  cursor: none;
  transition: background 0.2s, transform 0.2s;
}
.stack-nav:hover { background: #fff; transform: translateY(-50%) scale(1.08); }
.stack-nav--prev { left: 0; }
.stack-nav--next { right: 0; }

.stack-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.stack-counter {
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  color: rgba(26,42,74,0.55);
  font-variant-numeric: tabular-nums;
}
.stack-actions { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.stack-action {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4em 0.95em;
  font: inherit;
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  color: rgba(26,42,74,0.72);
  background: none;
  border: 1px solid rgba(26,42,74,0.22);
  border-radius: 50px;
  text-decoration: none;
  cursor: none;
  transition: background 0.2s, border-color 0.2s;
}
.stack-action:hover { background: rgba(26,42,74,0.07); border-color: rgba(26,42,74,0.4); }
.stack-action--pdf { border-color: var(--red); }
.stack-action__badge {
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--red);
}
:root[data-theme="day"] .stack-counter { color: rgba(240,232,208,0.6); }
:root[data-theme="day"] .stack-action { color: rgba(240,232,208,0.8); border-color: rgba(240,232,208,0.25); }
:root[data-theme="day"] .stack-action:hover { background: rgba(240,232,208,0.08); border-color: rgba(240,232,208,0.5); }
:root[data-theme="day"] .stack-action--pdf { border-color: var(--red); }

@media (prefers-reduced-motion: reduce) {
  .stack-card { transition: opacity 0.2s ease; }
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.4rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(26,42,74,0.10);
}
.modal-tag {
  padding: 0.35em 0.9em;
  border-radius: 50px;
  border: 1px solid rgba(26,42,74,0.20);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: rgba(26,42,74,0.60);
}

.modal-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.4rem;
}
.modal-tools__label {
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-right: 0.3rem;
}
:root[data-theme="day"] .modal-tools__label { color: rgba(240,232,208,0.75); }

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0,0,0,0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.lightbox-img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 0.6rem;
  display: block;
}
.lightbox-frame {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
  max-height: 85vh;
}
.lightbox-nav {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  width: 40px; height: 40px;
  font-size: 1.5rem; line-height: 1;
  color: rgba(255,255,255,0.9);
  cursor: none;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
  z-index: 2;
}
.lightbox-nav:hover { background: rgba(0,0,0,0.75); }
.lightbox-nav--prev { left: -52px; }
.lightbox-nav--next { right: -52px; }
.lightbox-counter {
  position: absolute;
  bottom: 1.2rem; left: 50%; transform: translateX(-50%);
  font-size: 0.6rem; letter-spacing: 0.2em;
  color: rgba(255,255,255,0.35);
}
.lightbox-close {
  position: absolute;
  top: 1.2rem; right: 1.4rem;
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  cursor: none;
  display: flex; align-items: center; justify-content: center;
}
.lightbox-close span {
  position: absolute;
  width: 14px; height: 1.5px;
  background: rgba(255,255,255,0.8);
  border-radius: 2px;
}
.lightbox-close span:first-child { transform: rotate(45deg); }
.lightbox-close span:last-child { transform: rotate(-45deg); }

.modal-enter-active { transition: opacity 0.3s ease; }
.modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-panel { animation: slideUp 0.35s var(--ease-out); }
.modal-leave-active .modal-panel { animation: slideDown 0.25s ease-in forwards; }
@keyframes slideUp { from { transform: translateY(40px); } to { transform: translateY(0); } }
@keyframes slideDown { from { transform: translateY(0); } to { transform: translateY(40px); } }

.lightbox-enter-active, .lightbox-leave-active { transition: opacity 0.2s ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

@media (max-width: 600px) {
  .modal-body { padding: 1.5rem 1.5rem 2rem; }
  .stack { height: 300px; }
  .stack-nav { width: 30px; height: 30px; }
}
</style>
