"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, AlertCircle, Sparkles } from "lucide-react";
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
        `/public-requests?search=${encodeURIComponent(searchQuery.trim())}`,
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
        "Staff members cannot submit requests. Please log in as a Citizen.",
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
    <section className="relative overflow-hidden  from-green-50/50 via-background to-background py-4 md:py-4 border-b">
      <div className="container px-4 md:px-8 mx-auto flex flex-col items-center text-center space-y-6 max-w-4xl">
        {/* Badge */}

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
          Report City Issues, <br className="hidden sm:inline" />
          <span className="text-violet-400">Track Progress Together</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search public complaints (e.g. Broken streetlight, Garbage)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11 bg-background shadow-sm rounded-xl"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-11 rounded-xl px-6 bg-green-600 hover:bg-green-700 text-white"
          >
            Search
          </Button>
        </form>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button
            size="lg"
            onClick={handleCreateRequest}
            className="rounded-xl font-semibold gap-2 shadow-md bg-green-600 hover:bg-green-700 text-white"
          >
            <AlertCircle className="size-4" />
            Submit Complaint / Request
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/public-requests")}
            className="rounded-xl font-semibold"
          >
            View Public Requests
          </Button>
        </div>
      </div>
    </section>
  );
}
