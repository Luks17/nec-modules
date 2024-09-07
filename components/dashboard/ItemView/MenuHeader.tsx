"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { enumEntries } from "@/lib/enums/common";
import type React from "react";
import { useSetNotification } from "../../notifications/NotificationProvider";

interface MenuHeaderProps<T extends Record<string, string>> {
  editUrl?: string;
  deleteHandler?: Function;
  updateStatusEnum?: T;
  updateStatusHandler?: Function;
  target: string;
}

export default function MenuHeader<T extends Record<string, string>>({
  editUrl,
  deleteHandler,
  updateStatusEnum,
  updateStatusHandler,
  target,
}: MenuHeaderProps<T>) {
  const router = useRouter();
  const setNotification = useSetNotification();

  function onDeleteItemClick() {
    if (deleteHandler) deleteHandler(target);

    setNotification({
      message: "Atenção: Item excluído com sucesso",
      messageType: "warning",
    });
    router.back();
  }

  function onUpdateStatusClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (updateStatusHandler) updateStatusHandler(target, e.currentTarget.value);

    setNotification({
      message: "Item atualizado com sucesso",
      messageType: "success",
    });
    router.back();
  }

  return (
    <div className="flex justify-end gap-x-3 pb-3">
      {editUrl && (
        <Link className="btn btn-secondary" href={editUrl}>
          Editar
        </Link>
      )}
      {deleteHandler && (
        <button
          type="button"
          onClick={onDeleteItemClick}
          className="btn btn-secondary"
        >
          Deletar
        </button>
      )}
      {updateStatusEnum && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-secondary">
            Atualizar
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 rounded-box z-10 shadow min-w-40"
          >
            {enumEntries(updateStatusEnum).map((entry) => (
              <li key={entry.key}>
                <button
                  type="button"
                  className="btn btn-sm btn-block capitalize justify-start btn-ghost"
                  onClick={onUpdateStatusClick}
                  value={entry.value}
                >
                  {entry.key}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
