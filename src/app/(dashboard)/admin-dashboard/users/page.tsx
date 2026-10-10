"use client";

import { useState } from "react";
import {
  useGetAllUsers,
  useUpdateUserRole,
  useUpdateUserStatus,
  useDeleteUser,
} from "@/hooks/user.hook";
import { UserRole, UserStatus } from "@/types/user.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/ui/table-skeleton";

// Role Badge Color Helper
const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return (
        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200">
          Admin
        </Badge>
      );
    case "STAFF":
      return (
        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
          Staff
        </Badge>
      );
    case "CITIZEN":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
          Citizen
        </Badge>
      );
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

// Status Badge Color Helper
const getStatusBadge = (status: UserStatus) => {
  switch (status) {
    case "ACTIVE":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-600 border-emerald-200"
        >
          Active
        </Badge>
      );
    case "BLOCKED":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-600 border-amber-200"
        >
          Blocked
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<string>("ALL");

  // Pagination States
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // Fetch Users with Pagination & Filters
  const { data: usersResponse, isLoading } = useGetAllUsers({
    page,
    limit,
    search: searchTerm || undefined,
    role: selectedRoleFilter === "ALL" ? undefined : selectedRoleFilter,
    status: selectedStatusFilter === "ALL" ? undefined : selectedStatusFilter,
  });

  // Mutations
  const { mutate: updateRole, isPending: isUpdatingRole } = useUpdateUserRole();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateUserStatus();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  if (isLoading) {
    return <TableSkeleton />;
  }

  const users = usersResponse?.data || [];
  
  // Safely extract meta and compute totalPages if missing from backend meta
  const rawMeta = usersResponse?.meta;
  const total = rawMeta?.total || 0;
  const currentLimit = rawMeta?.limit || limit;
  const currentPage = rawMeta?.page || page;
  const totalPages = (rawMeta as any)?.totalPages || Math.ceil(total / currentLimit) || 1;

  // Change Role Handler
  const handleRoleChange = (userId: string, newRole: UserRole) => {
    updateRole(
      { userId, role: newRole },
      {
        onSuccess: () => {
          toast.success("User role updated successfully!");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to update user role.");
        },
      },
    );
  };

  // Change Status Handler
  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    updateStatus(
      { userId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`User status changed to ${newStatus}`);
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to update user status.");
        },
      },
    );
  };

  // Soft Delete Handler
  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`Are you sure you want to delete ${userName}?`)) {
      deleteUser(userId, {
        onSuccess: () => {
          toast.success("User deleted successfully!");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to delete user.");
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          User Management
        </h1>
        <p className="text-sm text-slate-500">
          View registered users, search, assign roles, and toggle active/blocked
          account statuses.
        </p>
      </div>

      {/* Filters: Search, Role & Status Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* Filters Dropdown */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-600 font-medium">Role:</span>
            <Select
              value={selectedRoleFilter}
              onValueChange={(val) => {
                setSelectedRoleFilter(val ?? "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[130px] h-9 text-xs">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="CITIZEN">Citizen</SelectItem>
                <SelectItem value="STAFF">Staff</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-600 font-medium">Status:</span>
            <Select
              value={selectedStatusFilter}
              onValueChange={(val) => {
                setSelectedStatusFilter(val ?? "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[130px] h-9 text-xs">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="BLOCKED">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* User Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Details</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-center">Role Action</TableHead>
                <TableHead className="text-center">Status Action</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-slate-500"
                  >
                    No users found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: any) => (
                  <TableRow key={user.id}>
                    {/* User Info */}
                    <TableCell>
                      <div className="font-semibold text-slate-800">
                        {user.name}
                      </div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </TableCell>

                    {/* Phone */}
                    <TableCell className="text-xs text-slate-600">
                      {user.phoneNumber || "N/A"}
                    </TableCell>

                    {/* Role Badge */}
                    <TableCell>{getRoleBadge(user.role)}</TableCell>

                    {/* Status Badge */}
                    <TableCell>{getStatusBadge(user.status)}</TableCell>

                    {/* Joined Date */}
                    <TableCell className="text-xs text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    {/* Change Role */}
                    <TableCell className="text-center">
                      <Select
                        value={user.role}
                        onValueChange={(newRole) => {
                          if (newRole) {
                            handleRoleChange(user.id, newRole as UserRole);
                          }
                        }}
                        disabled={isUpdatingRole}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs mx-auto">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CITIZEN">CITIZEN</SelectItem>
                          <SelectItem value="STAFF">STAFF</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Change Status */}
                    <TableCell className="text-center">
                      <Select
                        value={user.status}
                        onValueChange={(newStatus) => {
                          if (newStatus) {
                            handleStatusChange(
                              user.id,
                              newStatus as UserStatus,
                            );
                          }
                        }}
                        disabled={isUpdatingStatus}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs mx-auto">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                          <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Action: Delete Button */}
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8 px-2"
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="size-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {total > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>Rows per page:</span>
                <Select
                  value={limit.toString()}
                  onValueChange={(val) => {
                    setLimit(Number(val));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-[70px] h-8 text-xs bg-white">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="ml-2 font-medium">
                  Showing {(currentPage - 1) * currentLimit + 1} to{" "}
                  {Math.min(currentPage * currentLimit, total)} of {total}{" "}
                  users
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs bg-white"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="size-3.5 mr-1" /> Previous
                </Button>
                <span className="text-xs text-slate-600 font-medium px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs bg-white"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage >= totalPages}
                >
                  Next <ChevronRight className="size-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}