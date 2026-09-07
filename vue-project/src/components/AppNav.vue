<template>
  <header class="nav" :class="{ 'nav--scrolled': isScrolled }">
    <a href="#hero" class="nav__logo" @click="closeMenu"
       :style="isDay ? { color: '#1B263B' } : { color: '#f0e8d0' }">
      Facundo Ayala Muñoz
    </a>

    <div class="nav__controls">
      <!-- Apple-style pill toggle -->
      <button
        class="nav__toggle"
        :class="{ 'nav__toggle--day': isDay }"
        @click="toggle"
        :aria-label="isDay ? 'Switch to night mode' : 'Switch to day mode'"
        role="switch"
        :aria-checked="isDay"
      >
        <span class="toggle__track">
          <span class="toggle__thumb">
            <Transition name="icon-swap" mode="out-in">
              <svg v-if="isDay" key="sun" class="toggle__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="3" fill="currentColor"/>
                <g stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
                  <line x1="8" y1="1"   x2="8"   y2="3"/>
                  <line x1="8" y1="13"  x2="8"   y2="15"/>
                  <line x1="1" y1="8"   x2="3"   y2="8"/>
                  <line x1="13" y1="8"  x2="15"  y2="8"/>
                  <line x1="3.05" y1="3.05" x2="4.46" y2="4.46"/>
                  <line x1="11.54" y1="11.54" x2="12.95" y2="12.95"/>
                  <line x1="12.95" y1="3.05" x2="11.54" y2="4.46"/>
                  <line x1="4.46"  y1="11.54" x2="3.05"  y2="12.95"/>
                </g>
              </svg>
              <svg v-else key="moon" class="toggle__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M14 10.2A6 6 0 1 1 5.8 2a4.6 4.6 0 0 0 8.2 8.2z" fill="currentColor"/>
              </svg>
            </Transition>
          </span>
        </span>
      </button>

      <!-- hamburger -->
      <button
        class="nav__hamburger"
        @click.stop="toggleMenu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
      >
        <span class="ham-bar" :class="{ open: menuOpen }"></span>
        <span class="ham-bar" :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <div
      class="menu-dropdown"
      :class="{ 'menu-dropdown--open': menuOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      @click.stop
    >
      <div class="menu-lang">
        <button class="menu-lang-btn" :class="{ active: locale === 'EN' }" @click="setLocale('EN')">EN</button>
        <span class="menu-lang-sep">|</span>
        <button class="menu-lang-btn" :class="{ active: locale === 'ES' }" @click="setLocale('ES')">ES</button>
      </div>
      <ul class="menu-list" role="list">
        <li v-for="item in menuItems" :key="item.key" class="menu-item">
          <a
            :href="item.href"
            class="menu-link"
            @click="closeMenu"
            @mouseenter="onHover($event, item.label)"
            @mouseleave="onLeave($event, item.label)"
          >
            <span class="menu-link__text">{{ item.label }}</span>
            <span class="menu-link__arrow">↗</span>
          </a>
        </li>
      </ul>
      <div class="menu-dropdown__footer">
        <a href="/cv-facundo-ayala.pdf" download class="menu-footer-cv">
          <span>Download CV</span>
          <span class="cv-arrow">↓</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useScramble } from '../composables/useScramble.js'
import { useI18n } from '../composables/useI18n.js'
import { useTheme } from '../composables/useTheme.js'

const { scramble } = useScramble()
const { locale, t, setLocale } = useI18n()
const { isDay, toggle } = useTheme()

const menuOpen  = ref(false)
const isScrolled = ref(false)

const menuItems = computed(() => [
  { key: 'home',    label: t('nav.home'),    href: '#hero' },
  { key: 'about',   label: t('nav.about'),   href: '#about' },
  { key: 'works',   label: t('nav.works'),   href: '#works' },
  { key: 'skills',  label: t('nav.skills'),  href: '#skills' },
  { key: 'contact', label: t('nav.contact'), href: '#contact' },
])

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu()  { menuOpen.value = false }

function onHover(e, label) {
  const el = e.currentTarget.querySelector('.menu-link__text')
  if (el) scramble(el, label, 300)
}
function onLeave(e, label) {
  const el = e.currentTarget.querySelector('.menu-link__text')
  if (el) el.textContent = label
}

function onScroll()   { isScrolled.value = window.scrollY > 60 }
function onKeydown(e) { if (e.key === 'Escape') closeMenu() }
function onClickOut(e){ if (menuOpen.value && !e.target.closest('.nav')) closeMenu() }

