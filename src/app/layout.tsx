"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Initialize QueryClient only once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
      <SessionProvider>
        <main>{children}</main>
      </SessionProvider>
      </body>
    </html>
  );
}
