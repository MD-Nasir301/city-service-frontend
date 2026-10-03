import apiClient from "@/lib/apiClient";
import { RegisterPayload, VerifyAccountPayload } from "@/types/auth.type";

export const userRegistraition = async (payload: RegisterPayload) => {
  return await apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const verifyAccount = async (payload: VerifyAccountPayload) => {
  return await apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};
