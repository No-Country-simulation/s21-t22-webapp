import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Definir la configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Rutas y Viajes",
      version: "1.0.0",
      description: "Documentación de la API para gestionar rutas y viajes",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpecs };
