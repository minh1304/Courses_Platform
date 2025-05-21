"use client";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useSession } from "next-auth/react";

export default function OnlineUsers({ onSelectUser }: OnlineUsersProp) {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";
  const userName = session?.user.name || "";
  const { onlineUsers } = useChatSocket(userId, userName);

  return (
    <div className="p-4 border-b overflow-x-auto whitespace-nowrap flex gap-4 mb-4">
      {onlineUsers
        .filter((u) => u.userId !== userId)
        .map((user) => (
          <div
            key={user.userId}
            onClick={() => {
                onSelectUser(user);
            }}
            className="flex flex-col items-center text-white"
          >
            <div className="relative">
              <img
                src="https://github.com/shadcn.png"
                className="w-12 h-12 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
            </div>
            <span className="text-sm mt-1">{user.userName}</span>
          </div>
        ))}
    </div>
  );
}
