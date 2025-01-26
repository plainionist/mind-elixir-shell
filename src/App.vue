<template>
  <main class="container">
    <div id="map"></div>
  </main>
</template>

<script setup lang="ts">
  import MindElixir from 'mind-elixir'
  import { onMounted, ref } from 'vue'
  import { softwareEngineering } from './sample-data'; 

  const me = ref()

  onMounted(() => {
    me.value = new MindElixir({
      el: '#map',
      direction: MindElixir.SIDE,
    })
    me.value.mindElixirBox.requestFullscreen()
    me.value.toCenter()
    me.value.init(softwareEngineering)
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
