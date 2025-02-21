import user from "../models/User.js";

//Lista de sockets(conexiones)
const socketList = {};

export default (io) => {
  io.sockets.on("connection", (socket) => {
    socket.id = user.id;
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    socketList[socket.id] = socket;
  });
};
