import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  XCircle,
  UserCheck,
  ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  IServiceRequestUI,
  Priority,
  RequestStatus,
} from "@/types/services-request.type";

interface ComplaintCardProps {
  complaint: IServiceRequestUI;
  onClick?: () => void;
}

export function ComplaintCard({ complaint, onClick }: ComplaintCardProps) {
  // ১. Status Badge Helper
  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "RESOLVED":
      case "ACCEPTED":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 gap-1 border-emerald-200 shadow-none">
            <CheckCircle2 className="size-3 text-emerald-600" />
            {status === "RESOLVED" ? "Resolved" : "Accepted"}
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 gap-1 border-blue-200 shadow-none">
            <Loader2 className="size-3 text-blue-600 animate-spin" /> In
            Progress
          </Badge>
        );
      case "ASSIGNED":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 gap-1 border-purple-200 shadow-none">
            <UserCheck className="size-3 text-purple-600" /> Assigned
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 gap-1 border-amber-200 shadow-none">
            <Clock className="size-3 text-amber-600" /> Pending
          </Badge>
        );
      case "CANCELLED":
      case "REJECTED":
        return (
          <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 gap-1 border-rose-200 shadow-none">
            <XCircle className="size-3 text-rose-600" /> {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1 shadow-none">
            <AlertCircle className="size-3" /> {status}
          </Badge>
        );
    }
  };

  // ২. Priority Color Helper
  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case "URGENT":
      case "HIGH":
        return (
          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 uppercase">
            {priority}
          </span>
        );
      case "MEDIUM":
        return (
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 uppercase">
            {priority}
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200 uppercase">
            {priority}
          </span>
        );
    }
  };

  const hasImages = complaint.images && complaint.images.length > 0;

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-green-300 cursor-pointer overflow-hidden"
    >
      <div className="space-y-3">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            {complaint.category?.name && (
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                {complaint.category.name}
              </span>
            )}
          </div>
          {complaint.priority && getPriorityBadge(complaint.priority)}
          {complaint.category?.type && <Badge>{complaint.category.type}</Badge>}
          {getStatusBadge(complaint.status)}
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-foreground line-clamp-1 group-hover:text-green-600 transition-colors">
          {complaint.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {complaint.description}
        </p>

        {/*  Image Section */}
        <div className="relative w-full h-32 rounded-xl overflow-hidden border bg-muted/30">
          <Image
            src={hasImages ? complaint.images[0] : "/logo.jpg"}
            alt={complaint.title}
            fill
            className={
              hasImages
                ? "object-cover group-hover:scale-105 transition-transform duration-300"
                : "object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            }
          />
          {hasImages && complaint.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
              <ImageIcon className="size-3" />
              <span>+{complaint.images.length - 1} more</span>
            </div>
          )}
        </div>

        {/* Citizen & Payment Info */}
        <div className="flex items-center justify-between text-xs pt-1 text-gray-500">
          {complaint.citizen?.name && (
            <div className="flex items-center gap-1.5">
              <User className="size-3.5 text-gray-400" />
              <span className="font-medium text-gray-700 truncate max-w-[120px]">
                {complaint.citizen.name}
              </span>
            </div>
          )}

          {complaint.category?.type === "PAID" && (
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                complaint.isPaid
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {complaint.isPaid ? "Paid" : "Unpaid"} (৳{complaint.totalAmount})
            </span>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t flex items-center justify-between text-[11px] text-muted-foreground">
        {complaint.address && (
          <div className="flex items-center gap-1 truncate max-w-[180px]">
            <MapPin className="size-3.5 text-red-500 shrink-0" />
            <span className="truncate" title={complaint.address}>
              {complaint.address}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <Calendar className="size-3.5" />
          <span>
            {new Date(complaint.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
