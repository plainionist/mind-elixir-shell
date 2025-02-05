import { ref } from 'vue'
import { MindElixirInstance } from 'mind-elixir'

export function useDescription() {
  const description = ref('')
  let scale = 1.0
  let isCtrlPressed = false

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey) {
      isCtrlPressed = true
    }
  })

  document.addEventListener('keyup', (event) => {
    if (!event.ctrlKey) {
      isCtrlPressed = false
    }
  })

  const attachDescriptionListeners = (me: MindElixirInstance) => {
    me.bus.addListener('scale', (value: number) => {
      scale = value > 1.0 ? value : 1.0
    })

    me.bus.addListener('selectNode', (node: any) => {
      description.value = ''
      if (!isCtrlPressed) {
        return
      }

      description.value = node.description

      const descriptionBox = document.getElementById('description')
      if (descriptionBox) {
        descriptionBox.style.fontSize = `${15 * scale}px`
      }
    })
  }

  return {
    description,
    attachDescriptionListeners
  }
}
