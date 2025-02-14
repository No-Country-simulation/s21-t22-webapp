import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
  },
  preview: {
    allowedHosts: ['s21-t22s21-t22-frontend.onrender.com', 'localhost'], // Permitir la URL de Render y localhost
  },
});
