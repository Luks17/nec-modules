"use client";

import type { Notification } from "@/lib/ui/notifications/helpers";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import NotificationWidget from "./NotificationWidget";
import { usePathname } from "next/navigation";

const NotificationContext = createContext<Notification | null>(null);

const SetNotificationContext = createContext<Dispatch<
  SetStateAction<Notification>
> | null>(null);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification>({
    message: "",
    messageType: "info",
  });

  const pathname = usePathname();

  function notify() {
    const message = localStorage.getItem("notification-msg");
    const type = localStorage.getItem("notification-type");

    if (message && type) {
      setNotification({
        message,
        messageType: type as Notification["messageType"],
      });

      localStorage.removeItem("notification-msg");
      localStorage.removeItem("notification-type");
    }
  }

  useEffect(() => {
    notify();
  }, [pathname]);

  return (
    <NotificationContext.Provider value={notification}>
      <SetNotificationContext.Provider value={setNotification}>
        {children}
        <NotificationWidget />
      </SetNotificationContext.Provider>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext)!;
export const useSetNotification = () => useContext(SetNotificationContext)!;

export default NotificationProvider;
