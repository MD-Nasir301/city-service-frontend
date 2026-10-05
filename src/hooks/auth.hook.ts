import { useMutation } from "@tanstack/react-query";
import {
  googleOAuth,
  loginUser,
  refreshAccessToken,
  userLogout,
  userRegistraition,
  verifyAccount,
} from "@/api/auth.api";

export const useRegistration = () => {
  return useMutation({
    mutationFn: userRegistraition,
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyAccount,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};

