

import { z } from "zod";

// Zod schema for updating user role/status
export const updateUserSchema = z.object({
  role: z.enum(["CITIZEN", "STAFF", "ADMIN", "SUPER_ADMIN"], {
    error: "Role is required",
  }).optional(),
  status: z.enum(["ACTIVE", "BLOCKED"], {
    error: "Status is required",
  }).optional(),
});

export type IUpdateUserPayload = z.infer<typeof updateUserSchema>;