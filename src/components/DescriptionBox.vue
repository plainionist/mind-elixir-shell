<template>
  <div v-show="description" ref="descriptionBox" class="description">
    {{ description }}
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineProps<{ description: string | undefined }>()

  const descriptionBox = ref<HTMLElement | null>(null)
  defineExpose({ descriptionBox })
</script>

<style scoped>
  .description {
    position: fixed !important;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgb(255, 255, 255);
    border: solid 2px black;
    color: black;
    padding: 20px 20px;
    font-size: 18px;
    border-radius: 10px;
    white-space: nowrap;
    max-width: 80%;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 9999 !important;
  }
</style>
