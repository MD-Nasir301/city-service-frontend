"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useGetSingleServiceRequest } from "@/hooks/service-request.hook";
import AuthLoading from "@/components/auth/auth-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Clock,
  CreditCard,
  AlertCircle,
  Tag,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Status Badge Helper
const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>;
    case "ASSIGNED":
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Assigned</Badge>;
    case "ACCEPTED":
      return <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">Accepted</Badge>;
    case "IN_PROGRESS":
      return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">In Progress</Badge>;
    case "RESOLVED":
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Resolved</Badge>;
    case "REJECTED":
      return <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">Rejected</Badge>;
    case "CANCELLED":
      return <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function ServiceRequestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: requestResponse, isLoading, error } = useGetSingleServiceRequest(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return <AuthLoading label="Loading Request Details..." />;
  }

  if (error || !requestResponse?.data) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <AlertCircle className="size-12 text-rose-500" />
        <h2 className="text-xl font-bold text-slate-800">Service Request Not Found</h2>
        <p className="text-sm text-slate-500">The request you are looking for does not exist or has been removed.</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="size-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  const req = requestResponse.data;
  const isCategoryPaid =
    req.category?.isPaid ??
    (req.category?.type === "PAID" || (req.totalAmount && req.totalAmount > 0));

  const activeMainImage = selectedImage || (req.images && req.images.length > 0 ? req.images[0] : null);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="size-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-2">
          {getStatusBadge(req.status)}
          <Badge variant={isCategoryPaid ? "default" : "secondary"}>
            {isCategoryPaid ? `Paid Service (৳${req.totalAmount || 0})` : "Free Service"}
          </Badge>
        </div>
      </div>

      {/* Main Container Header */}
      <Card>
        <CardHeader className="bg-slate-50/60 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">
                <Tag className="size-3.5" />
                {req.category?.name || "General Service"}
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">
                {req.title}
              </CardTitle>
            </div>
            <div className="text-xs text-slate-500 flex flex-col sm:items-end">
              <span>Created: {new Date(req.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
              <span className="font-mono text-[11px] text-slate-400 mt-0.5">ID: {req.id}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-8">
          {/* Images Section (if present) */}
          {req.images && req.images.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Attached Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Main Large Image */}
                <div className="md:col-span-3 relative h-72 sm:h-96 rounded-xl overflow-hidden border bg-slate-100">
                  {activeMainImage && (
                    <Image
                      src={activeMainImage}
                      alt={req.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-96 pr-1">
                  {req.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative size-20 md:w-full md:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeMainImage === imgUrl ? "border-indigo-600 ring-2 ring-indigo-200" : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Attachment ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Description</h3>
            <div className="bg-slate-50 p-4 rounded-xl border text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {req.description}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Requester Info */}
            <div className="p-4 border rounded-xl space-y-2 bg-white shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="size-3.5 text-indigo-500" /> Citizen Details
              </span>
              <div className="text-slate-800 font-semibold text-base">
                {req.citizen?.name || "N/A"}
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p className="flex items-center gap-2">
                  <Mail className="size-3.5 text-slate-400" />
                  {req.citizen?.email || "N/A"}
                </p>
                {req.citizen?.phoneNumber && (
                  <p className="flex items-center gap-2">
                    <Phone className="size-3.5 text-slate-400" />
                    {req.citizen.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Location & Priority */}
            <div className="p-4 border rounded-xl space-y-2 bg-white shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="size-3.5 text-rose-500" /> Address & Location
              </span>
              <div className="text-slate-800 text-sm font-medium">
                {req.address || "N/A"}
              </div>
              <div className="text-xs text-slate-500 pt-1 border-t flex justify-between items-center">
                <span>Priority Level: <strong className="text-slate-700">{req.priority}</strong></span>
                <span>Quantity: <strong className="text-slate-700">{req.quantity || 1}</strong></span>
              </div>
            </div>

            {/* Schedule Dates */}
            <div className="p-4 border rounded-xl space-y-2 bg-white shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="size-3.5 text-emerald-500" /> Service Timeline
              </span>
              <div className="text-xs text-slate-600 space-y-1.5">
                <div className="flex justify-between">
                  <span>Preferred Start:</span>
                  <span className="font-semibold text-slate-800">
                    {req.preferredStartDate ? new Date(req.preferredStartDate).toLocaleDateString() : "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Preferred End:</span>
                  <span className="font-semibold text-slate-800">
                    {req.preferredEndDate ? new Date(req.preferredEndDate).toLocaleDateString() : "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 border rounded-xl space-y-2 bg-white shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="size-3.5 text-amber-500" /> Payment & Charges
              </span>
              {isCategoryPaid ? (
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span>Total Service Fee:</span>
                    <span className="text-base font-bold text-slate-800">৳{req.totalAmount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t">
                    <span>Payment Status:</span>
                    <Badge variant={req.isPaid ? "default" : "outline"} className={req.isPaid ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200"}>
                      {req.isPaid ? <CheckCircle2 className="size-3 mr-1 inline" /> : <Clock className="size-3 mr-1 inline" />}
                      {req.isPaid ? "PAID" : "UNPAID"}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 py-2 flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  This is a free public service. No payment required.
                </div>
              )}
            </div>
          </div>

          {/* Assigned Staff Info (if exists) */}
          {req.assignedStaff && (
            <div className="p-4 border border-indigo-100 bg-indigo-50/40 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  {(req.assignedStaff.name || req.assignedStaff.user?.name || "S").charAt(0)}
                </div>
                <div>
                  <span className="text-xs text-indigo-600 font-semibold uppercase block">Assigned Officer</span>
                  <span className="text-sm font-bold text-slate-800">
                    {req.assignedStaff.name || req.assignedStaff.user?.name}
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="border-indigo-300 text-indigo-700 bg-white">
                Active Assignment
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}