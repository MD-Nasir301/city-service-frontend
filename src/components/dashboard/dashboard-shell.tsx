import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { Role } from "@/types/auth.type";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: Role;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
