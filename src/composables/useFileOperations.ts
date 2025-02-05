import { open, save } from '@tauri-apps/plugin-dialog'
import { writeTextFile, readTextFile, watchImmediate } from '@tauri-apps/plugin-fs'
import { onUnmounted, ref } from 'vue'
import { MindElixirInstance } from 'mind-elixir'

export function useFileOperations(me: MindElixirInstance) {
  const watchedFile = ref<string | null>(null)
  let unwatch: (() => void) | null = null

  const loadFile = async (filePath: string) => {
    const contents = await readTextFile(filePath)
    me.init(JSON.parse(contents))
  }

  const openFile = async () => {
    const filePath = await open({
      filters: [{ name: 'JSON Files', extensions: ['json'] }]
    })

    if (filePath) {
      watchedFile.value = filePath as string
      await loadFile(watchedFile.value)

      if (unwatch) {
        unwatch()
      }

      unwatch = await watchImmediate(watchedFile.value, async () => {
        await loadFile(watchedFile.value as string)
      })
    }
  }

  const saveFile = async () => {
    const filePath = await save({
      filters: [{ name: 'JSON Files', extensions: ['json'] }]
    })

    if (filePath) {
      const data = me.getDataString()
      await writeTextFile(filePath, data)
    }
  }

  const exportSvg = async () => {
    const filePath = await save({
      filters: [{ name: 'SVG Files', extensions: ['svg'] }]
    })

    if (filePath) {
      const data = me.exportSvg()
      const svg = await data.text()
      await writeTextFile(filePath, svg)
    }
  }

  onUnmounted(() => {
    if (unwatch) {
      unwatch()
    }
  })

  return { openFile, saveFile, exportSvg }
}
