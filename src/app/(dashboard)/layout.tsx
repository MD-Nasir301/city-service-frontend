import { Footer } from "@/components/layout/public/Footer";

import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <h1>This Is Dashboard Layout</h1>
      <main className="flex-1">{children}</main>
    </div>
  );
}
