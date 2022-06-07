<template>
  <floating-drag-area height="40"/>
  <div class="w-full flex flex-col justify-center items-center h-full">
    <div class="w-64">
      <p class="font-medium text-2xl mb-2 dark:text-white">Login</p>
      <div class="flex flex-col">
        <CustomForm ref="form" @submit="login">
          <text-input placeholder="Instance-Address" :rules="requiredRule" v-model="instance">
            <ServerIcon class="w-5"/>
          </text-input>
          <text-input placeholder="Username" :rules="requiredRule" v-model="username">
            <UserIcon class="w-5"/>
          </text-input>
          <text-input placeholder="Password" :rules="requiredRule" v-model="password" type="password">
            <LockClosedIcon class="w-5"/>
          </text-input>
          <CheckBox label="Remember me" v-model="rememberMe"/>
          <Button label="Login" class="mt-3" @click="login" :loading="loading" type="submit"/>

          <ErrorMessage error="Please verify the instance" :visible="invalidCredentials"/>
          <ErrorMessage error="Please verify your credentials" :visible="invalidCredentials"/>
        </CustomForm>
      </div>
    </div>
    <p class="text-sm w-full text-center mb-2 opacity-30 dark:text-white absolute bottom-1 left-0 right-0">SModerateX -
      moderation made easy</p>
  </div>
</template>

<script setup lang="ts">
import FloatingDragArea from "../components/FloatingDragArea.vue";
import TextInput from "../components/form/TextInput.vue";
import Button from "../components/form/Button.vue";
import {UserIcon, ServerIcon, LockClosedIcon} from "@heroicons/vue/solid";
import CustomForm from "../components/form/CustomForm.vue";
import {ref} from "vue";
import {useAuth} from "../plugins/store/auth";
import router from "../plugins/router";
import ErrorMessage from "../components/form/ErrorMessage.vue";
import CheckBox from "../components/form/CheckBox.vue";
import {NotificationType, useNotifyStore} from "../plugins/store/notify";

let form: any = ref(null)

let requiredRule = ref([(v: string): boolean | string => !!v || "Field is required"]);

let instance = ref("");
let username = ref("");
let password = ref("");

let rememberMe = ref(false);

let loading = ref(false);
let invalidCredentials = ref(false);

const authStore = useAuth();
const notifyStore = useNotifyStore();

function login() {
  if (loading.value) return;

  invalidCredentials.value = false;

  if (form.value?.validate()) {

    loading.value = true;
    setTimeout(() => {
      loading.value = false;

      try {
        authStore.login({
          instance: instance.value,
          username: username.value,
          password: password.value,
          rememberMe: rememberMe.value
        })
        router.push("/app/dashboard")
        notifyStore.dispatchNotification({
          type: NotificationType.SUCCESS,
          message: `Logged in as ${username.value}`,
        })
      } catch (e) {
        invalidCredentials.value = true;
        notifyStore.dispatchNotification({
          type: NotificationType.ERROR,
          message: "Unable to login!",
        })
      }
    }, 500)
  }
}
</script>

<style scoped>

</style>
