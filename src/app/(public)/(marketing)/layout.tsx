import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
}
