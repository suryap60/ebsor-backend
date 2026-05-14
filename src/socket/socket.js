import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000", // website
        "http://localhost:3001", // admin
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    // admin join
    socket.on("join-admin", () => {
      socket.join("admin-room");
      console.log("Admin Joined");
    });

    // website join
    socket.on("join-website", () => {
      socket.join("website-room");
      console.log("Website Joined");
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });

  return io;
};

// get socket instance anywhere
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};