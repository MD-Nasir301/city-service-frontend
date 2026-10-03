import type { Metadata } from "next";
import Providers from "@/providers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "City Service Portal",
  description: "City Service Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          richColors
          style={{
            top: "65px",
            right: "20px",
          }}
        />
      </body>
    </html>
  );
}
