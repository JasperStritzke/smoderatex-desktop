<template>
  <form class="flex flex-col" @submit.prevent="e => $emit('submit', e)">
    <slot/>
  </form>
</template>

<script>
export default {
  name: "CustomForm",
  data: () => ({
    inputs: []
  }),
  created() {
  },
  methods: {
    register(instance) {
      this.inputs.push(instance)
    },
    validate() {
      let valid = true

      for (let input of this.inputs) {
        if (!input.validate()) valid = false
      }

      return valid
    },
    resetForm() {
      this.inputs.forEach(input => {
        input.$emit('update:modelValue', "");
      })
    }
  }
}
</script>

<style scoped>

</style>
