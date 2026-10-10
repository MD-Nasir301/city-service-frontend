"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ShieldCheck,
  Zap,
  CreditCard,
  Users,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <Badge
          variant="outline"
          className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 rounded-full text-xs font-semibold"
        >
          <Sparkles className="size-3.5 mr-1.5 inline" /> Modern Smart Civic
          Governance
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Transforming Municipal Services Through{" "}
          <span className="text-indigo-600">Digital Innovation</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Our automated Service Management System bridges the gap between
          citizens, city staff, and administrators—delivering fast, transparent,
          and hassle-free public services.
        </p>
      </div>

      {/* 2. Platform Overview & Mission */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
            Our Mission
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Empowering Citizens with Seamless Public Services
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Traditionally, requesting civic repairs or public services required
            tedious paperwork and physical visits. Our platform digitizes the
            entire lifecycle—allowing citizens to submit requests online, track
            real-time resolution progress, and securely pay service fees in
            seconds.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>
                Real-time status tracking from submission to completion.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>
                Transparent fee structure with Stripe automated payment
                gateways.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>
                Automated staff assignment for quick emergency response.
              </span>
            </li>
          </ul>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-2">
              <div className="size-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="size-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">
                Instant Reporting
              </h3>
              <p className="text-xs text-slate-500">
                Submit issue details with images and exact map locations easily.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-2">
              <div className="size-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <CreditCard className="size-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">
                Online Payments
              </h3>
              <p className="text-xs text-slate-500">
                Securely pay for paid civic services using Stripe integration.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-2">
              <div className="size-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                <Users className="size-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">
                Role Workflow
              </h3>
              <p className="text-xs text-slate-500">
                Dedicated dashboards for Citizens, Staff, and System Admins.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-2">
              <div className="size-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">
                Verified Audit
              </h3>
              <p className="text-xs text-slate-500">
                Complete accountability with full action logs and resolution
                proof.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. System Workflow / How It Works */}
      <div className="max-w-5xl mx-auto bg-white border rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">
            How The System Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A simplified 4-step workflow designed for maximum efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="space-y-2 text-center p-4 rounded-xl bg-slate-50 border">
            <div className="size-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs mx-auto">
              1
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">
              Submit Request
            </h4>
            <p className="text-xs text-slate-500">
              Citizens log in and report an issue with location and photos.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2 text-center p-4 rounded-xl bg-slate-50 border">
            <div className="size-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs mx-auto">
              2
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">
              Admin Review
            </h4>
            <p className="text-xs text-slate-500">
              Admins inspect requests and assign qualified field staff.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2 text-center p-4 rounded-xl bg-slate-50 border">
            <div className="size-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs mx-auto">
              3
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">
              Staff Resolution
            </h4>
            <p className="text-xs text-slate-500">
              Assigned officers accept tasks and execute on-site work.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-2 text-center p-4 rounded-xl bg-slate-50 border">
            <div className="size-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs mx-auto">
              4
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">
              Completion & Audit
            </h4>
            <p className="text-xs text-slate-500">
              Status updates to Resolved, closing the request lifecycle.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Call to Action Banner */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 sm:p-10 rounded-2xl text-center space-y-4 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Ready to Experience Better Public Services?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Join thousands of citizens making our city cleaner, safer, and smarter
          everyday.
        </p>
        <div className="pt-2 flex justify-center -ml-10">
          <Link href="/services">
            <Button
              variant="outline"
              className="border-slate-700 bg-amber-300 text-slate-600 hover:bg-slate-800 hover:text-white text-xs sm:text-sm"
            >
              Explore Available Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
