// hooks/useChatSocket.ts
import { useEffect, useState } from "react";
import { getSocket, disconnectSocket } from "@/lib/chatSocket";

export const useChatSocket = (userId: string) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const socket = getSocket(userId);
    if (!socket) return;

    socket.on("onlineUsers", setOnlineUsers);

    return () => {
      // do not disconnect here to preserve singleton across pages
      // disconnectSocket(); // optionally call this when user logs out
    };
  }, [userId]);

  const sendMessage = (to: string, content: string) => {
    const socket = getSocket(userId);
    socket?.emit("sendMessage", { to, from: userId, content });
  };

  const onReceiveMessage = (callback: (msg: any) => void) => {
    const socket = getSocket(userId);
     if (!socket) return;
    
    socket.off("receiveMessage");
    socket.on("receiveMessage", callback);
  };

  return {
    onlineUsers,
    sendMessage,
    onReceiveMessage,
  };
};
