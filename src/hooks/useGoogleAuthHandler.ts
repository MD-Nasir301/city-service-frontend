import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CredentialResponse } from "@react-oauth/google";
import { useGoogleOAuth } from "@/hooks/auth.hook";

export function useGoogleAuthHandler() {
  const router = useRouter();
  const { mutate: googleLogin, isPending: isGoogleLoginPending } = useGoogleOAuth();

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google OAuth Failed", {
        description: "Something went wrong. Please try again",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: (res) => {
          if (!res?.success) {
            toast.error("Google OAuth Failed", {
              description:
                res?.message || "Invalid credentials. Please try again.",
            });
            return;
          }

          toast.success("Welcome back!", {
            description: "Login completed successfully.",
          });

          router.push("/");
        },
        onError: (err: any) => {
          toast.error("Google OAuth Failed", {
            description:
              err?.data?.message || "Something went wrong. Please try again.",
          });
        },
      }
    );
  };

  const handleGoogleError = () => {
    toast.error("Google OAuth Failed", {
      description: "Something went wrong. Please try again",
    });
  };

  return {
    handleGoogleSuccess,
    handleGoogleError,
    isGoogleLoginPending,
  };
}