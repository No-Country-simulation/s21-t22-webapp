// src/controllers/route.controller.js
import { addRouteService } from "../services/route.service.js";

export const addRouteController = async (req, res) => {
  try {
    const { routeName, stops } = req.body;

    // Llamamos al servicio para agregar la ruta
    const newRoute = await addRouteService({ routeName, stops });

    res.status(201).json({
      message: "Ruta añadida correctamente",
      route: newRoute,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al añadir la ruta",
      details: error.message,
    });
  }
};
