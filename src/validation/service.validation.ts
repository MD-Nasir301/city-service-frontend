import z from "zod";

// ১. Create Service Request Schema
export const createServiceRequestSchema = z
  .object({
    categoryId: z.string().min(1, "Category ID is required"),
    title: z
      .string()
      .min(5, "Title must be at least 5 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    address: z.string().min(1, "Address is required"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    quantity: z.number().min(1, "Quantity must be at least 1").optional(),
    
    // HTML datetime-local string (2026-10-09T14:22) এবং খালি স্ট্রিং পাস করানোর জন্য
    preferredStartDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    preferredEndDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
      
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
    images: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.preferredStartDate && data.preferredEndDate) {
        return (
          new Date(data.preferredEndDate) >= new Date(data.preferredStartDate)
        );
      }
      return true;
    },
    {
      message:
        "preferredEndDate must be equal to or after preferredStartDate.",
      path: ["preferredEndDate"],
    }
  );

export type CreateServiceRequestInput = z.infer<
  typeof createServiceRequestSchema
>;

// ২. Update Service Request Schema
export const updateServiceRequestSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  quantity: z.number().min(1).optional(),
  preferredStartDate: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  preferredEndDate: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});