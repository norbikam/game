import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 10000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

type UserChoice = {
  choice: string;
  opponentsChoice: string;
};

type GameInfo = {
  gameInfo: string;
};

type UserConnected = {
  userConnected: boolean;
};

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("userChoice", ({ choice }: UserChoice) => {
    socket.broadcast.emit("opponentsChoice", { choice });
  });
  socket.on("gameInfo", ({ gameInfo }: GameInfo) => {
    socket.broadcast.emit("gameInfo", { gameInfo });
  });
});

server.listen(PORT, () => {
  console.log("server listening on http://localhost:10000");
});
