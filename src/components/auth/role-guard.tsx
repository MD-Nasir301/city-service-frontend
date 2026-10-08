"use client";

import { useGetMe } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "@/components/auth/auth-loading";

interface RoleGuardProps {
  children: ReactNode;
  roles: string[];
}

export default function RoleGuard({ children, roles }: RoleGuardProps) {
  const router = useRouter();
  const { data, isPending } = useGetMe();
  const user = data?.data;

  useEffect(() => {
    if (isPending) return;

    if (user && !roles.includes(user.role)) {
      router.replace("/");
    }
  }, [isPending, user, roles, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (!user || !roles.includes(user.role)) {
    return <AuthLoading label="Checking authorization..." />;
  }

  return <>{children}</>;
}
