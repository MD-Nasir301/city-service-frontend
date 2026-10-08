import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={["CITIZEN"]}>
      <DashboardShell role="CITIZEN">{children}</DashboardShell>
    </RoleGuard>
  );
}