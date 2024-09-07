export type NotificationTypes = "info" | "success" | "warning" | "error";

export interface Notification {
  message: string;
  messageType: NotificationTypes;
}

export function enqueueNotification(notification: Notification) {
  if (typeof window !== "undefined") {
    localStorage.setItem("notification-msg", notification.message);
    localStorage.setItem("notification-type", notification.messageType);
  }
}
