// components/ChatArea.tsx
"use client";

import { useState, useEffect } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";


export default function ChatArea({ userId, userName, selectedUser }: ChatAreaProps) {
  const { sendMessage, onReceiveMessage, getMessageHistory } = useChatSocket(userId, userName);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!selectedUser || !newMessage.trim()) return;

    const message: Message = {
      senderId: userId,
      receiverId: selectedUser.userId,
      content: newMessage.trim(),
    };

    sendMessage(selectedUser.userId, newMessage.trim());
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  useEffect(() => {
    if (selectedUser) {
      getMessageHistory(userId, selectedUser.userId, (msgs) => {
        setMessages(msgs);
      });
    } else {
      setMessages([]);
    }
  }, [selectedUser]);

  useEffect(() => {
    onReceiveMessage((msg: Message) => {
      if (selectedUser && (msg.senderId === selectedUser.userId || msg.receiverId === selectedUser.userId)) {
        setMessages((prev) => [...prev, msg]);
      }
    });
  }, [onReceiveMessage, selectedUser]);

  return (
  <div className="flex flex-col h-full border-l">
    {selectedUser ? (
      <>
        <div className="p-4 border-b font-semibold text-white">
          Chat with {selectedUser.userName}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md max-w-xs ${
                msg.senderId === userId
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
            className="flex-1 border px-3 py-2 rounded-md text-white bg-gray-800"
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
);

}
