<template>
  <div class="h-full w-full">
    <floating-drag-area height="40"/>
    <div class="h-full w-full flex flex-row">
      <div class="h-full w-96 bg-gray-50 p-5 pt-10 mr-7 shadow flex flex-col gap-2 relative">
        <sidebar-icon
            v-for="route in routes" :key="route.name" :route="route" :active="$route.path.startsWith(route.route)"
            @click="goto(route.route)"
        />

        <div class="flex-grow"></div>
        <sidebar-icon :active="false" :route="{name: 'Account', icon: 'user', color: 'blue'}"/>
        <sidebar-icon :active="false" :route="{name: 'Logout', icon: 'log-out', color: 'red'}" @click="logout"/>
      </div>
      <div class="px-4 pt-10 w-full h-full">
        <router-view v-slot="{ Component }">
          <component :is="Component" class="animate-routing"/>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import SidebarIcon from "./util/SidebarIcon.vue";
import router from "../../plugins/router";
import FloatingDragArea from "../../components/FloatingDragArea.vue";
import {useAuth} from "../../plugins/store/auth";

const routes = ref([
  {
    name: "Dashboard",
    route: "/app/dashboard",
    icon: "aperture",
    color: "purple",
  },
  {
    name: "Punishments",
    route: "/app/punishments",
    icon: "x-octagon",
    color: "amber",
  },
  {
    name: "Chatlogs",
    route: "/app/chatlog",
    icon: "clock",
    color: "red",
  },
  {
    name: "Notifications",
    route: "/app/notifications",
    icon: "bell",
    color: "green",
  }
])

function goto(route: string) {
  router.push(route)
}

const authStore = useAuth();

function logout() {
  authStore.logout();
}
</script>
<style scoped>
.animate-routing {
  opacity: 0;
  animation: fadeIn .2s forwards;
  transform: scale(1);
}
</style>
