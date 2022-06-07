import {defineStore} from "pinia";

export enum NotificationType {
    SUCCESS,
    WARNING,
    ERROR
}

export interface Notification {
    type: NotificationType,
    message: string,
    durationInSeconds?: number,
    id?: number
}

export const useNotifyStore = defineStore("notify", {
    state: (): { notifications: Notification[] } => ({
        notifications: [],
    }),
    actions: {
        dispatchNotification(notification: Notification) {
            if (!notification.durationInSeconds) notification.durationInSeconds = 5;
            this.notifications.push({...notification, id: Math.floor(Math.random() * 100000)})
        },
        removeNotification(id: number) {
            this.notifications = this.notifications.filter(n => n.id !== id)
        }
    }
})
