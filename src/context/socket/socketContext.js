import io from "socket.io-client";
import { createContext } from "react";
const SOCKET_URL = "socket.tingtong.xyz";
export const socketChat = io(SOCKET_URL + "/chat", {
  query: { token: localStorage.getItem("token") },
  transports: ["websocket", "polling", "flashsocket"],
});
export const socketCall = io(SOCKET_URL + "/video-call", {
  query: { token: localStorage.getItem("token") },
  transports: ["websocket", "polling", "flashsocket"],
});
export const socketTutor = io(SOCKET_URL + "/tutor", {
  query: { token: localStorage.getItem("token") },
  transports: ["websocket", "polling", "flashsocket"],
});
export const SocketContext = createContext();

// function Socket() {
//   this.socket = io.connect(remoteUrl + '?role=user');
//   this.reconnect = () => {
//     this.socket = io.connect(remoteUrl + '?role=user');
//   }
// }

// let socket = new Socket();

// socket.socket.on('statusChange', (data) => {
//   return SocketWorker.receiveOrderStatusChange(data);
// })
