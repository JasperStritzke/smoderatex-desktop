<!--suppress CssUnusedSymbol -->
<template>
  <div :class="{'item': true, active}">
    <vue-feather :type="route.icon" :class="{'w-5': true, [`text-${route.color}-600`]: true}"/>
    <p class="font-medium text-sm ml-2">{{ route.name }}</p>
  </div>
</template>

<script>
export default {
  name: "SidebarIcon",
  props: ["route", "active"]
}
</script>

<style scoped>
div.item {
  @apply flex flex-row items-center p-2 rounded-md w-full hover:bg-gray-200 duration-75
}

div.item.active {
  @apply bg-indigo-100 text-indigo-600
}

div.item.active .vue-feather {
  @apply text-indigo-600
}

/* JUST HAVE TO INCLUDE ALL POSSIBLE INTERPOLATED CLASSES FOR TAILWIND PURGE */
#tailwind_include_classes {
  @apply text-red-600 text-amber-600 text-pink-600 text-purple-600 text-blue-600
}
</style>
