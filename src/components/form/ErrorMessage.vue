<template>
    <span :class="{'error-message mt-1 text-sm text-red-600 font-medium flex flex-row gap-1': true, visible}">
      <ExclamationIcon class="w-4"/>
      <slot>
        {{ error || "No error provided" }}
      </slot>
    </span>
</template>

<script>
import {ExclamationIcon} from "@heroicons/vue/solid";

export default {
  name: "ErrorMessage",
  props: {
    error: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {ExclamationIcon},
}
</script>

<style scoped>
span.error-message {
  visibility: hidden;
}

span.error-message.visible {
  visibility: visible;
}
</style>
