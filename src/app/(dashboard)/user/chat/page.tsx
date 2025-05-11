"use client";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const { data: session, status } = useSession();
  const userId = session?.user.id || "";

  const { onlineUsers, sendMessage, onReceiveMessage } = useChatSocket(userId);
  const [messages, setMessages] = useState<{ from: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Listen to incoming messages
  useEffect(() => {
    onReceiveMessage((msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [onReceiveMessage]);

  const handleSend = () => {
    if (selectedUser && input.trim()) {
      sendMessage(selectedUser, input);
      setMessages((prev) => [...prev, { from: userId, content: input }]);
      setInput("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Teacher Chat Page</h2>

      <div className="mb-4">
        <p className="font-medium">Online Users:</p>
        <ul className="flex gap-2">
          {onlineUsers
            .filter((id) => id !== userId)
            .map((id) => (
              <li key={id}>
                <button
                  className={`px-2 py-1 rounded ${
                    selectedUser === id ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedUser(id)}
                >
                  {id}
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="mb-4 border p-2 h-64 overflow-y-scroll bg-white rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-1 ${msg.from === userId ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-3 py-1 rounded ${
                msg.from === userId ? "bg-green-200" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message"
            className="flex-1 px-3 py-1 border rounded"
          />
          <button onClick={handleSend} className="px-4 py-1 bg-blue-500 text-white rounded">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
