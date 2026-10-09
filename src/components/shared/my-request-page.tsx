"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FolderOpen, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useDeleteServiceRequest,
  useGetMyRequests,
  useGetSingleServiceRequest,
} from "@/hooks/service-request.hook";
import { ComplaintCard } from "@/components/card/complaint-card";
import { CreateServiceRequestForm } from "@/components/form/create-service-request-form";
import { IServiceRequestUI } from "@/types/services-request.type";

export default function MyRequestsPage() {
  const router = useRouter();

  // ১. State management for Update Modal
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ২. Hooks
  const { data, isLoading, isError } = useGetMyRequests();
  const { mutate: deleteRequest, isPending: isDeleting } =
    useDeleteServiceRequest();

  // Selected single request details for modal
  const { data: singleRequestData, isLoading: isLoadingSingle } =
    useGetSingleServiceRequest(selectedRequestId || "");

  const requests = data?.data || [];

  // Handle Edit Action
  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedRequestId(id);
    setIsEditModalOpen(true);
  };

  // Handle Delete Action
  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); //

    if (confirm("Are you sure you want to cancel this request?")) {
      deleteRequest(id, {
        onSuccess: () => {
          toast.success("Service request cancelled successfully");
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to cancel request",
          );
        },
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-8 md:py-8 max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-1 shadow-md shadow-blue-200 rounded-2xl p-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold border-l-8 border-orange-400 pl-3 text-green-500 my-2">
            My Service Requests
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage and track the status of all your submitted service requests.
          </p>
        </div>

        <Button
          onClick={() => router.push("/create-request")}
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="size-4" /> New Request
        </Button>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="size-8" />
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-destructive flex flex-col items-center gap-2">
          <AlertCircle className="size-8" />
          <p>Failed to load requests. Please try refreshing the page.</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 bg-card border rounded-xl space-y-3">
          <FolderOpen className="size-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">
            No requests found
          </h3>
          <p className="text-sm text-muted-foreground">
            You haven't submitted any service requests yet.
          </p>

          <Button
            onClick={() => router.push("/create-request")}
            size="sm"
            variant="outline"
          >
            Create One Now
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((item: IServiceRequestUI) => (
            <ComplaintCard
              key={item.id}
              complaint={item}
              showActions={true}
              onClick={() => router.push(`/requests/${item.id}`)}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) setSelectedRequestId(null);
        }}
      >
        <DialogContent className="sm:max-w-4xl max-w-[95vw] w-full max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold">
              Update Service Request
            </DialogTitle>
          </DialogHeader>

          {isLoadingSingle ? (
            <div className="flex justify-center items-center py-12">
              <Spinner className="size-8" />
            </div>
          ) : singleRequestData?.data ? (
            <CreateServiceRequestForm
              isUpdateMode={true}
              initialData={singleRequestData.data}
              onSuccess={() => setIsEditModalOpen(false)}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Failed to load request details.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
