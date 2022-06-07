<template>
  <div class="flex flex-row items-center gap-2 outline-none relative" @click="$emit('update:modelValue', !modelValue)">
    <div class="checkbox">
      <CheckIcon v-if="modelValue" class="text-green-600 animate-check"/>
    </div>
    <span class="text-black font-medium">{{ label }}</span>
  </div>
</template>

<script>
import {CheckIcon} from "@heroicons/vue/solid";

export default {
  name: "CheckBox",
  props: {
    modelValue: Boolean,
    label: String
  },
  emits: ['update:modelValue'],
  components: {CheckIcon},
}
</script>

<style scoped>
div.checkbox {
  @apply w-5 h-5 border-slate-300 border shadow-sm rounded
}

.animate-check {
  opacity: 1;
  transform: scale(1);
  animation: animateCheck 0.1s forwards;
}

@keyframes animateCheck {
  from {
    opacity: 0.5;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
