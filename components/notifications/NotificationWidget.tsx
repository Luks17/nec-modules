"use client";

import { useEffect, useRef, useState } from "react";
import type { NotificationTypes } from "@/lib/ui/notifications/helpers";
import { useNotification } from "./NotificationProvider";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const NotificationTemplates = {
  info: {
    alert: "alert-info",
    icon: <InformationCircleIcon className="w-5 h-5" />,
  },
  success: {
    alert: "alert-success",
    icon: <CheckCircleIcon className="w-5 h-5" />,
  },
  warning: {
    alert: "alert-warning",
    icon: <ExclamationCircleIcon className="w-5 h-5" />,
  },
  error: {
    alert: "alert-error",
    icon: <XCircleIcon className="w-5 h-5" />,
  },
};

function NotificationWidget() {
  const notification = useNotification();
  const container = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(100);

  const alertType =
    NotificationTemplates[notification.messageType as NotificationTypes];

  // always check if open is true, otherwise a memory leak may happen
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        container.current!.classList.add("hidden");
        setProgress(100);
      }, 300);
    }

    if (open && progress > 0) {
      if (container.current!.classList.contains("hidden")) {
        container.current!.classList.remove("hidden");
      }
      const interval = setTimeout(() => {
        setProgress((old) => old - 1);
      }, 50);

      return () => clearTimeout(interval);
    } else if (open && progress <= 0) {
      setOpen(false);
    }
  }, [open, progress]);

  useEffect(() => {
    if (notification.message !== "") {
      setOpen(true);
    }
  }, [notification]);

  return (
    <div
      ref={container}
      className={`toast transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
    >
      <div className={`alert relative ${alertType.alert}`}>
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3"
        >
          <XMarkIcon className="opacity-50 hover:opacity-100 transition-opacity duration-300 w-5 h-5" />
        </button>
        <div className="px-2">
          <p className="flex items-center gap-x-2">
            {alertType.icon}
            <span className="text-neutral font-bold">
              {notification.message}
            </span>
          </p>
          <progress
            className="progress bg-base-100 w-full"
            value={progress}
            max={100}
          ></progress>
        </div>
      </div>
    </div>
  );
}

export default NotificationWidget;
