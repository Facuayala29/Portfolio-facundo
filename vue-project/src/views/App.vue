<template>
  <div class="app" :class="{ 'app--loaded': appLoaded }">
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
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useGlobalReveal } from '../composables/useReveal.js'
import PageLoader from '../components/PageLoader.vue'
import AppCursor from '../components/AppCursor.vue'
import AppNav from '../components/AppNav.vue'
import HeroSection from '../components/HeroSection.vue'
import ManifestoSection from '../components/ManifestoSection.vue'
import AboutSection from '../components/AboutSection.vue'
const WorksSection   = defineAsyncComponent(() => import('../components/WorksSection.vue'))
const SkillsSection  = defineAsyncComponent(() => import('../components/SkillsSection.vue'))
const ContactSection = defineAsyncComponent(() => import('../components/ContactSection.vue'))

const appLoaded = ref(false)
useGlobalReveal()

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

function onLoaderDone() {
  appLoaded.value = true
  document.body.style.overflow = ''
}
</script>

<style scoped>
.app {
  opacity: 0;
  transition: opacity 0.6s ease;
}
.app--loaded {
  opacity: 1;
}
</style>
