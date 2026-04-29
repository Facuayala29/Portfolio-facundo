<template>
  <div class="app">
    <PageLoader @done="onLoaderDone" />
    <AppCursor />
    <AppNav />
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
import { onMounted } from 'vue'
import { useGlobalReveal } from '../composables/useReveal.js'
import PageLoader from '../components/PageLoader.vue'
import AppCursor from '../components/AppCursor.vue'
import AppNav from '../components/AppNav.vue'
import HeroSection from '../components/HeroSection.vue'
import ManifestoSection from '../components/ManifestoSection.vue'
import AboutSection from '../components/AboutSection.vue'
import WorksSection from '../components/WorksSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ContactSection from '../components/ContactSection.vue'

useGlobalReveal()

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

function onLoaderDone() {
  document.body.style.overflow = ''
}
</script>

