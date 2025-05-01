"use client";

import { AppSidebar } from "@/components/AppSidebar";
import Loading from "@/components/Loading";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from "next-auth/react";
import { DropdownAvatar } from "@/components/DropdownAvatar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;
  if (status === "unauthenticated" || !session?.user)
    return <div className="text-center mt-10">Please sign in to access this page.</div>;
  return (
    <div>
      <SidebarProvider className="dark">
        <AppSidebar {...session.user} />

        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1 text-white" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={`/${session.user?.usertype}/courses`}>
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
              <DropdownAvatar {...session?.user} />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 px-8 py-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
