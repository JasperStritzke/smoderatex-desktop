<!--suppress CssUnusedSymbol -->
<template>
  <div class="fixed top-0 right-0 flex flex-col items-end pr-3 z-50 pointer-events-none">
    <TransitionGroup name="list">
      <notification
          v-for="notification in notify.notifications" :key="notification.id"
          :notification="notification" class="mt-3"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useNotifyStore} from "../../plugins/store/notify";
import Notification from "./Notification.vue";

export default defineComponent({
  components: {Notification},
  setup() {
    const notify = useNotifyStore();

    return {
      notify
    }
  }
})

</script>
<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transform: translateY(0);
  opacity: 1;
  transition: all 5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
