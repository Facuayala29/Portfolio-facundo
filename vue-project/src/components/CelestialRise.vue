<template>
  <Transition name="cr">
    <div v-if="rising" class="celestial-rise" aria-hidden="true">
      <!-- horizon glow -->
      <div class="rise-horizon" :class="`horizon--${risingTo}`"></div>

      <!-- OLD body: exits upward from hero position -->
      <div class="cel-body exit-body" :class="`body--${leaving}`">
        <img :src="leaving === 'day' ? sunImg : moonImg" class="cel-img" alt="" />
      </div>

      <!-- NEW body: rises from below, bounces into hero position -->
      <div class="cel-body rise-body" :class="`body--${risingTo}`">
        <img :src="risingTo === 'day' ? sunImg : moonImg" class="cel-img" alt="" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { _celestialRising, _risingToTheme, _leavingTheme } from '../composables/useTheme.js'
import sunImg  from '../assets/img/celestial_sun.png'
import moonImg from '../assets/img/celestial_moon.png'

const rising   = _celestialRising
const risingTo = _risingToTheme
const leaving  = _leavingTheme
</script>

<style scoped>
/* ── overlay ────────────────────────────────────────────────────── */
.celestial-rise {
  position: fixed;
  inset: 0;
  z-index: 12; /* above hero noise (z9) and vignette (z8) — matches celestial at rest (z10) */
  pointer-events: none;
  overflow: hidden;
}
.cr-leave-active { transition: opacity 0.20s ease; }
.cr-leave-to     { opacity: 0; }

/* ── shared body — mirrors .hero__celestial exactly ─────────────── */
.cel-body {
  position: absolute;
  top:    clamp(2.5rem, 7vh, 5.5rem);
  right:  clamp(1.5rem, 5vw, 6rem);
  width:  clamp(168px, 21vw, 270px);
  height: clamp(168px, 21vw, 270px);
}
.cel-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Exact same filter as .celestial-img in hero (hardcoded per body
   so they are correct regardless of which theme is currently active) */

/* Sun: day mode --celestial-glow = rgba(255,190,30,0.40) */
.body--day .cel-img {
  filter: drop-shadow(0 0 28px rgba(255,190,30,0.40))
          drop-shadow(0 0 65px rgba(255,190,30,0.40));
}
/* Moon: night mode --celestial-glow = rgba(245,220,100,0.25) */
.body--night .cel-img {
  filter: drop-shadow(0 0 28px rgba(245,220,100,0.25))
          drop-shadow(0 0 65px rgba(245,220,100,0.25));
}

/* ── EXIT: drifts up and away ───────────────────────────────────── */
.exit-body {
  animation: celestialExit 0.65s cubic-bezier(0.4, 0, 1, 1) forwards;
}
@keyframes celestialExit {
  0%   { transform: translateY(0)      scale(1);    opacity: 1; }
  15%  { transform: translateY(-10px)  scale(1.02); opacity: 1; }
  50%  { opacity: 0.25; }
  100% { transform: translateY(-95vh)  scale(0.55); opacity: 0; }
}

/* ── RISE: comes from below, bounces into hero spot ─────────────── */
.rise-body {
  animation: celestialRise 1.20s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes celestialRise {
  0%   { transform: translateY(115vh)  scale(0.36); opacity: 0; }
  10%  { opacity: 1; }
  /* arrives slightly high — gentle overshoot */
  63%  { transform: translateY(-10px)  scale(1.04); opacity: 1; }
  /* settles back below */
  75%  { transform: translateY(6px)    scale(0.98); opacity: 1; }
  /* soft second nudge */
  85%  { transform: translateY(-3px)   scale(1.01); opacity: 1; }
  /* final micro-settle */
  94%  { transform: translateY(1px)    scale(1.00); opacity: 1; }
  /* at rest = exact hero position */
  100% { transform: translateY(0)      scale(1);    opacity: 1; }
}

/* ── horizon glow ────────────────────────────────────────────────── */
.rise-horizon {
  position: absolute;
  bottom: 0; right: 0;
  width: 58%; height: 65%;
  animation: horizonPulse 1.1s ease forwards;
}
.horizon--day {
  background: radial-gradient(ellipse at right bottom,
    rgba(255,212,72,0.48)  0%,
    rgba(255,140,20,0.16)  42%,
    transparent 68%);
}
.horizon--night {
  background: radial-gradient(ellipse at right bottom,
    rgba(140,195,255,0.40)  0%,
    rgba(80,130,220,0.13)   42%,
    transparent 68%);
}
@keyframes horizonPulse {
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  62%  { opacity: 1; }
  100% { opacity: 0; }
}

@media (max-width: 768px) {
  .cel-body {
    width:  clamp(108px, 26vw, 165px);
    height: clamp(108px, 26vw, 165px);
  }
}
</style>
