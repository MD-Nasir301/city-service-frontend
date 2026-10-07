import apiClient from "@/lib/apiClient";
import {
  LoginPayload,
  RegisterPayload,
  VerifyAccountPayload,
} from "@/types/auth.type";

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

export const loginUser = async (payload: LoginPayload) => {
  return await apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const userLogout = async () => {
  return await apiClient("/auth/logout", {
    method: "POST",
  });
};

export const getMe = async () => {
  return await apiClient("/users/me");
};

export const googleOAuth = async (payload: { idToken: string }) => {
  return await apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};

