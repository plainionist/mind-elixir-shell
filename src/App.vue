<template>
  <main class="container">
    <div id="map"></div>
    <div v-show="description" id="description" class="description">
      {{ description }}
    </div>
  </main>
</template>

<script setup lang="ts">
  import MindElixir from 'mind-elixir'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { open, save } from '@tauri-apps/plugin-dialog'
  import { writeTextFile, readTextFile, watchImmediate } from '@tauri-apps/plugin-fs'
  import { listen } from '@tauri-apps/api/event'
  import { getCurrentWindow } from '@tauri-apps/api/window'
  import { homeDir, join } from '@tauri-apps/api/path'
  import { Sunset } from './themes'

  const me = ref()
  const description = ref('')
  let watchedFile = ref<string | null>(null)
  let unwatch: (() => void) | null = null

  const loadFile = async (filePath: string) => {
    const contents = await readTextFile(filePath)
    me.value.init(JSON.parse(contents))
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

  let isCtrlPressed = false

  document.addEventListener('keydown', function (event) {
    if (event.ctrlKey) {
      isCtrlPressed = true
    }
  })

  document.addEventListener('keyup', function (event) {
    if (!event.ctrlKey) {
      isCtrlPressed = false
    }
  })

  let unlisten = () => {}

  const updateCanvasSize = () => {
    if (document.fullscreenElement) {
      const map = document.getElementById('map')
      if (map) {
        const windowHeight = window.innerHeight
        map.style.width = '100vw'
        map.style.height = `${windowHeight}px`
      }
    }
  }

  let scale = 1.0

  onMounted(async () => {
    me.value = new MindElixir({
      el: '#map',
      direction: MindElixir.SIDE,
      theme: Sunset
    })

    me.value.bus.addListener('scale', (value: any) => {
      scale = value > 1.0 ? value : 1.0
    })

    me.value.bus.addListener('selectNode', (node: any) => {
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

    document.documentElement.requestFullscreen()
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    setInterval(updateCanvasSize, 100)

    me.value.toCenter()

    const data = MindElixir.new('New Topic')
    me.value.init(data)

    unlisten = await getCurrentWindow().onCloseRequested(async () => {
      const home = await homeDir()
      const filePath = await join(home, 'mind-elixir.json')
      const data = me.value.getDataString()
      await writeTextFile(filePath, data)
    })

    listen('menu:open', openFile)
    listen('menu:save', saveFile)
    listen('menu:export-svg', exportSvg)
  })

  onUnmounted(() => {
    unlisten()
    if (unwatch) {
      unwatch()
    }
  })
</script>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,
      WenQuanYi Micro Hei, sans-serif;
    font-size: 15px;

    color: #0f0f0f;
    background-color: #f6f6f6;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
  }

  .container {
    margin: 0;
  }

  #map {
    margin: 0;
    height: 1000px;
    width: 100%;
  }

  .description {
    position: fixed !important;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(245, 245, 245, 0.95);
    color: black;
    padding: 20px 20px;
    font-size: 18px;
    border-radius: 10px;
    max-width: 80%;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 9999 !important;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
  }
</style>
