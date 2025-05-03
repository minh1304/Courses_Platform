import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronUp } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { SidebarMenuButton } from './ui/sidebar';
import { signOut } from 'next-auth/react';

export const DropdownAvatar = ({ name, email, image } : DropdownAvatar ) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-12">
          <div className="flex items-center gap-4 p-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="font-medium text-muted-foreground">{name ?? "Account"}</span>
              <span className="text-xs text-muted-foreground">
                {email ?? "@gmail.com"}
              </span>
            </div>
            {/* <ChevronUp className="ml-auto w-4 h-4 text-muted-foreground" /> */}
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width] dark"
      >
        <DropdownMenuItem>
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={() =>
              signOut({ callbackUrl: "http://localhost:3000/signin" })
            }
          >
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
