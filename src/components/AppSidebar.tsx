import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
  import {
    BookOpen,
    Briefcase,
    ChevronUp,
    DollarSign,
    LogOut,
    Settings,
    User,
    User2,
  } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
  export function AppSidebar({...userprop} : AppSidebarProps) {
    const navLinks = {
      user: [
        { icon: BookOpen, label: "Courses", href: "/user/courses" },
        { icon: Briefcase, label: "Billing", href: "/user/billing" },
        { icon: User, label: "Profile", href: "/user/profile" },
        { icon: Settings, label: "Settings", href: "/user/settings" },
      ],
      teacher: [
        { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
        { icon: DollarSign, label: "Billing", href: "/teacher/billing" },
        { icon: User, label: "Profile", href: "/teacher/profile" },
        { icon: Settings, label: "Settings", href: "/teacher/settings" },
      ],
    };
  

    const usertype = userprop.usertype;
    const links = navLinks[usertype as "user" | "teacher"] || [];
    const { data: session } = useSession();

    return (
      <Sidebar collapsible="icon" className="border-r h-screen">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="h-12">
              <div className="flex items-center gap-4 p-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="font-medium text-sm">
                    {session?.user?.name ?? "Account"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {session?.user?.email ?? "@gmail.com"}
                  </span>
                </div>
                <ChevronUp className="ml-auto w-4 h-4 text-muted-foreground" />
              </div>
            </SidebarMenuButton>

            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={() => signOut({callbackUrl: 'http://localhost:3000/signin'})}>Sign out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    );
  }
  