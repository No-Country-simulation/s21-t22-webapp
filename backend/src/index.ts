import { createServer } from 'http';
import { initSocket } from './socket/socket.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

// Middlewares globales
app.use(cors({ origin: '*' }));
app.use(express.json());

// Ruta para contenido estático
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la aplicación. SIEMPRE DEBEN EMPEZAR POR "/api". HAY QUE MOVERLAS A OTROS ACHIVOS PORQUE ESTO VA A CRECER MUCHÍSIMO!
app.get('/api/', (_req, res) => {
  res.json({ message: 'API REST funcionando correctamente' });
});

// Inicializa el servidor Socket
initSocket(server);

// Inicializar el serviodor API
server.listen(PORT, () => {
  console.clear();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
