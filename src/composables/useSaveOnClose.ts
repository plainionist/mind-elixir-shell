import { onUnmounted } from 'vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { homeDir, join } from '@tauri-apps/api/path'
import { writeTextFile } from '@tauri-apps/plugin-fs'
import { MindElixirInstance } from 'mind-elixir'

export function useSaveOnClose(me: MindElixirInstance) {
  let unlisten = () => {}

  const setupSaveOnClose = async () => {
    unlisten = await getCurrentWindow().onCloseRequested(async () => {
      const home = await homeDir()
      const filePath = await join(home, 'mind-elixir.json')
      const data = me.getDataString()
      await writeTextFile(filePath, data)
    })
  }

  setupSaveOnClose()

  onUnmounted(() => {
    unlisten()
  })
}
