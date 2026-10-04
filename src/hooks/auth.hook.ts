import { useMutation } from "@tanstack/react-query";
import { loginUser, userRegistraition, verifyAccount } from "@/api/auth.api";

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
