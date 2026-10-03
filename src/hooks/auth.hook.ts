import { useMutation } from "@tanstack/react-query";
import { userRegistraition, verifyAccount } from "@/api/auth.api";

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