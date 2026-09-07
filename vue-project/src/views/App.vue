<template>
  <div class="app">
    <PageLoader @done="onLoaderDone" />
    <AppCursor />
    <AppNav />
    <ThemeTransition />
    <CelestialRise v-if="heroVisible" />
    <main>
      <HeroSection />
      <ManifestoSection />
      <AboutSection />
      <WorksSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGlobalReveal } from '../composables/useReveal.js'
import PageLoader       from '../components/PageLoader.vue'
import AppCursor        from '../components/AppCursor.vue'
import AppNav           from '../components/AppNav.vue'
import HeroSection      from '../components/HeroSection.vue'
import ManifestoSection from '../components/ManifestoSection.vue'
import AboutSection     from '../components/AboutSection.vue'
import WorksSection     from '../components/WorksSection.vue'
import SkillsSection    from '../components/SkillsSection.vue'
import ContactSection   from '../components/ContactSection.vue'
import ThemeTransition  from '../components/ThemeTransition.vue'
import CelestialRise    from '../components/CelestialRise.vue'

useGlobalReveal()

const heroVisible = ref(true)

onMounted(() => {
  document.body.style.overflow = 'hidden'

  const heroEl = document.getElementById('hero')
  if (heroEl) {
    const obs = new IntersectionObserver(
      ([entry]) => { heroVisible.value = entry.isIntersecting },
      { threshold: 0.05 }
    )
    obs.observe(heroEl)
  }
})

function onLoaderDone() {
  document.body.style.overflow = ''
}
</script>
