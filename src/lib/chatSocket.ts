// lib/chatSocket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (userId: string) => {
  if (!socket && userId) {
    socket = io("http://localhost:3002", {
      query: { userId },
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
