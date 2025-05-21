// app/chat/page.tsx
"use client";

import OnlineUsers from "@/components/OnlineUsers";
import InboxUsers from "@/components/InboxUsers";
import ChatArea from "@/components/ChatArea";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ChatPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";
  const userName = session?.user?.name ?? "";
  const token = session?.user?.accessToken ?? "";

  const [selectedUser, setSelectedUser] = useState<OnlineUser | null>(null);

  return (
    <div className="flex h-[90vh]">
      <div className="text-white w-64 p-4">
        <OnlineUsers onSelectUser={setSelectedUser}  />
        <span className=" text-white text-lg">All chat</span>
        <InboxUsers onSelectUser={setSelectedUser} />
      </div>
      <div className="flex-1">
        <ChatArea
          userId={userId}
          userName={userName}
          token={token}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
}
