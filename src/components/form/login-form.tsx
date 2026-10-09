"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, ShieldCheck, User, Wrench } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/validation/auth.validation";
import z from "zod";
import { useLoginUser } from "@/hooks/auth.hook";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuthHandler } from "@/hooks/useGoogleAuthHandler";
import { Role } from "@/types/auth.type";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  type LoginDefaultValues = z.infer<typeof loginSchema>;

  const defaultValues: LoginDefaultValues = {
    email: "",
    password: "",
  };

  const { mutate: login, isPending: loginPending } = useLoginUser();
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuthHandler();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      login(value, {
        onSuccess: (res) => {
          if (!res?.success) {
            toast.error("Login Failed", {
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
          toast.error("Authorization Failure", {
            description:
              err?.data?.message || "Something went wrong. Please try again.",
          });
        },
      });
    },
  });

  // One-Click Demo Login Handler
  const handleDemoLogin = (role: Role) => {
    const demoCredentials = {
      CITIZEN: { email: "nasir21b@gmail.com", password: "Ab@12345" },
      STAFF: { email: "nasir201b+staff2@gmail.com", password: "Ab@12345" },
      ADMIN: { email: "testeradmin@gmail.com", password: "tester@Admin12345" },
      SUPER_ADMIN: { email: "superadmin1@gmail.com", password: "super@Admin12345" },
    };

    const credentials = demoCredentials[role];
    
    form.setFieldValue("email", credentials.email);
    form.setFieldValue("password", credentials.password);

    login(credentials, {
      onSuccess: (res) => {
        if (!res?.success) {
          toast.error("Demo Login Failed", {
            description: res?.message || "Could not log in with demo account.",
          });
          return;
        }

        toast.success(`Logged in as ${role}!`, {
          description: "Demo login successful.",
        });

        router.push("/");
      },
      onError: (err: any) => {
        toast.error("Demo Authorization Failure", {
          description: err?.data?.message || "Something went wrong.",
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password below to access City Services
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Email Field */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="your email address"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password Field */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="pr-10"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit Button */}
          <Button disabled={loginPending} type="submit" className="w-full">
            {loginPending ? (
              <>
                <Spinner /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or</FieldSeparator>

      {/* Demo Login Options */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-center font-medium text-muted-foreground">
          Quick Demo Login (Evaluator Access)
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loginPending}
            onClick={() => handleDemoLogin("CITIZEN")}
            className="flex flex-col items-center gap-1 py-3 h-auto"
          >
            <User className="size-4 text-blue-500" />
            <span className="text-[11px]">Citizen</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loginPending}
            onClick={() => handleDemoLogin("STAFF")}
            className="flex flex-col items-center gap-1 py-3 h-auto"
          >
            <Wrench className="size-4 text-amber-500" />
            <span className="text-[11px]">Staff</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loginPending}
            onClick={() => handleDemoLogin("ADMIN")}
            className="flex flex-col items-center gap-1 py-3 h-auto"
          >
            <ShieldCheck className="size-4 text-emerald-500" />
            <span className="text-[11px]">Admin</span>
          </Button>
        </div>
      </div>

      <div className="px-6">
        <GoogleLogin
          shape="pill"
          text="continue_with"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          className="font-medium underline underline-offset-4 hover:text-primary"
          href="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
