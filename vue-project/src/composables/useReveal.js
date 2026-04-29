import { onMounted, onUnmounted } from 'vue'

function getTransform(type, above) {
  if (type === 'left') return 'translateX(-58px)'
  if (type === 'right') return 'translateX(58px)'
  const d = above ? -1 : 1
  if (type === 'up') return `translateY(${d * 58}px)`
  if (type === 'down') return `translateY(${-d * 58}px)`
  if (type === 'scale') return `scale(0.86) translateY(${d * 28}px)`
  return 'none'
}

export function useGlobalReveal() {
  let raf = null

  function check() {
    const vh = window.innerHeight
    document.querySelectorAll('[data-reveal]').forEach(el => {
      const r = el.getBoundingClientRect()
      const inView = r.bottom > 40 && r.top < vh - 40
      const above = r.bottom <= 40
      const type = el.dataset.reveal ?? 'up'

      if (inView) {
        el.style.opacity = ''
        el.style.transform = 'none'
        el.classList.add('is-visible')
      } else {
        el.style.opacity = '0'
        el.style.transform = getTransform(type, above)
        el.classList.remove('is-visible')
      }
    })
  }

  function onScroll() {
    if (raf) return
    raf = requestAnimationFrame(() => { check(); raf = null })
  }

  onMounted(() => {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      const delay = el.dataset.delay ?? '0'
      const r = el.getBoundingClientRect()
      const above = r.bottom <= 0
      const type = el.dataset.reveal ?? 'up'
      el.style.opacity = '0'
      el.style.transform = getTransform(type, above)
      el.style.transition = `opacity 0.85s var(--ease-out) ${delay}s, transform 0.85s var(--ease-out) ${delay}s`
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    setTimeout(check, 120)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (raf) cancelAnimationFrame(raf)
  })
}
