<template>
  <div>
    <current-route-title/>
    <Button label="Success" @click="dispatchSuccess"/>
    <Button label="Warn" @click="dispatchWarn"/>
    <Button label="Error" @click="dispatchError"/>
  </div>
</template>
<script setup lang="ts">
import CurrentRouteTitle from "../util/CurrentRouteTitle.vue";
import {NotificationType, useNotifyStore} from "../../../plugins/store/notify";
import Button from "../../../components/form/Button.vue";

const notifyStore = useNotifyStore();

function dispatchSuccess() {
  notifyStore.dispatchNotification({
    type: NotificationType.SUCCESS,
    message: "Hello"
  })
}
function dispatchWarn() {
  notifyStore.dispatchNotification({
    type: NotificationType.WARNING,
    message: "Hello :I"
  })
}
function dispatchError() {
  notifyStore.dispatchNotification({
    type: NotificationType.ERROR,
    message: "Hello :("
  })
}
</script>
