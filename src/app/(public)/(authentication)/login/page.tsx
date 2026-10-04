import { LoginForm } from "@/components/form/login-form";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-svh flex flex-col justify-center items-center p-6 md:p-10">
      <div className="flex justify-center mb-15">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Image
            src="/logo.jpg"
            alt="City Service Portal Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="text-2xl text-green-600">City Service Portal</span>
        </Link>
      </div>
      <div className="w-full max-w-sm space-y-6  border-2 p-4 rounded-2xl  shadow-2xl">
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
