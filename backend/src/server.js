import http from "http";
import { Server } from "socket.io";
import app from "./app.js"; // Importamos la configuración de Express

const PORT = process.env.PORT || 5000;

// Creamos el servidor HTTP
const server = http.createServer(app);

// Configuración de Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Puedes restringirlo a tu frontend
    methods: ["GET", "POST"]
  }
});

// Evento de conexión de socket
io.on("connection", (socket) => {
  console.log(`🟢 Nuevo cliente conectado: ${socket.id}`);

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("message", data); // Reenviar mensaje a todos los clientes conectados
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Cliente desconectado: ${socket.id}`);
  });
});

console.log("🛠 Iniciando servidor...");
server.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});

