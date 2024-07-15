// layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import logo from "../public/assets/nssaLogo.png";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "NSSA Vacancy",
  description: "HR System for Nssa Vacancies",
  icons: { icon: logo.src },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <div className="fixed w-full top-0 z-10">
            <NavBar />
          </div>
          <div className="-z-10 mt-24">
            <Toaster />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
