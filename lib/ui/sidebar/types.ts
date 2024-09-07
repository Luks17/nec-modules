import type RouteProtection from "@/lib/auth/RouteProtection";

export interface SidebarItem {
  title: string;
  list: SidebarLink[];
}

export interface SidebarLink {
  label: string;
  icon: string;
  url: string;
  protection: RouteProtection;
}
