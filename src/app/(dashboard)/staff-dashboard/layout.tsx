import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={["STAFF"]}>
      <DashboardShell role="STAFF">{children}</DashboardShell>
    </RoleGuard>
  );
}