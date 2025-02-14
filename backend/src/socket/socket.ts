import { Server } from 'socket.io';

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('mensaje', (data: string) => {
      io.emit(
        'respuesta',
        `Esta es la respuesta del servidor Socket, se recibió el mensaje: "${data}"`
      );
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};

/**
 * Emite un evento mediante la conexión de Socket.io con el servidor.
 *
 * Esta función permite emitir eventos personalizados a los clientes conectados
 * a través de Socket.io. Solo emite el evento si la conexión de `io` está
 * establecida, enviando el `event` y su respectivo `payload`.
 *
 * @param {string} event - El nombre del evento a emitir.
 * @param {any} payload - Los datos que se enviarán con el evento.
 *
 * @example
 * //  Emitir un evento llamado 'mensaje' con un payload de mensaje
 * emitEvent('mensaje', { text: 'Hola mundo!' });
 *
 * @throws {Error} Si `io` no está inicializado o no existe.
 */
export const emitEvent = (event: string, payload: any) => {
  if (io) {
    io.emit(event, payload);
  }
};
