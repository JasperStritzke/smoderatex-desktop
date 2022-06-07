<template xmlns="http://www.w3.org/1999/html">
  <div :class="{invalid: !!error}">
    <label class="relative block">
      <span class="sr-only">Search</span>
      <span class="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-300"><slot/></span>
      <input
          :type="type" :value="modelValue"
          @input="e => $emit('update:modelValue', e.target.value)"
          :placeholder="placeholder"
      />
    </label>
    <ErrorMessage :error="error" :visible="!!error"/>
  </div>
</template>

<script>
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "TextInput",
  props: {
    modelValue: String,
    placeholder: String,
    rules: Array,
    type: {
      type: String,
      default: "text"
    }
  },
  data: () => ({
    error: undefined,
  }),
  emits: ['update:modelValue'],
  components: {ErrorMessage},
  created() {
    if (this.$parent.register) this.$parent.register(this)
  },
  methods: {
    validate() {
      if (!this.rules) return

      for (let rule of this.rules) {
        let err;
        if ((err = rule(this.modelValue)) !== true) {
          this.error = err
          return false
        }
      }

      this.error = undefined
      return true
    }
  }
}
</script>

<style scoped>
input {
  @apply placeholder:italic placeholder:text-slate-400 block w-full border
  border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-indigo-500
  focus:ring-indigo-500 focus:ring-1 sm:text-sm bg-white bg-opacity-10
  outline-none
}

div.invalid input {
  @apply border-red-600 ring-red-500
}
</style>
