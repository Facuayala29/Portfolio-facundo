<template>
  <Transition name="modal">
    <div v-if="project" class="modal-overlay" @click.self="$emit('close')" role="dialog" aria-modal="true">
      <div class="modal-panel">

        <button class="modal-close" @click="$emit('close')" aria-label="Close">
          <span></span><span></span>
        </button>

        <div class="modal-visual" :style="{ background: project.bg }">
          <div class="modal-visual__glow" :style="{ background: project.accent.replace('0.7', '0.4') }"></div>
          <div class="modal-visual__noise"></div>
          <div class="modal-visual__num">0{{ project.origIdx + 1 }}</div>
        </div>

        <div class="modal-body">
          <p class="modal-type">{{ project.i18n.type }}</p>
          <h2 class="modal-title">{{ project.i18n.title }}</h2>

          <div class="modal-section">
            <span class="modal-section__label">Brief</span>
            <p class="modal-section__text">{{ project.i18n.desc }}</p>
          </div>

          <div class="modal-section">
            <span class="modal-section__label">Objective</span>
            <p class="modal-section__text">{{ project.i18n.objective }}</p>
          </div>

          <div class="modal-section">
            <span class="modal-section__label">Sketches and Mockups</span>
            <div class="modal-images-grid">
              <template v-if="project.images?.length">
                <template v-for="(src, i) in project.images" :key="i">
                  <a v-if="src.endsWith('.pdf')" :href="src" target="_blank" class="modal-img-btn modal-pdf-tile">
                    <span class="modal-pdf-icon">PDF</span>
                    <span class="modal-pdf-name">View PDF ↗</span>
                  </a>
                  <button v-else-if="src.endsWith('.mp4')" class="modal-img-btn modal-video-tile" @click="openLightbox(i)">
                    <video :src="src" class="modal-img modal-video-thumb" muted preload="metadata" />
                    <span class="modal-video-play">▶</span>
                  </button>
                  <button v-else class="modal-img-btn" @click="openLightbox(i)">
                    <img :src="src" class="modal-img" :alt="`Image ${i + 1}`" loading="lazy" decoding="async" />
                    <span class="modal-img-zoom">↗</span>
                  </button>
                </template>
              </template>
              <template v-else>
                <div class="modal-placeholder"></div>
                <div class="modal-placeholder"></div>
                <div class="modal-placeholder"></div>
              </template>
            </div>
          </div>

          <div class="modal-section">
            <span class="modal-section__label">Outcome</span>
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
import { ref, computed } from 'vue'
const props = defineProps({ project: { type: Object, default: null } })
defineEmits(['close'])

const lightboxIdx = ref(null)

const lightboxImages = computed(() =>
  (props.project?.images ?? []).filter(s => !s.endsWith('.pdf'))
)

function openLightbox(gridIdx) {
  const src = props.project.images[gridIdx]
  const imgIdx = lightboxImages.value.indexOf(src)
  if (imgIdx !== -1) lightboxIdx.value = imgIdx
}
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
  background: #0f0f0f;
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 1.4rem 1.4rem 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-close {
  position: absolute;
  top: 1.2rem;
  right: 1.4rem;
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s;
}
.modal-close:hover { background: rgba(255,255,255,0.12); }
.modal-close span {
  position: absolute;
  width: 12px; height: 1.5px;
  background: rgba(255,255,255,0.7);
  border-radius: 2px;
}
.modal-close span:first-child { transform: rotate(45deg); }
.modal-close span:last-child { transform: rotate(-45deg); }

.modal-visual {
  position: relative;
  height: 180px;
  flex-shrink: 0;
  overflow: hidden;
}
.modal-visual__glow {
  position: absolute;
  inset: -40%;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.6;
}
.modal-visual__noise {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.modal-visual__num {
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 700;
  color: rgba(255,255,255,0.05);
  letter-spacing: -0.05em;
  line-height: 1;
  user-select: none;
}

.modal-body {
  padding: 2rem 2rem 2.5rem;
  overflow-y: auto;
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
  color: var(--white);
  opacity: 0;
  transform: translateY(18px);
  animation: sectionReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.06s forwards;
}

.modal-section {
  border-top: 1px solid rgba(255,255,255,0.06);
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
  color: rgba(245,245,240,0.55);
}

.modal-images-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-top: 0.2rem;
}

.modal-img-btn {
  position: relative;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0.6rem;
  overflow: hidden;
  cursor: none;
}
.modal-img-btn:hover .modal-img-zoom { opacity: 1; }

.modal-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 0.6rem;
  display: block;
  transition: transform 0.3s ease;
}
.modal-img-btn:hover .modal-img { transform: scale(1.04); }

.modal-img-zoom {
  position: absolute;
  top: 0.5rem; right: 0.6rem;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.85);
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.modal-video-tile { position: relative; }
.modal-video-thumb { object-fit: cover; pointer-events: none; }
.modal-video-play {
  position: absolute;
  inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem;
  color: rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.35);
  border-radius: 0.6rem;
  transition: background 0.2s;
}
.modal-video-tile:hover .modal-video-play { background: rgba(0,0,0,0.55); }

.modal-pdf-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 160px;
  background: rgba(135,22,51,0.08);
  border: 1px solid rgba(135,22,51,0.25);
  border-radius: 0.6rem;
  text-decoration: none;
  transition: background 0.2s;
}
.modal-pdf-tile:hover { background: rgba(135,22,51,0.16); }
.modal-pdf-icon {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: var(--red);
  padding: 0.3em 0.7em;
  border: 1px solid var(--red);
  border-radius: 4px;
}
.modal-pdf-name {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: rgba(245,245,240,0.45);
}

.modal-placeholder {
  height: 160px;
  background: rgba(255,255,255,0.03);
  border: 1px dashed rgba(255,255,255,0.08);
  border-radius: 0.6rem;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.4rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.modal-tag {
  padding: 0.35em 0.9em;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.1);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: rgba(245,245,240,0.45);
}

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
  .modal-images-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
