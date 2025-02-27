// src/controllers/stop.controller.js
import { createStopService } from "../services/stop.service.js";

export const createStopController = async (req, res) => {
  try {
    const { name, lat, lng } = req.body;

    if (!name || lat === undefined || lng === undefined) {
      return res.status(400).json({ message: "Nombre, latitud y longitud son obligatorios" });
    }

    // Llamar al servicio para crear la parada
    const newStop = await createStopService({ name, lat, lng });

    res.status(201).json({ message: "Parada creada exitosamente", stop: newStop });
  } catch (error) {
    console.error("Error al crear la parada:", error);
    res.status(500).json({ message: "Error interno del servidor", details: error.message });
  }
};
