
import { Loader2 } from "lucide-react";

export default function AuthLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-slate-50">
      <Loader2 className="size-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}