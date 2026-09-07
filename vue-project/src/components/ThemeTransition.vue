<template>
  <Transition name="cloud-wipe">
    <div v-if="transitioning" class="theme-wipe" aria-hidden="true">
      <!-- left cloud half -->
      <div class="wipe-half wipe-half--left">
        <svg class="wipe-svg" viewBox="0 0 720 900" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="wf"><feGaussianBlur stdDeviation="12"/></filter>
          </defs>
          <!-- soft blur backing -->
          <rect x="0" y="0" width="720" height="900" fill="var(--cloud-fill)" filter="url(#wf)" opacity="0.7"/>
          <!-- irregular right edge (cloud bumps) -->
          <path class="wipe-cloud" d="
            M0,0 L720,0 L720,900 L0,900 Z
            M 720,0
            C 680,35  660,60  640,90
            C 618,122 630,155 608,185
            C 585,217 550,222 538,258
            C 524,296 540,330 522,368
            C 504,408 468,418 456,458
            C 442,500 460,535 444,574
            C 428,614 394,626 380,665
            C 365,706 382,742 365,780
            C 347,820 312,838 300,876
            C 288,900 300,900 720,900 Z"/>
        </svg>
      </div>

      <!-- right cloud half -->
      <div class="wipe-half wipe-half--right">
        <svg class="wipe-svg" viewBox="0 0 720 900" preserveAspectRatio="xMinYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="wf2"><feGaussianBlur stdDeviation="12"/></filter>
          </defs>
          <rect x="0" y="0" width="720" height="900" fill="var(--cloud-fill)" filter="url(#wf2)" opacity="0.7"/>
          <!-- irregular left edge (cloud bumps mirrored) -->
          <path class="wipe-cloud" d="
            M720,0 L0,0 L0,900 L720,900 Z
            M 0,0
            C 40,35   60,60   80,90
            C 102,122 90,155  112,185
            C 135,217 170,222 182,258
            C 196,296 180,330 198,368
            C 216,408 252,418 264,458
            C 278,500 260,535 276,574
            C 292,614 326,626 340,665
            C 355,706 338,742 355,780
            C 373,820 408,838 420,876
            C 432,900 420,900 0,900 Z"/>
        </svg>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'
const { transitioning } = useTheme()
</script>

<style scoped>
.theme-wipe {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  display: flex;
}

/* cloud halves */
.wipe-half {
  position: absolute;
  top: 0; bottom: 0;
  width: 52vw;            /* slight overlap so no gap at center */
  overflow: hidden;
}
.wipe-half--left  { left: 0;  }
.wipe-half--right { right: 0; }

.wipe-svg {
  width: 100%; height: 100%;
}

.wipe-cloud {
  fill: var(--cloud-fill);
  transition: fill 0.4s ease;
  /* even-odd rule so the cutout "Z" trick punches holes */
  fill-rule: evenodd;
}

/* ─── enter: halves slide IN from sides → meet at center ─────────────────── */
.cloud-wipe-enter-active .wipe-half--left  { animation: slideInLeft  0.42s var(--ease-out) both; }
.cloud-wipe-enter-active .wipe-half--right { animation: slideInRight 0.42s var(--ease-out) both; }

/* ─── leave: halves slide OUT to sides ───────────────────────────────────── */
.cloud-wipe-leave-active .wipe-half--left  { animation: slideOutLeft  0.46s var(--ease-in-out) both; }
.cloud-wipe-leave-active .wipe-half--right { animation: slideOutRight 0.46s var(--ease-in-out) both; }

@keyframes slideInLeft  { from { transform: translateX(-105%); } to { transform: translateX(0); } }
@keyframes slideInRight { from { transform: translateX(105%);  } to { transform: translateX(0); } }
@keyframes slideOutLeft  { from { transform: translateX(0); } to { transform: translateX(-110%); } }
@keyframes slideOutRight { from { transform: translateX(0); } to { transform: translateX(110%);  } }
</style>
