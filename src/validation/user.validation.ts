import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .optional()
    .or(z.literal("")),
  phoneNumber: z.string().optional().or(z.literal("")),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
