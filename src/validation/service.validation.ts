
import { z } from "zod";

export const createServiceRequestSchema = z
  .object({
    categoryId: z.string().min(1, "Please select a service category"),
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title cannot exceed 100 characters"),
    description: z
      .string()
      .min(15, "Please provide a detailed description (at least 15 characters)"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    images: z.array(z.string().url("Invalid image URL")).default([]),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"], {
      required_error: "Please select a priority level",
    }),
    quantity: z.number().min(1, "Quantity must be at least 1").default(1),
    preferredStartDate: z.string().optional().nullable(),
    preferredEndDate: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.preferredStartDate && data.preferredEndDate) {
        return new Date(data.preferredEndDate) >= new Date(data.preferredStartDate);
      }
      return true;
    },
    {
      message: "End date cannot be earlier than start date",
      path: ["preferredEndDate"],
    }
  );

export type CreateServiceRequestInput = z.infer<typeof createServiceRequestSchema>;