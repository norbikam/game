import express from "express";
import http from "http";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("userChoice", ({ choice }: UserChoice) => {
    socket.broadcast.emit("opponentsChoice", { choice });
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log("server listening on http://localhost:4000");
});
