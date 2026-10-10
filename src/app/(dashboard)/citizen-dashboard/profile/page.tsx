"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useUpdateMyProfile } from "@/hooks/user.hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { updateProfileSchema } from "@/validation/user.validation";
import { toast } from "sonner";

export default function ProfileUpdatePage() {
  const { mutate: updateProfile, isPending } = useUpdateMyProfile();

  // Local state for image preview & file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const form = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
    onSubmit: async ({ value }) => {
      const result = updateProfileSchema.safeParse(value);
      if (!result.success) {
        toast.error("Validation Error", {
          description: "Please check your input fields.",
        });
        return;
      }

      const formData = new FormData();
      if (result.data.name && result.data.name.trim() !== "") {
        formData.append("name", result.data.name);
      }
      if (result.data.phoneNumber && result.data.phoneNumber.trim() !== "") {
        formData.append("phoneNumber", result.data.phoneNumber);
      }
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      updateProfile(formData, {
        onSuccess: (res: any) => {
          if (!res?.success) {
            toast.error("Failed to update profile", {
              description: res?.message || "Something went wrong.",
            });
            return;
          }
          toast.success("Profile updated successfully!");
        },
        onError: (err: any) => {
          toast.error("Error", {
            description: err?.message || "Failed to update profile.",
          });
        },
      });
    },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          My Profile & Settings
        </h1>
        <p className="text-sm text-slate-500">
          Update your personal details and profile picture.
        </p>
      </div>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b bg-slate-50/50 pb-4">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Avatar & Upload Section */}
            <div className="flex items-center gap-6">
              <div className="relative size-24 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="size-10 text-slate-400" />
                )}
              </div>

              <div>
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <Camera className="size-4 text-slate-500" />
                  Change Avatar
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-[11px] text-slate-400 mt-1.5">
                  JPG, PNG or WEBP (Max 2MB)
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name Field */}
              <form.Field
                name="name"
                children={(field) => (
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <User className="size-3.5 text-slate-400" /> Full Name
                    </label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-10 text-sm"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-xs text-rose-500">
                        {field.state.meta.errors
                          .map((err: any) => err?.message || err)
                          .join(", ")}
                      </p>
                    ) : null}
                  </div>
                )}
              />

              {/* Phone Number Field */}
              <form.Field
                name="phoneNumber"
                children={(field) => (
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <Phone className="size-3.5 text-slate-400" /> Phone Number
                      (Optional)
                    </label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your phone number"
                      className="h-10 text-sm"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-xs text-rose-500">
                        {field.state.meta.errors
                          .map((err: any) => err?.message || err)
                          .join(", ")}
                      </p>
                    ) : null}
                  </div>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button type="submit" disabled={isPending} className="px-6">
                {isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
