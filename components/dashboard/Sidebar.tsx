import Link from "next/link";
import type { SidebarLink } from "@/lib/ui/sidebar/types";
import { menuItems } from "@/lib/ui/sidebar/items";
import React from "react";
import type { User } from "lucia";

function Sidebar({ user }: { user: User }) {
  return (
    <aside className="min-h-screen bg-base-100 text-base-content w-72 lg:w-80">
      <div className="sticky top-0 text-center pt-5 pb-4 font-bold text-lg border-b border-b-base-200">
        <div>
          <span className="relative bg-gradient-to-r items-center from-primary via-secondary to-accent bg-clip-text font-black text-transparent">
            <span className="absolute bg-gradient-to-r blur-xl from-primary via-secondary to-accent bg-clip-text font-black text-transparent">
              Olá, {user.nome.split(" ")[0]}
            </span>
            Olá, {user.nome.split(" ")[0]}
          </span>
        </div>
      </div>
      <ul className="menu">
        {menuItems.map((item, i) => {
          const clearedLinks = item.list.filter((link) =>
            link.protection.checkClearance(user)
          );

          return clearedLinks.length > 0 ? (
            <React.Fragment key={i}>
              <li className="menu-title pointer-events-none">
                <h6>{item.title}</h6>
              </li>
              <li>
                <SidebarLinks sidebarLinks={clearedLinks} />
              </li>
            </React.Fragment>
          ) : null;
        })}
      </ul>
    </aside>
  );
}

function SidebarLinks({ sidebarLinks }: { sidebarLinks: SidebarLink[] }) {
  return (
    <ul className="rounded-box">
      {sidebarLinks.map((item, i) => (
        <li key={i}>
          <Link href={`/dashboard/${item.url}`}>
            {item.icon}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
