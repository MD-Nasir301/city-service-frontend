"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/dashboard-sidebar";
import { useGetMe } from "@/hooks/auth.hook";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userData, isLoading } = useGetMe();

  const userRole = userData?.data?.role;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Spinner className="size-8 text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <main className="w-full min-h-screen bg-slate-50">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-6">
          <SidebarTrigger />
          <div className="font-semibold text-slate-700">Dashboard</div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
