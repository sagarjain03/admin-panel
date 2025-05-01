import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "A clean admin dashboard for managing student records",
  generator: "MAIT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </head>
        <body className={inter.className}>
          <SignedIn>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <UserButton />
            </header>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
