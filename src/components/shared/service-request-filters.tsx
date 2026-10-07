"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

export function ServiceRequestFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values
  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "ALL";
  const currentPriority = searchParams.get("priority") || "ALL";
  const currentType = searchParams.get("type") || "ALL";
  const currentSortBy = searchParams.get("sortBy") || "createdAt";

  // Helper to update query params
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 on filter change
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header Info inside Sidebar */}
      <div className="flex items-center gap-2 pb-2 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <SlidersHorizontal className="size-3.5" />
        Filter Options
      </div>

      {/* Search Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">
          Search Keywords
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            defaultValue={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-9 text-xs rounded-lg"
          />
        </div>
      </div>

      {/* Category Status */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Status</label>
        <Select
          value={currentStatus}
          onValueChange={(val) => handleFilterChange("status", val as string)}
        >
          <SelectTrigger className="h-9 text-xs rounded-lg w-full">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Service Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">
          Service Type
        </label>
        <Select
          value={currentType}
          onValueChange={(val) => handleFilterChange("type", val as string)}
        >
          <SelectTrigger className="h-9 text-xs rounded-lg w-full">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="FREE">FREE</SelectItem>
            <SelectItem value="PAID">PAID</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Priority */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">
          Priority
        </label>
        <Select
          value={currentPriority}
          onValueChange={(val) => handleFilterChange("priority", val as string)}
        >
          <SelectTrigger className="h-9 text-xs rounded-lg w-full">
            <SelectValue placeholder="All Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Priority</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="URGENT">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Sort By</label>
        <Select
          value={currentSortBy}
          onValueChange={(val) => handleFilterChange("sortBy", val as string)}
        >
          <SelectTrigger className="h-9 text-xs rounded-lg w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Newest First</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Filter Button */}
      <div className="pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="w-full h-9 text-xs gap-2 rounded-lg border-dashed hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
        >
          <RotateCcw className="size-3.5" /> Reset Filters
        </Button>
      </div>
    </div>
  );
}
