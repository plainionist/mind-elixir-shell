<template>
  <main class="container">
    <div id="map"></div>
  </main>
</template>

<script setup lang="ts">
  import MindElixir from 'mind-elixir'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { open, save } from '@tauri-apps/plugin-dialog'
  import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs'
  import { listen } from '@tauri-apps/api/event'
  import { getCurrentWindow } from '@tauri-apps/api/window'
  import { homeDir, join } from '@tauri-apps/api/path'

  const me = ref()

  const openFile = async () => {
    const filePath = await open({
      filters: [{ name: 'JSON Files', extensions: ['json'] }]
    })
    if (filePath) {
      const contents = await readTextFile(filePath as string)
      me.value.init(JSON.parse(contents))
    }
  }

  const saveFile = async () => {
    const filePath = await save({
      filters: [{ name: 'JSON Files', extensions: ['json'] }]
    })
    if (filePath) {
      const data = me.value.getDataString()
      await writeTextFile(filePath, data)
    }
  }

  const exportSvg = async () => {
    const filePath = await save({
      filters: [{ name: 'SVG Files', extensions: ['svg'] }]
    })
    if (filePath) {
      const data = me.value.exportSvg()
      const svg = await data.text()
      await writeTextFile(filePath, svg)
    }
  }

  let unlisten = () => {}

  onMounted(async () => {
    me.value = new MindElixir({
      el: '#map',
      direction: MindElixir.SIDE
    })

    me.value.mindElixirBox.requestFullscreen()
    me.value.toCenter()

    const data = MindElixir.new('New Topic')
    me.value.init(data)

    unlisten = await getCurrentWindow().onCloseRequested(async () => {
      const home = await homeDir()
      const filePath = await join(home, 'mind-elixir.json');
      const data = me.value.getDataString()
      await writeTextFile(filePath, data)
    })

    listen('menu:open', openFile)
    listen('menu:save', saveFile)
    listen('menu:export-svg', exportSvg)
  })

  onUnmounted(() => {
    unlisten()
  })
</script>

<style>
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: #0f0f0f;
    background-color: #f6f6f6;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  .container {
    margin: 0;
  }

  #map {
    background-color: cyan;
    height: 1000px;
    width: 100%;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
  }
</style>
