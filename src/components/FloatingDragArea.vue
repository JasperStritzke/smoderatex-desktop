<template>
  <div class="absolute left-0 right-0 top-0 h-8" :style="{height: `${height}px`}"/>
</template>

<script>
export default {
  name: "FloatingDragArea",
  props: ['height']
}
</script>

<style scoped>
div {
  -webkit-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
}
</style>
