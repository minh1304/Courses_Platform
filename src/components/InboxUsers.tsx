// components/InboxUsers.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function InboxUsers({ onSelectUser }: InboxUsersProp) {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";
  const [inboxUsers, setInboxUsers] = useState<OnlineUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<OnlineUser | null>(null);

  const config = {
    headers: { Authorization: `Bearer ${session?.user.accessToken}` },
  };

  useEffect(() => {
    const fetchInboxUsers = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/message/get-inbox-users`,
          { userId },
          config
        );
        setInboxUsers(res.data.data);
      } catch (err) {
        console.error("Failed to fetch inbox users", err);
      }
    };

    if (userId) fetchInboxUsers();
  }, [userId]);

  return (
    <ul className="flex-1 overflow-y-auto p-4 space-y-4">
      {inboxUsers
        .filter((user) => user.userId !== userId)
        .map((user) => (
          <li
            key={user.userId}
            onClick={() => {
                onSelectUser(user),
                setSelectedUser(user)
            }}
            // className="flex items-center gap-3 text-white cursor-pointer hover:bg-indigo-500 p-2 rounded"
            className={`flex items-center gap-3 cursor-pointer ${
                selectedUser?.userId === user.userId
                ? "bg-indigo-500 p-2 rounded"
                : ""
            }`}
          >
            <div className="relative">
              <img src="https://github.com/shadcn.png" className="w-10 h-10 rounded-full" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
            </div>
            <span>{user.userName}</span>
          </li>
        ))}
    </ul>
  );
}
