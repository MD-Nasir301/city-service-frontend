import VerifyAccountForm from "@/components/form/verify-account-form";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center  gap-2 md:justify-start">
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
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Suspense fallback={<p>Loading...</p>}>
              <VerifyAccountForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}