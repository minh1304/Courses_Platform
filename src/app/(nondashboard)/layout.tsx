"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Initialize QueryClient only once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <main>
          <div className="h-full">
            {/* Navbar */}
            <div className="w-full h-20 flex-col fixed inset-y-0 z-50">
              <Navbar />
            </div>

            {/* React Query Provider */}
            <QueryClientProvider client={queryClient}>
              <main className="mt-20">{children}</main>
            </QueryClientProvider>

            {/* Footer */}
            <Footer/>
          </div>
        </main>
      </body>
    </html>
  );
}
