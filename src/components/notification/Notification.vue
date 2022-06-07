<template>
  <div
      class="notification__parent" :data-type="notification.type"
      @mousedown="startDrag" @mousemove="drag" @mouseup="stopDrag" @blur="console.log('BLUR')"
  >
    <div class="notification__icon">
      <CheckIcon v-if="notification.type === NotificationType.SUCCESS"/>
      <ExclamationIcon v-else-if="notification.type === NotificationType.WARNING"/>
      <XCircleIcon v-else/>
    </div>
    <p>{{ notification.message }}</p>
  </div>
</template>

<script setup lang="ts">
import {Notification, NotificationType, useNotifyStore} from "../../plugins/store/notify";
import {CheckIcon, ExclamationIcon, XCircleIcon} from "@heroicons/vue/solid";
import {onMounted} from "vue";

const {notification}: { notification: Notification } = defineProps<{ notification: Notification }>()

const notifyStore = useNotifyStore();

let removeTask: NodeJS.Timeout
onMounted(() => {
      removeTask = setTimeout(
          () => removeNotification(),
          notification.durationInSeconds! * 1000
      )
    }
)

function removeNotification() {
  notifyStore.removeNotification(notification.id!);
  clearTimeout(removeTask)
}
</script>

<style scoped>
/**
  Notification Types:
  0 success
  1 warning
  2 error
 */
div.notification__parent {
  @apply w-fit flex flex-row gap-5 px-3 py-2 rounded-md z-40
  border border-opacity-50 border-green-400 bg-green-100 duration-75 overflow-clip
}

/* WARNING */
div.notification__parent[data-type="1"] {
  @apply border border-opacity-50 border-orange-400 bg-orange-100
}

/* ERROR */
div.notification__parent[data-type="2"] {
  @apply border border-opacity-50 border-red-400 bg-red-100
}

/* TEXT */
div.notification__parent p {
  @apply font-medium text-green-700
}

/* WARNING */
div.notification__parent[data-type="1"] p {
  @apply text-orange-700
}

/* ERROR */
div.notification__parent[data-type="2"] p {
  @apply text-red-700
}

/* ICON */

div.notification__icon {
  @apply w-6 rounded-full
  bg-opacity-25 p-1 bg-green-500 text-green-700
}

/* WARNING */
div.notification__parent[data-type="1"] .notification__icon {
  @apply bg-opacity-25 bg-orange-500 text-orange-700
}

/* ERROR */
div.notification__parent[data-type="2"] .notification__icon {
  @apply bg-opacity-25 bg-red-500 text-red-700
}
</style>
