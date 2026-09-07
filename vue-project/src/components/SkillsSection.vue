<template>
  <section class="skills" id="skills" ref="skillsEl">
<div class="skills__inner">
      <div class="skills__header">
        <h2 class="skills__title" data-reveal="up" data-delay="0.05">
          {{ titleWords[0] }}&nbsp;<span class="bracket">{</span>{{ titleWords[1] }}<span class="bracket">}</span>
        </h2>
        <div class="skills__title-line" data-reveal="left" data-delay="0.15"></div>
      </div>

      <div class="skills__grid">
        <div
          v-for="(category, ci) in skillCategories"
          :key="ci"
          class="skill-category"
          ref="categoriesEl"
          :style="{ '--i': ci }"
        >
          <h3 class="skill-category__name">{{ localizedCategories[ci] || category.name }}</h3>
          <div class="pills">
            <span v-for="(skill, si) in (localizedCategorySkills[ci] || category.skills)" :key="si" class="pill">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useIntersection } from '../composables/useIntersection.js'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
const { observe } = useIntersection()

const skillsEl = ref(null)
const categoriesEl = ref([])

const titleWords = computed(() => {
  const raw = t('skills.title')
  const match = raw.match(/^(.+?)\s*\{(.+?)\}/)
  return match ? [match[1], match[2]] : [raw, '']
})

const localizedCategories = computed(() => {
  const cats = t('skills.categories')
  return Array.isArray(cats) ? cats : []
})

const localizedCategorySkills = computed(() => {
  const skills = t('skills.categorySkills')
  return Array.isArray(skills) ? skills : skillCategories.map(c => c.skills)
})

const skillCategories = [
  {
    name: 'Design',
    skills: ['UI/UX Design', 'Visual Design', 'Brand Identity', 'Design Systems', 'UX Research', 'Information Design', 'Print Design', 'Illustration', 'Typography', 'Motion Design'],
  },
  {
    name: 'Soft Skills',
    skills: ['Problem Solving', 'Creative Thinking', 'Adaptability', 'Communication', 'Client Relations', 'Scrum / Agile', 'Management'],
  },
  {
    name: 'Tools',
    skills: ['Figma', 'After Effects', 'Premiere Pro', 'InDesign', 'Illustrator', 'Photoshop', 'JavaScript', 'HTML', 'CSS', 'WordPress', 'Vue', 'Firebase', 'Git', 'SEO'],
  },
  {
    name: 'AI',
    skills: ['Prompt Writing', 'Strategic AI Implementation', 'Generative AI', 'AI-Assisted Design'],
  },
]

const RADIUS = 110
const MAX_PUSH = 52

function onMouseMove(e) {
  const pills = skillsEl.value?.querySelectorAll('.pill.revealed')
  if (!pills) return
  pills.forEach(pill => {
    const rect = pill.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist < RADIUS && dist > 0) {
      const push = ((RADIUS - dist) / RADIUS) * MAX_PUSH
      pill.style.setProperty('--rx', `${-(dx / dist) * push}px`)
      pill.style.setProperty('--ry', `${-(dy / dist) * push}px`)
    } else {
      pill.style.setProperty('--rx', '0px')
      pill.style.setProperty('--ry', '0px')
    }
  })
}

function onMouseLeave() {
  skillsEl.value?.querySelectorAll('.pill.revealed').forEach(pill => {
    pill.style.setProperty('--rx', '0px')
    pill.style.setProperty('--ry', '0px')
  })
}

onMounted(() => {
  categoriesEl.value.forEach(cat => {
    observe(cat, el => {
      el.classList.add('revealed')
      el.querySelectorAll('.pill').forEach((pill, i) => {
        setTimeout(() => pill.classList.add('revealed'), i * 55)
      })
    }, { threshold: 0.1 })
  })

  skillsEl.value?.addEventListener('mousemove', onMouseMove)
  skillsEl.value?.addEventListener('mouseleave', onMouseLeave)
})

onUnmounted(() => {
  skillsEl.value?.removeEventListener('mousemove', onMouseMove)
  skillsEl.value?.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<style scoped>
.skills {
  position: relative;
  padding: 8rem 2.5rem;
  background: radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--red) 10%, transparent) 0%, transparent 60%),
              var(--black);
  overflow: visible;
}
.skills__inner { max-width: 1100px; margin: 0 auto; }

.skills__title {
  font-family: var(--font-graffiti);
  font-size: clamp(2.2rem, 5.5vw, 5rem);
  letter-spacing: 0.02em;
  line-height: 1;
  margin-bottom: 0.6rem;
  color: var(--skills-title-color, var(--white));

}
.bracket { color: var(--red); }

.skills__title-line {
  height: 1px;
  width: 8rem;
  background: linear-gradient(to right, var(--red), transparent);
  margin-bottom: 4rem;
}

.skills__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem 4rem;
}

.skill-category {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity   0.6s var(--ease-out) calc(var(--i) * 0.1s),
    transform 0.6s var(--ease-out) calc(var(--i) * 0.1s);
}
.skill-category.revealed { opacity: 1; transform: none; }

.skill-category__name {
  font-family: var(--font-graffiti);
  font-size: clamp(1.1rem, 2.2vw, 1.6rem);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 1.2rem;
  border-bottom: 1px solid color-mix(in srgb, var(--red) 30%, transparent);
  padding-bottom: 0.7rem;

}

.pills { display: flex; flex-wrap: wrap; gap: 0.55rem; }

.pill {
  display: inline-block;
  padding: 0.48em 1.1em;
  border-radius: 50px;
  border: 1px solid color-mix(in srgb, var(--white) 28%, transparent);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--white);
  background: rgba(255,255,255,0.02);
  cursor: none;
  --rx: 0px;
  --ry: 0px;
  opacity: 0;
  transform: translateY(10px) translate(var(--rx), var(--ry));
  transition:
    opacity      0.45s var(--ease-out),
    transform    0.35s ease-out,
    border-color 0.3s ease,
    color        0.3s ease,
    background   0.3s ease;
  will-change: transform;
  font-family: var(--font-body);
}
.pill.revealed {
  opacity: 1;
  transform: translateY(0) translate(var(--rx), var(--ry));
}
.pill.revealed:hover {
  color: var(--white);
  border-color: color-mix(in srgb, var(--red) 70%, transparent);
  background: color-mix(in srgb, var(--red) 8%, transparent);
}

@media (max-width: 768px) {
  .skills { padding: 6rem 1.5rem; }
  .skills__grid { grid-template-columns: 1fr; gap: 2rem; }
}
@media (max-width: 600px) {
  .skills__grid { grid-template-columns: 1fr; }
}
:root[data-theme="day"] .skills { --skills-title-color: #1a2a4a; }
</style>
