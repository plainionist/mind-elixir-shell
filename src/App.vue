<template>
  <main class="container">
    <div id="map"></div>
  </main>
</template>

<script setup lang="ts">
  import MindElixir from 'mind-elixir'
  import example from 'mind-elixir/example'
  import { onMounted, ref } from 'vue'

  // let options = {
  //   el: '#map'
  // }

  // let mind = new MindElixir(options)

  // const data = MindElixir.new('new topic')
  // mind.init(data)

  const me = ref()

  onMounted(() => {
    me.value = new MindElixir({
      el: '#map'
    })
    me.value.init(example)
    me.value.mindElixirBox.requestFullscreen()
    me.value.toCenter()
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
