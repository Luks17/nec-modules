"use client";

import {
  type Notification,
  enqueueNotification,
} from "@/lib/ui/notifications/helpers";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

export default function ProtectedRouteWrapper({
  children,
  hasClearance,
  message = "Você não tem acesso a este recurso!",
}: {
  children: ReactNode;
  hasClearance: boolean;
  message?: string;
}) {
  const router = useRouter();

  if (!hasClearance) {
    useEffect(() => {
      const notification: Notification = { message, messageType: "warning" };
      enqueueNotification(notification);

      router.push("/dashboard");
    }, []);

    return null;
  } else {
    return children;
  }
}
