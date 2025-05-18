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
    MessageSquareMore
  } from "lucide-react";
import { useSession } from "next-auth/react";
import { DropdownAvatar } from "./DropdownAvatar";
  export function AppSidebar({...userprop} : AppSidebarProps) {
    const navLinks = {
      user: [
        { icon: BookOpen, label: "Courses", href: "/user/courses" },
        { icon: MessageSquareMore, label: "Chat", href: "/user/chat" },
        { icon: Briefcase, label: "Billing", href: "/user/billing" },
        { icon: User, label: "Profile", href: "/user/profile" },
        { icon: Settings, label: "Settings", href: "/user/settings" },
      ],
      teacher: [
        { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
        { icon: MessageSquareMore, label: "Chat", href: "/teacher/chat" },
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
        <SidebarContent className="dark">
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
        <SidebarFooter className="dark">
          <DropdownAvatar {...session?.user}/>
        </SidebarFooter>
      </Sidebar>
    );
  }
  