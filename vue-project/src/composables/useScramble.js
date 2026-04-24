export function useScramble() {
  const chars = '!<>-_\\/[]{}—=+*^?#@%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  function scramble(element, finalText, duration = 800) {
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    let raf

    const update = () => {
      const progress = frame / totalFrames
      let output = ''

      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') {
          output += ' '
        } else if (i < Math.floor(progress * finalText.length)) {
          output += finalText[i]
        } else {
          output += chars[Math.floor(Math.random() * chars.length)]
        }
      }

      element.textContent = output
      frame++

      if (frame <= totalFrames) {
        raf = requestAnimationFrame(update)
      } else {
        element.textContent = finalText
      }
    }

    cancelAnimationFrame(raf)
    update()

    return () => cancelAnimationFrame(raf)
  }

  return { scramble }
}
