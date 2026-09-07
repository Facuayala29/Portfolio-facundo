import { createApp } from 'vue'
import App from './views/App.vue'
import './assets/css/global.css'

createApp(App).mount('#app')

// Fugaz One "f" favicon — amber in day, navy in night
document.fonts.ready.then(() => {
  function renderFavicon() {
    const isDay = document.documentElement.getAttribute('data-theme') === 'day'
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    ctx.font = '400 ' + Math.round(size * 0.82) + 'px \'Fugaz One\', sans-serif'
    ctx.fillStyle = isDay ? '#c47a15' : '#0e1525'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('f', size / 2, size / 2 + size * 0.04)

    const link = document.querySelector("link[rel~='icon']") || document.createElement('link')
    link.type = 'image/png'
    link.rel = 'icon'
    link.href = canvas.toDataURL('image/png')
    document.head.appendChild(link)
  }

  renderFavicon()

  new MutationObserver(renderFavicon).observe(
    document.documentElement,
    { attributes: true, attributeFilter: ['data-theme'] }
  )
})
