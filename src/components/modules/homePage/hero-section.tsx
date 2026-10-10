"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetMe } from "@/hooks/auth.hook";
import { toast } from "sonner";

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/public-requests?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const { data: userResponse } = useGetMe();

  const role = userResponse?.data?.role;

  const handleCreateRequest = () => {
    if (!role) {
      router.push("/login");
      return;
    }
    if (role === "STAFF") {
      toast.error(
        "Staff members cannot submit requests. Please log in as a Citizen."
      );
      return;
    }

    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      router.push("/admin-dashboard/create-request");
    }
    if (role === "CITIZEN") {
      router.push("/citizen-dashboard/create-request");
    }
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-10 border-b bg-slate-950">
      {/* Background Image */}
      <Image
        src="/hero-section.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover opacity-45 pointer-events-none"
      />

      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 pointer-events-none" />

      {/* Content Container */}
      <div className="container relative z-10 py-8 px-4 md:px-8 mx-auto flex flex-col items-center text-center space-y-6 max-w-4xl">
        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Report City Issues, <br className="hidden sm:inline" />
          <span className="text-emerald-400">Track Progress Together</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
          Submit public complaints or request premium municipal services in a
          few clicks. Help us build a cleaner, safer, and smarter city
          environment for everyone.
        </p>

        {/* Quick Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl flex items-center gap-2 pt-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search public complaints (e.g. Broken streetlight, Garbage)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11 bg-white/95 text-slate-900 placeholder:text-slate-500 shadow-sm rounded-xl border-none"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-11 rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            Search
          </Button>
        </form>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button
            size="lg"
            onClick={handleCreateRequest}
            className="rounded-xl font-semibold gap-2 shadow-md bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <AlertCircle className="size-4" />
            Submit Complaint / Request
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/public-requests")}
            className="rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
          >
            View Public Requests
          </Button>
        </div>
      </div>
    </section>
  );
}