"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { adminRoutes, citizenRoutes, staffRoutes } from "@/routes"; 
import { Role } from "@/types/auth.type";
import Link from "next/link";
import { usePathname } from "next/navigation";


const sidebarRoutes: Record<string, any> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  STAFF: staffRoutes,
  CITIZEN: citizenRoutes,
};

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const routes = sidebarRoutes[role] || citizenRoutes;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <div className="flex items-center gap-2 p-2">
            <span className="text-xl font-bold tracking-tight text-primary">
              CitizenCare
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((group: any) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}