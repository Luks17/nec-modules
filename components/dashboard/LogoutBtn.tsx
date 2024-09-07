"use client";

import { logout } from "@/app/actions/AuthActions";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSetNotification } from "../notifications/NotificationProvider";
import { useRouter } from "next/navigation";

function LogoutBtn() {
  const router = useRouter();
  const setNotification = useSetNotification();

  async function clickHandler() {
    const { data, success } = await logout();

    if (!success) {
      setNotification({ message: data.message, messageType: "error" });
    } else {
      router.refresh();
    }
  }

  return (
    <button onClick={clickHandler} className="btn btn-ghost">
      <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
      <span>Sair</span>
    </button>
  );
}

export default LogoutBtn;
