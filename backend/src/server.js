import http from "http";
import { Server } from "socket.io";
import app from "./app.js"; 

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`🟢 Nuevo cliente conectado: ${socket.id}`);

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("message", data); 
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Cliente desconectado: ${socket.id}`);
  });
});

console.log("🛠 Iniciando servidor...");
server.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});

