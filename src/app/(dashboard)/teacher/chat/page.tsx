"use client";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";
  const userName = session?.user.name || "";


  const {
    onlineUsers,
    sendMessage,
    onReceiveMessage,
  } = useChatSocket(userId, userName);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<OnlineUser | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Listen for incoming messages
  useEffect(() => {
    onReceiveMessage((msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [onReceiveMessage]);

  const handleSend = () => {
    if (!selectedUser || !newMessage.trim()) return;
    const message: Message = {
      from: userId,
      to: selectedUser.userId,
      content: newMessage.trim(),
    };
    sendMessage(selectedUser.userId, newMessage.trim());
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="flex h-[90vh]">
      {/* Left Sidebar: Online Users */}
      <div className=" text-white w-64 p-4">
        <h2 className="text-lg font-semibold mb-4">Chats</h2> 
        <ul className="space-y-4">
          {onlineUsers
            .filter((user) => user.userId !== userId)
            .map((user) => (
              <li
                key={user.userId}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-3 cursor-pointer ${
                  selectedUser?.userId === user.userId ? "bg-indigo-500 p-2 rounded" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src="https://github.com/shadcn.png"
                    alt={user.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                </div>
                <span>{user.userName}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col border-l">
        {selectedUser ? (
          <>
            <div className="p-4 border-b font-semibold text-white">
              Chat with {selectedUser.userName}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages
                .filter(
                  (msg) =>
                    (msg.from === userId && msg.to === selectedUser.userId) ||
                    (msg.from === selectedUser.userId && msg.to === userId)
                )
                .map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-md max-w-xs ${
                      msg.from === userId
                        ? "ml-auto bg-indigo-500 text-white"
                        : "mr-auto bg-gray-600 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                className="flex-1 border px-3 py-2 rounded-md text-white"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
