<!--suppress CssUnusedSymbol -->
<template>
  <button :type="type" :class="{loading}">
    <loading-indicator v-if="loading"/>
    <span v-else class="text-center">{{ label }}</span>
  </button>
</template>

<script>
import LoadingIndicator from "../LoadingIndicator.vue";

export default {
  components: {LoadingIndicator},
  props: {
    label: String,
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button"
    }
  },
}
</script>

<style scoped>
button {
  @apply h-10 inline-flex justify-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500
  duration-100 focus:outline-1 outline-indigo-500 outline-offset-2
}

button:not(.loading) {
  @apply hover:bg-indigo-600 active:bg-indigo-700
}
</style>
