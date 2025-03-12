# Reserva tu Bus (RTB) - MERN Stack

Este proyecto es una aplicación de reserva de viajes para participar en el seleccionado de Nocountry desarrollada con el stack MERN(MongoDB, Express.js, React, Node.js). 

## 🛠️ Tecnologías utilizadas
- **Frontend:** React.ts (con MUI).
- **Backend:** Node.js con Express.js.
- **Base de datos:** MongoDB (Mongoose).
- **Servicios externos:** S3 para almacenar imágenes,

## 🚀 Enlaces de despliegue

- **Backend**: [RTB-API](https://reserva-tu-bus.netlify.app/)
- **Frontend**: --

## 🚀 Instalación y configuración
### 1️⃣ Clonar el repositorio
```bash
 git clone https://github.com/No-Country-simulation/s21-t22-webapp.git
 cd s21-t22-webapp
```

### 2️⃣ Instalar dependencias
#### Backend
```bash
 cd backend
 npm install
```

#### Frontend
```bash
 cd frontend
 npm install
```

### 3️⃣ Configurar variables de entorno
Crear un archivo `.env` en la carpeta `backend` y definir las siguientes variables:
```env
MONGO_URI=your_mongodb_connection_string
PORT=your_port
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_aws_bucket_name

```
Crear un archivo `.env` en la carpeta `frontend` y definir las siguientes variables:
```env

```
### 4️⃣ Ejecutar el proyecto
#### Iniciar backend
```bash
 cd backend
 npm npm run dev
```

#### Iniciar frontend
```bash
 cd frontend
 npm npm run dev
```

## 📖 Uso de la API
### Endpoints principales
| Método | Endpoint | Descripción |
|--------|---------|-------------|
| `GET` | `/api/stop/search` | Buscar paradas |


## 📌 Posibles mejoras a implementar
- Implementación de disponibilidad de asientos en tiempo real con WebSockets.

## 📝 Autores
- **Benjamin Moreno** - [GitHub](https://github.com/BenjaMoreno) - [LinkedIn]()
- **Ezequiel Astrada** - [GitHub](https://github.com/ezequielastrada) - [LinkedIn]()
- **Armando Heredia** - [GitHub](https://github.com/Moisarm)
- **Dmitry Jrapach** - [GitHub](https://github.com/DmitriJrapach) - [LinkedIn]()
- **Daniel Renato** - [GitHub](https://github.com/Mikelrax) - [LinkedIn]()