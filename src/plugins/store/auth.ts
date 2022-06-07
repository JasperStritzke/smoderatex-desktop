import {defineStore} from "pinia"

export interface UserInfo {
    instance: string,
    username: string,
    authToken: string,
    role: string,
}

let rawSavedUserInfo = localStorage.getItem("userInfo")
let userInfo: UserInfo | undefined = undefined
if (rawSavedUserInfo) {
    userInfo = JSON.parse(rawSavedUserInfo) as UserInfo

    if (!(userInfo.username && userInfo.authToken && userInfo.role)) {
        userInfo = undefined
    }
}

export const useAuth = defineStore("auth", {
    state: (): { userInfo: UserInfo | undefined } => ({
        userInfo: userInfo,
    }),
    getters: {
        isLoggedIn({userInfo}) {
            return !!userInfo
        }
    },
    actions: {
        login({
                  instance,
                  username,
                  password,
                  rememberMe
              }: { instance: string, username: string, password: string, rememberMe: boolean }) {
            this.userInfo = {instance, username, authToken: Math.random() + "", role: "F"}
            if (rememberMe) {
                localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
            } else {
                localStorage.removeItem("userInfo")
            }
            //throw new Error("Unimplemented auth")
        },
        logout() {

        }
    }
})