import io from 'socket.io-client';

export const SOCKET = io(import.meta.env.VITE_API_URL);
