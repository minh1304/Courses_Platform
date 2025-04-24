import {
    Sidebar,
    SidebarContent,
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
    DollarSign,
    LogOut,
    Settings,
    User,
  } from "lucide-react";

  export function AppSidebar({ usertype }: AppSidebarProps) {
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
  
    const links = navLinks[usertype as "user" | "teacher"] || [];
  
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
      </Sidebar>
    );
  }
  