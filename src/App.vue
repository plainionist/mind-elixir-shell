<template>
  <main class="container">
    <div id="map"></div>
    <DescriptionBox ref="descriptionBox" :description="description" />
  </main>
</template>

<script setup lang="ts">
  import MindElixir, { MindElixirInstance } from 'mind-elixir'
  import { ComponentPublicInstance, onMounted, ref } from 'vue'
  import { listen } from '@tauri-apps/api/event'
  import { Sunset } from './themes'
  import DescriptionBox from './components/DescriptionBox.vue'
  import { useDescription } from './composables/useDescription'
  import { useSaveOnClose } from './composables/useSaveOnClose'
  import { useFileOperations } from './composables/useFileOperations'

  const me = ref<MindElixirInstance | null>(null)

  const descriptionBox = ref<ComponentPublicInstance | null>(null)
  const { description, attachDescriptionListeners } = useDescription(descriptionBox)

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

  onMounted(async () => {
    me.value = new MindElixir({
      el: '#map',
      direction: MindElixir.SIDE,
      theme: Sunset
    })

    attachDescriptionListeners(me.value)
    useSaveOnClose(me.value)
    const { openFile, saveFile, exportSvg } = useFileOperations(me.value)

    document.documentElement.requestFullscreen()
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    setInterval(updateCanvasSize, 100)

    me.value.toCenter()

    const data = MindElixir.new('New Topic')
    me.value.init(data)

    listen('menu:open', openFile)
    listen('menu:save', saveFile)
    listen('menu:export-svg', exportSvg)
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

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
  }
</style>