onMounted(() => {
  window.addEventListener('scroll',  onScroll,   { passive: true })
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onClickOut)
})
onUnmounted(() => {
  window.removeEventListener('scroll',  onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onClickOut)
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 2.5rem;
  transition: background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.nav--scrolled {
  background: color-mix(in srgb, var(--black) 88%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-color: color-mix(in srgb, var(--white) 7%, transparent);
}

/* ── logo ───────────────────────────────────────────────────────────────────── */
.nav__logo {
  font-family: var(--font-hero);
  font-style: italic;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.01em;
  cursor: none;
  z-index: 1001;
  position: relative;
  color: #f0e8d0;
  opacity: 0.84;
  transition: opacity 0.5s ease;
}

/* ── controls row ───────────────────────────────────────────────────────────── */
.nav__controls {
  display: flex; align-items: center; gap: 0.55rem;
  z-index: 1001; position: relative;
}

/* ── Apple pill toggle ──────────────────────────────────────────────────────── */
.nav__toggle {
  background: none; border: none; padding: 0;
  cursor: none; display: flex; align-items: center;
}

.toggle__track {
  display: flex; align-items: center;
  width: 48px; height: 27px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--white) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--white) 22%, transparent);
  position: relative;
  transition: background 0.4s ease, border-color 0.4s ease;
  padding: 0 2px;
}
.nav__toggle--day .toggle__track {
  background: color-mix(in srgb, var(--red) 80%, transparent);
  border-color: color-mix(in srgb, var(--red) 90%, transparent);
}

.toggle__thumb {
  width: 21px; height: 21px;
  border-radius: 50%;
  background: var(--white);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.38s var(--ease-spring), background 0.4s ease;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,.25);
}
.nav__toggle--day .toggle__thumb {
  transform: translateX(21px);
  background: #fff8e8;
}

.toggle__icon {
  width: 11px; height: 11px;
  color: #555;
  display: block;
}
.nav__toggle--day .toggle__icon { color: #b86a00; }

/* icon swap */
.icon-swap-enter-active { transition: opacity .2s ease, transform .2s var(--ease-out); }
.icon-swap-leave-active { transition: opacity .15s ease; }
.icon-swap-enter-from   { opacity: 0; transform: scale(.6) rotate(-20deg); }
.icon-swap-leave-to     { opacity: 0; }

/* ── hamburger ──────────────────────────────────────────────────────────────── */
.nav__hamburger {
  background: none; border: none; cursor: none;
  display: flex; flex-direction: column; gap: 7px; padding: 6px;
}
.ham-bar {
  display: block; width: 26px; height: 1.5px;
  background: var(--white);
  transform-origin: center;
  transition: transform 0.45s var(--ease-out), opacity 0.3s, background 1.3s ease;
}
.ham-bar.open:nth-child(1) { transform: translateY(4.25px) rotate(45deg); }
.ham-bar.open:nth-child(2) { transform: translateY(-4.25px) rotate(-45deg); }

/* ── dropdown ───────────────────────────────────────────────────────────────── */
.menu-dropdown {
  position: fixed; top: 4.5rem; right: 1.8rem;
  width: 220px;
  background: color-mix(in srgb, var(--black) 96%, transparent);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid color-mix(in srgb, var(--white) 10%, transparent);
  border-radius: 1rem; padding: 0.6rem 0 0;
  z-index: 998;
  transform: scale(0.95); transform-origin: top right;
  opacity: 0; pointer-events: none;
  transition: transform 0.3s var(--ease-out), opacity 0.25s ease,
              background 0.5s ease, border-color 0.5s ease;
}
.menu-dropdown--open { transform: scale(1); opacity: 1; pointer-events: auto; }

.menu-list { list-style: none; padding: 0; margin: 0; }

.menu-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.65rem 1.1rem; margin: 0 0.35rem; border-radius: 0.45rem;
  font-family: var(--font-body); font-size: 0.88rem; letter-spacing: 0.04em;
  color: color-mix(in srgb, var(--white) 55%, transparent);
  text-decoration: none; cursor: none;
  transition: color 0.2s, background 0.2s;
}
.menu-link:hover {
  color: var(--white);
  background: color-mix(in srgb, var(--white) 5%, transparent);
}
.menu-link__text { flex: 1; }
.menu-link__arrow {
  font-size: 0.8rem; color: var(--red); opacity: 0;
  transform: translate(-5px, 5px);
  transition: opacity 0.2s, transform 0.25s var(--ease-out);
}
.menu-link:hover .menu-link__arrow { opacity: 1; transform: translate(0, 0); }

.menu-lang {
  display: flex; align-items: center; gap: 0.2rem;
  padding: 0.55rem 1.45rem 0.4rem;
  border-bottom: 1px solid color-mix(in srgb, var(--white) 6%, transparent);
  margin-bottom: 0.2rem;
}
.menu-lang-btn {
  background: none; border: none; cursor: none;
  color: color-mix(in srgb, var(--white) 28%, transparent);
  font-size: 0.58rem; letter-spacing: 0.14em;
  font-family: var(--font-body); padding: 0.15rem 0.05rem;
  transition: color 0.25s;
}
.menu-lang-btn:hover { color: color-mix(in srgb, var(--white) 65%, transparent); }
.menu-lang-btn.active { color: var(--white); }
.menu-lang-sep { font-size: 0.48rem; color: color-mix(in srgb, var(--white) 12%, transparent); user-select: none; }

.menu-dropdown__footer {
  border-top: 1px solid color-mix(in srgb, var(--white) 7%, transparent);
  margin: 0.5rem 1.1rem 0; padding: 0.7rem 0 0.8rem;
}
.menu-footer-cv {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: color-mix(in srgb, var(--white) 38%, transparent);
  text-decoration: none; cursor: none; transition: color 0.25s;
}
.menu-footer-cv:hover { color: var(--white); }
.cv-arrow { color: var(--red); font-size: 0.75rem; }
</style>
