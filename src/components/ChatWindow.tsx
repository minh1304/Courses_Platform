"use client";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useEffect, useState } from "react";

interface OnlineUser {
  userId: string;
  name: string;
}

interface Message {
  from: string;
  to: string;
  content: string;
}

export default function ChatWindow() {

  const userId = '74cdede8-6a5d-4f05-b29f-529457d4c370';
  const userName = 'Minh Vo'
  const chatSocket = useChatSocket(userId, userName);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<OnlineUser | null>(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    console.log(chatSocket)
    chatSocket.onReceiveMessage((msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [userId]);

  const { onlineUsers, sendMessage } = chatSocket;

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
      {/* Sidebar */}
      <div className="bg-blue-900 text-white w-64 p-4">
        <h2 className="text-lg font-semibold mb-4">PEOPLE</h2>
        <ul className="space-y-4">
          {onlineUsers
            .filter((user) => user.userId !== userId)
            .map((user) => (
              <li
                key={user.userId}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-3 cursor-pointer ${
                  selectedUser?.userId === user.userId ? "bg-blue-700 p-2 rounded" : ""
                }`}
              >
                <div className="relative">
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                </div>
                <span>{user.name}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col border-l border-gray-200">
        {selectedUser ? (
          <>
            <div className="p-4 border-b font-semibold bg-gray-50">
              Chat with {selectedUser.name}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
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
                        ? "ml-auto bg-blue-500 text-white"
                        : "mr-auto bg-gray-200 text-black"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
            </div>
            <div className="p-4 border-t bg-gray-50 flex gap-2">
              <input
                type="text"
                className="flex-1 border px-3 py-2 rounded-md"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
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
