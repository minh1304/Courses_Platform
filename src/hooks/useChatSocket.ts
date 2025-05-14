import { useEffect, useState } from "react";
import { getSocket, disconnectSocket } from "@/lib/chatSocket";

export const useChatSocket = (userId: string, userName: string) => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    const socket = getSocket(userId, userName);
    if (!socket) return;

    const handleOnlineUsers = (users: OnlineUser[]) => {
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);
    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [userId]);

  const sendMessage = (to: string, content: string) => {
    const socket = getSocket(userId, userName);
    socket?.emit("sendMessage", { to, from: userId, content });
  };

  const onReceiveMessage = (callback: (msg: any) => void) => {
    const socket = getSocket(userId, userName);
     if (!socket) return;
    
    socket.off("receiveMessage");
    socket.on("receiveMessage", callback);
  };

  const getMessageHistory = (
    user1: string,
    user2: string,
    callback: (msgs: Message[]) => void
  ) => {
    const socket = getSocket(userId, userName);
    if (!socket) return;

    socket.emit("getMessageHistory", { user1, user2 });

    // Remove any previous listener to prevent stacking
    socket.off("messageHistory", callback);
    socket.once("messageHistory", callback);
  };


  return {
    onlineUsers,
    sendMessage,
    onReceiveMessage,
    getMessageHistory,
  };
};
