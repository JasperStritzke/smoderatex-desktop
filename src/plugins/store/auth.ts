import { defineStore } from "pinia";
import router from "../router";

export interface UserInfo {
  instance: string;
  username: string;
  authToken: string;
  role: string;
}

let rawSavedUserInfo = localStorage.getItem("userInfo");
let userInfo: UserInfo | undefined = undefined;
if (rawSavedUserInfo) {
  userInfo = JSON.parse(rawSavedUserInfo) as UserInfo;

  if (!(userInfo.username && userInfo.authToken && userInfo.role)) {
    userInfo = undefined;
  }
}

export const useAuth = defineStore("auth", {
  state: (): { userInfo: UserInfo | undefined } => ({
    userInfo: userInfo,
  }),
  getters: {
    isLoggedIn({ userInfo }) {
      return !!userInfo;
    },
  },
  actions: {
    login({ instance, username, password, rememberMe }: { instance: string; username: string; password: string; rememberMe: boolean }) {
      //just to debug the ui ^^
      if(password !== "123123") {
        throw new Error("Invalid credentials")
      }
      this.userInfo = { instance, username, authToken: Math.random() + "", role: "F" };
      if (rememberMe) {
        localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      } else {
        localStorage.removeItem("userInfo");
      }
      //throw new Error("Unimplemented auth")
    },
    logout() {
      localStorage.removeItem("userInfo");
      this.userInfo = undefined;
      router.push("/login").catch();
    },
  },
});
