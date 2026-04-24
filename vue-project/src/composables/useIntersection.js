import { onUnmounted } from 'vue'

export function useIntersection(options = {}) {
  const defaults = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
    once: true,
    ...options,
  }

  const observers = []

  function observe(el, cb, opts = {}) {
    const config = { ...defaults, ...opts }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cb(entry.target, entry)
          if (config.once) observer.unobserve(entry.target)
        } else if (!config.once) {
          cb(entry.target, entry, false)
        }
      })
    }, config)
    observer.observe(el)
    observers.push(observer)
    return observer
  }

  onUnmounted(() => observers.forEach(o => o.disconnect()))

  return { observe }
}
