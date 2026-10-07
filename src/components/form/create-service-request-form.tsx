"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import z from "zod";
import {
  FileText,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Send,
  UploadCloud,
  X,
  Layers,
  Calculator,
  Compass,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

import { createServiceRequestSchema } from "@/validation";
import { useCreateServiceRequest } from "@/hooks/service-request.hook";
import { Category, CreateServiceRequestFormProps } from "@/types/category.type";
import { useGetCategories } from "@/hooks/category.hook";

export function CreateServiceRequestForm({
  isLoadingCategories = false,
  initialData,
  isUpdateMode = false,
}: CreateServiceRequestFormProps) {
  const router = useRouter();

  // 1. Fetch categories
  const { data: categoriesResponse } = useGetCategories();

  // Safe category list extraction
  const categoryList = useMemo(() => {
    if (Array.isArray(categoriesResponse)) return categoriesResponse;
    if (Array.isArray(categoriesResponse?.data)) return categoriesResponse.data;
    return [];
  }, [categoriesResponse]);

  // Filter State (ALL | FREE | PAID)
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<
    "ALL" | "FREE" | "PAID"
  >("ALL");

  // File Upload State (Max 4 Images)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialData?.images || [],
  );

  // Filter Categories based on Selected Radio Option
  const filteredCategories = useMemo(() => {
    if (categoryTypeFilter === "ALL") return categoryList;
    return categoryList.filter((cat: any) => cat.type === categoryTypeFilter);
  }, [categoryList, categoryTypeFilter]);

  type ServiceRequestDefaultValues = z.infer<typeof createServiceRequestSchema>;

  const defaultValues: ServiceRequestDefaultValues = {
    categoryId: initialData?.categoryId || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    address: initialData?.address || "",
    latitude: initialData?.latitude || null,
    longitude: initialData?.longitude || null,
    images: initialData?.images || [],
    priority: initialData?.priority || "MEDIUM",
    quantity: initialData?.quantity || 1,
    preferredStartDate: initialData?.preferredStartDate || "",
    preferredEndDate: initialData?.preferredEndDate || "",
  };

  const { mutate: createRequest, isPending } = useCreateServiceRequest();

  // Handle Image Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove Selected Image
  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Form setup
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createServiceRequestSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      Object.entries(value).forEach(([key, val]) => {
        if (key !== "images" && val !== null && val !== undefined) {
          formData.append(key, String(val));
        }
      });

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      createRequest(formData as any, {
        onSuccess: (res: any) => {
          if (res?.success === false) {
            toast.error(isUpdateMode ? "Update Failed" : "Submission Failed", {
              description: res?.message || "Something went wrong",
            });
            return;
          }
          toast.success(
            isUpdateMode
              ? "Service Request Updated"
              : "Service Request Created",
            {
              description: isUpdateMode
                ? "Your request has been updated successfully."
                : "Your request has been submitted successfully.",
            },
          );
          router.push("/dashboard/my-requests");
        },
        onError: (err: any) => {
          toast.error("Submission Error", {
            description: err?.message || "Failed to process request",
          });
        },
      });
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-card rounded-xl border border-border shadow-sm">
      <div className="flex flex-col gap-1 mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Layers className="size-6 text-primary" />
          {isUpdateMode ? "Update Service Request" : "Create Service Request"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isUpdateMode
            ? "Modify the required fields below to update your existing request."
            : "Fill out all required details to submit a new service request or complaint."}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <FieldGroup className="space-y-6">
          {/* SECTION 1: CATEGORY & BASIC DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
              <FileText className="size-4" /> 1. Service Category & Basic Info
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4 bg-muted/40 p-3 rounded-lg border">
              <span className="text-xs font-semibold text-muted-foreground">
                Filter Type:
              </span>
              {(["ALL", "FREE", "PAID"] as const).map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                >
                  <input
                    type="radio"
                    name="catType"
                    value={type}
                    checked={categoryTypeFilter === type}
                    onChange={() => setCategoryTypeFilter(type)}
                    className="accent-primary"
                  />
                  {type === "ALL"
                    ? "All Categories"
                    : type === "FREE"
                      ? "Free Services"
                      : "Paid Services"}
                </label>
              ))}
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Dropdown */}
              <form.Field name="categoryId">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="col-span-1 md:col-span-2"
                    >
                      <FieldLabel htmlFor={field.name}>
                        Service Category *
                      </FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(val) => field.handleChange(val)}
                        disabled={isLoadingCategories}
                      >
                        <SelectTrigger className="h-10 text-sm rounded-lg w-full">
                          <SelectValue
                            placeholder={
                              isLoadingCategories
                                ? "Loading categories..."
                                : "Select a service category"
                            }
                          >
                            {
                              categoryList.find(
                                (cat: any) => cat.id === field.state.value,
                              )?.name
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {filteredCategories.map((cat: any) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name} ({cat.type}
                              {cat.type === "PAID" && cat.unitPrice
                                ? ` - ৳${cat.unitPrice}/unit`
                                : ""}
                              )
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Title Field */}
              <form.Field name="title">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="col-span-1 md:col-span-2"
                    >
                      <FieldLabel htmlFor={field.name}>
                        Request Title *
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="e.g. Broken street light near House 45"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-10 text-sm rounded-lg"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Priority Field */}
              <form.Field name="priority">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Priority Level *
                      </FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(val: any) => field.handleChange(val)}
                      >
                        <SelectTrigger className="h-10 text-sm rounded-lg w-full">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">Low (Routine)</SelectItem>
                          <SelectItem value="MEDIUM">
                            Medium (Standard)
                          </SelectItem>
                          <SelectItem value="HIGH">High (Urgent)</SelectItem>
                          <SelectItem value="URGENT">
                            Urgent (Emergency)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* DYNAMIC: Quantity & Total Amount (Only for PAID Category) */}
              <form.Subscribe
                selector={(state) => [
                  state.values.categoryId,
                  state.values.quantity,
                ]}
              >
                {([categoryId, quantity]) => {
                  const selectedCategory = categoryList.find(
                    (c: Category) => c.id === categoryId,
                  );
                  const isPaid = selectedCategory?.type === "PAID";
                  const unitPrice = selectedCategory?.basePrice || 0;
                  const totalAmount = unitPrice * (Number(quantity) || 1);

                  if (!isPaid) return null;

                  return (
                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-primary/5 p-4 rounded-xl border border-primary/20">
                      <form.Field name="quantity">
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                <span className="font-bold">
                                  {selectedCategory?.unitName}:{" "}
                                  {selectedCategory?.basePrice} Tk
                                </span>
                              </FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                type="number"
                                min={1}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(Number(e.target.value))
                                }
                                className="h-10 text-sm rounded-lg bg-background"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      </form.Field>

                      <div className="flex flex-col justify-center gap-1 bg-background p-3 rounded-lg border">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calculator className="size-3.5" /> Total Estimated
                          Amount
                        </span>
                        <span className="text-lg font-bold text-primary">
                          ৳ {totalAmount.toLocaleString()} BDT
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          ({unitPrice} BDT / unit × {quantity || 1})
                        </span>
                      </div>
                    </div>
                  );
                }}
              </form.Subscribe>

              {/* Description */}
              <form.Field name="description">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="col-span-1 md:col-span-2"
                    >
                      <FieldLabel htmlFor={field.name}>
                        Detailed Description *
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder="Provide exact details about the issue..."
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="min-h-[100px] text-sm rounded-lg resize-y"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
          </div>

          <FieldSeparator />

          {/* SECTION 2: LOCATION & SCHEDULE */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
              <MapPin className="size-4" /> 2. Location & Schedule
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address */}
              <form.Field name="address">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className="col-span-1 md:col-span-2"
                    >
                      <FieldLabel htmlFor={field.name}>Address *</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="e.g. House #12, Road #4, Sector #3, Uttara, Dhaka"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-10 text-sm rounded-lg"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Latitude */}
              <form.Field name="latitude">
                {(field) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-1 text-muted-foreground font-normal">
                      <Compass className="size-3.5" /> Latitude (Optional)
                    </FieldLabel>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g. 23.8103"
                      value={field.state.value ?? ""}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                      className="h-10 text-sm rounded-lg"
                    />
                  </Field>
                )}
              </form.Field>

              {/* Longitude */}
              <form.Field name="longitude">
                {(field) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-1 text-muted-foreground font-normal">
                      <Compass className="size-3.5" /> Longitude (Optional)
                    </FieldLabel>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g. 90.4125"
                      value={field.state.value ?? ""}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                      className="h-10 text-sm rounded-lg"
                    />
                  </Field>
                )}
              </form.Field>

              {/* DYNAMIC: Preferred Dates (Only for PAID Category) */}
              <form.Subscribe selector={(state) => [state.values.categoryId]}>
                {([categoryId]) => {
                  const selectedCategory = categoryList.find(
                    (c: Category) => c.id === categoryId,
                  );
                  const isPaid = selectedCategory?.type === "PAID";

                  if (!isPaid) return null;

                  return (
                    <>
                      {/* Start Date */}
                      <form.Field name="preferredStartDate">
                        {(field) => (
                          <Field>
                            <FieldLabel className="flex items-center gap-1.5">
                              <Calendar className="size-3.5 text-muted-foreground" />{" "}
                              Preferred Start Date
                            </FieldLabel>
                            <Input
                              type="datetime-local"
                              value={field.state.value || ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="h-10 text-sm rounded-lg"
                            />
                          </Field>
                        )}
                      </form.Field>

                      {/* End Date */}
                      <form.Field name="preferredEndDate">
                        {(field) => (
                          <Field>
                            <FieldLabel className="flex items-center gap-1.5">
                              <Calendar className="size-3.5 text-muted-foreground" />{" "}
                              Preferred End Date
                            </FieldLabel>
                            <Input
                              type="datetime-local"
                              value={field.state.value || ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="h-10 text-sm rounded-lg"
                            />
                          </Field>
                        )}
                      </form.Field>
                    </>
                  );
                }}
              </form.Subscribe>
            </div>
          </div>

          <FieldSeparator />

          {/* SECTION 3: IMAGE UPLOAD */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
              <ImageIcon className="size-4" /> 3. Attach Photos (Max 4)
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-muted/30 transition-colors">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                disabled={imagePreviews.length >= 4}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer space-y-2"
              >
                <UploadCloud className="size-8 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">
                  Click to upload images from PC/Mobile
                </span>
                <span className="text-[11px] text-muted-foreground">
                  PNG, JPG, JPEG up to 5MB (Maximum 4 images)
                </span>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden border h-24 bg-muted"
                  >
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-destructive/80 text-white p-1 rounded-full hover:bg-destructive transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full h-11 text-base font-medium rounded-lg gap-2"
            >
              {isPending ? (
                <>
                  <Spinner /> {isUpdateMode ? "Updating..." : "Submitting..."}
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  {isUpdateMode ? "Update Request" : "Submit Service Request"}
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
