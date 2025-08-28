const express = require("express");
const http = require("http");
const cors = require("cors");
const data = require("./db.json");
const socketIo = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(` a user connected`);
  socket.on("joinRoom", (room, name) => {
    console.log(`${name} joined the room: ${room}`);
    socket.join(room);
    io.to(room).emit("message", `${name} has joined the game`);
  });
});

app.get("/", (req, res) => {
  res.send(`server running`);
});

const PORT = 5000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
