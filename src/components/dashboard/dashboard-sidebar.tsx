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
} from "@/components/ui/sidebar";
import { useGetMe } from "@/hooks/auth.hook";
import { adminRoutes, citizenRoutes, staffRoutes } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppSidebarProps {
  userRole?: "ADMIN" | "SUPER_ADMIN" | "STAFF" | "CITIZEN";
}

export function AppSidebar({ userRole = "CITIZEN" }: AppSidebarProps) {
  const pathname = usePathname();

  const getRoutes = () => {
    switch (userRole) {
      case "ADMIN":
      case "SUPER_ADMIN":
        return adminRoutes;
      case "STAFF":
        return staffRoutes;
      case "CITIZEN":
      default:
        return citizenRoutes;
    }
  };

  const routes = getRoutes();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-bold tracking-tight">
          {userRole === "ADMIN" || userRole === "SUPER_ADMIN"
            ? "Admin Panel"
            : userRole === "STAFF"
              ? "Staff Portal"
              : "CitizenCare"}
        </h2>
      </SidebarHeader>

      <SidebarContent>
        {routes.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
