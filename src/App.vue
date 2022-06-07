<template>
  <notification-container/>
  <div class="h-full">
    <router-view/>
  </div>
</template>
<style>
*:not(input) {
  user-select: none;
  cursor: default;
}

@keyframes fadeIn {
  from {
    opacity: .9;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

</style>
<script setup>
import NotificationContainer from "./components/notification/NotificationContainer.vue";
</script>
