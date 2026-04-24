<template>
  <header class="nav" :class="{ 'nav--scrolled': isScrolled }">
    <a href="#hero" class="nav__logo" @click="closeMenu">
      Facundo
    </a>

    <button
      class="nav__hamburger"
      @click.stop="toggleMenu"
      :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
      :aria-expanded="menuOpen"
    >
      <span class="ham-bar" :class="{ open: menuOpen }"></span>
      <span class="ham-bar" :class="{ open: menuOpen }"></span>
    </button>

    <div
      class="menu-dropdown"
      :class="{ 'menu-dropdown--open': menuOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      @click.stop
    >
      <div class="menu-lang">
        <template v-for="(lang, i) in ['EN', 'ES']" :key="lang">
          <button
            class="menu-lang-btn"
            :class="{ active: locale === lang }"
            @click="setLocale(lang)"
          >{{ lang }}</button>
          <span v-if="i < 1" class="menu-lang-sep">|</span>
        </template>
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
        <a href="/cv/Facundo_Ayala_CV.pdf" download class="menu-footer-cv">
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

const { scramble } = useScramble()
const { locale, t, setLocale } = useI18n()

const menuOpen = ref(false)
const isScrolled = ref(false)

const menuItems = computed(() => [
  { key: 'home', label: t('nav.home'), href: '#hero' },
  { key: 'about', label: t('nav.about'), href: '#about' },
  { key: 'works', label: t('nav.works'), href: '#works' },
  { key: 'skills', label: t('nav.skills'), href: '#skills' },
  { key: 'contact', label: t('nav.contact'), href: '#contact' },
])

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu() { menuOpen.value = false }

function onHover(e, label) {
  const el = e.currentTarget.querySelector('.menu-link__text')
  if (el) scramble(el, label, 300)
}
function onLeave(e, label) {
  const el = e.currentTarget.querySelector('.menu-link__text')
  if (el) el.textContent = label
}

function onScroll() { isScrolled.value = window.scrollY > 60 }
function onKeydown(e) { if (e.key === 'Escape') closeMenu() }
function onClickOut(e) { if (menuOpen.value && !e.target.closest('.nav')) closeMenu() }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onClickOut)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
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
  padding: 1.5rem 2.5rem;
  transition: background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.nav--scrolled {
  background: rgba(22,22,22,0.90);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-color: rgba(135,22,51,0.12);
}

.nav__logo {
  font-family: var(--font-graffiti);
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  cursor: none;
  z-index: 1001;
  position: relative;
  text-decoration: none;
  color: var(--white);
}

.nav__hamburger {
  background: none;
  border: none;
  cursor: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 6px;
  z-index: 1001;
  position: relative;
}
.ham-bar {
  display: block;
  width: 26px; height: 1.5px;
  background: var(--white);
  transform-origin: center;
  transition: transform 0.45s var(--ease-out), opacity 0.3s;
}
.ham-bar.open:nth-child(1) { transform: translateY(4.25px) rotate(45deg); }
.ham-bar.open:nth-child(2) { transform: translateY(-4.25px) rotate(-45deg); }

.menu-dropdown {
  position: fixed;
  top: 4.6rem;
  right: 1.8rem;
  width: 220px;
  background: rgba(10,10,10,0.93);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1rem;
  padding: 0.6rem 0 0;
  z-index: 998;
  transform: scale(0.95);
  transform-origin: top right;
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s var(--ease-out), opacity 0.25s ease;
}
.menu-dropdown--open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}

.menu-list { list-style: none; padding: 0; margin: 0; }

.menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1.1rem;
  margin: 0 0.35rem;
  border-radius: 0.45rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  color: rgba(245,245,240,0.55);
  text-decoration: none;
  cursor: none;
  transition: color 0.2s, background 0.2s;
}
.menu-link:hover {
  color: var(--white);
  background: rgba(255,255,255,0.04);
}
.menu-link__text { flex: 1; }
.menu-link__arrow {
  font-size: 0.8rem;
  color: var(--red);
  opacity: 0;
  transform: translate(-5px, 5px);
  transition: opacity 0.2s, transform 0.25s var(--ease-out);
}
.menu-link:hover .menu-link__arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.menu-lang {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.55rem 1.45rem 0.4rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 0.2rem;
}
.menu-lang-btn {
  background: none;
  border: none;
  color: rgba(245,245,240,0.28);
  cursor: none;
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  font-family: var(--font-body);
  padding: 0.15rem 0.05rem;
  transition: color 0.25s;
}
.menu-lang-btn:hover { color: rgba(245,245,240,0.65); }
.menu-lang-btn.active { color: var(--white); }
.menu-lang-sep {
  font-size: 0.48rem;
  color: rgba(255,255,255,0.12);
  user-select: none;
}

.menu-dropdown__footer {
  border-top: 1px solid rgba(255,255,255,0.07);
  margin: 0.5rem 1.1rem 0;
  padding: 0.7rem 0 0.8rem;
}
.menu-footer-cv {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245,245,240,0.38);
  text-decoration: none;
  cursor: none;
  transition: color 0.25s;
}
.menu-footer-cv:hover { color: var(--white); }
.cv-arrow { color: var(--red); font-size: 0.75rem; }
</style>
