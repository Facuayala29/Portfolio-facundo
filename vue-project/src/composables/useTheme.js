import { ref, computed, watch } from 'vue'

const _theme = ref(
  typeof localStorage !== 'undefined'
    ? (localStorage.getItem('portfolio-theme') || 'day')
    : 'day'
)

// page-load cloud wipe (used by PageLoader)
export const _transitioning = ref(false)

// toggle celestial-rise animation
export const _celestialRising = ref(false)
export const _risingToTheme   = ref('night')
export const _leavingTheme    = ref('day')

if (typeof document !== 'undefined') {
  document.documentElement.dataset.theme = _theme.value
}

watch(_theme, v => {
  document.documentElement.dataset.theme = v
  localStorage.setItem('portfolio-theme', v)
})

export function useTheme() {
  const isDay = computed(() => _theme.value === 'day')

  const toggle = () => {
    const current = _theme.value
    const next    = current === 'day' ? 'night' : 'day'
    _leavingTheme.value   = current
    _risingToTheme.value  = next
    _celestialRising.value = true
    // Delay theme switch until exit body has left (~650ms)
    // so exit body composites against the correct old-theme sky
    setTimeout(() => { _theme.value = next }, 680)
    setTimeout(() => { _celestialRising.value = false }, 1250)
  }

  return { theme: _theme, isDay, toggle, transitioning: _transitioning }
}
