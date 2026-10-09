
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLoading from "@/components/auth/auth-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  Tag,
  Layers,
} from "lucide-react";
import { useGetCategories } from "@/hooks/category.hook";

export default function ServicesPage() {
  const router = useRouter();
  const { data: categoriesResponse, isLoading, error } = useGetCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "FREE" | "PAID">("ALL");

  if (isLoading) {
    return <AuthLoading label="Loading Available Services..." />;
  }

  const categories = categoriesResponse?.data || [];

  // Filter Logic (Search & Tabs)
  const filteredCategories = categories.filter((cat: any) => {
    const matchesSearch =
      cat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const isPaid = cat.isPaid || cat.type === "PAID";

    if (filterType === "FREE") return matchesSearch && !isPaid;
    if (filterType === "PAID") return matchesSearch && isPaid;
    return matchesSearch;
  });

  const handleSelectCategory = (categoryId: string) => {
    // Redirecting to Create Request with Pre-selected Category
    router.push(`/citizen-dashboard/create-request?categoryId=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <Badge
          variant="outline"
          className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 rounded-full text-xs font-semibold"
        >
          <Sparkles className="size-3.5 mr-1.5 inline" /> Municipal Citizen Services
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Civic Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Select a service category below to request immediate assistance, maintenance, or city infrastructure support.
        </p>
      </div>

      {/* 2. Search & Filter Controls */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border shadow-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-xs bg-slate-50/50 border-slate-200 focus:bg-white"
          />
        </div>

        {/* Filter Tabs */}
        <Tabs
          defaultValue="ALL"
          onValueChange={(val) => setFilterType(val as "ALL" | "FREE" | "PAID")}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 h-10 bg-slate-100 p-1">
            <TabsTrigger value="ALL" className="text-xs font-medium">
              All Services
            </TabsTrigger>
            <TabsTrigger value="FREE" className="text-xs font-medium">
              Free
            </TabsTrigger>
            <TabsTrigger value="PAID" className="text-xs font-medium">
              Paid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 3. Category Grid */}
      <div className="max-w-5xl mx-auto">
        {error ? (
          <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl text-center space-y-2">
            <AlertCircle className="size-8 text-rose-500 mx-auto" />
            <h3 className="font-bold text-rose-800 text-sm">Failed to Load Services</h3>
            <p className="text-xs text-rose-600">Please refresh the page or try again later.</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="bg-white border p-12 rounded-2xl text-center space-y-3 shadow-sm">
            <Layers className="size-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-base">No Services Found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or switching tabs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category: any) => {
              const isPaid = category.isPaid || category.type === "PAID";

              return (
                <Card
                  key={category.id}
                  className="group hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between border-slate-200 bg-white"
                >
                  <CardHeader className="pb-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="size-9 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs">
                        <Tag className="size-4" />
                      </div>
                      <Badge
                        variant={isPaid ? "default" : "secondary"}
                        className={
                          isPaid
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 text-[10px]"
                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200 text-[10px]"
                        }
                      >
                        {isPaid ? (
                          <>
                            <CreditCard className="size-3 mr-1 inline" /> Paid Service
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="size-3 mr-1 inline" /> Free Service
                          </>
                        )}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0">
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {category.description ||
                        "Submit issue details, monitor status, and track municipal field team responses."}
                    </p>

                    <Button
                      onClick={() => handleSelectCategory(category.id)}
                      className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-xs h-9 transition-colors font-medium flex items-center justify-center gap-1.5"
                    >
                      Request This Service <ArrowRight className="size-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}