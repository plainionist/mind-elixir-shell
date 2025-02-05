<template>
  <div v-show="description" id="description" class="description">
    {{ description }}
  </div>
</template>

<script setup lang="ts">
  defineProps<{ description: string }>()
</script>

<style scoped>
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
</style>
