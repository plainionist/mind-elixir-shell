import { MindElixirInstance } from 'mind-elixir'
import { onUnmounted } from 'vue'

export function useFullscreen(me: MindElixirInstance) {
  const updateCanvasSize = () => {
    if (document.fullscreenElement) {
      const map = me.mindElixirBox
      if (map) {
        const windowHeight = window.innerHeight
        map.style.width = '100vw'
        map.style.height = `${windowHeight}px`
      }
    }
  }

  window.addEventListener('resize', updateCanvasSize)

  document.documentElement.requestFullscreen()
  setInterval(updateCanvasSize, 100)

  onUnmounted(() => {
    window.removeEventListener('resize', updateCanvasSize)
  })
}
