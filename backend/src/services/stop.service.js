// src/services/stop.service.js
import { findStopByNameOrCoordinates, createStop } from "../repositories/stop.repository.js";

export const createStopService = async ({ name, lat, lng }) => {
  // Revisar si la parada ya existe
  const existingStop = await findStopByNameOrCoordinates(name, lat, lng);

  if (existingStop) {
    throw new Error("Esta parada ya existe");
  }

  // Crear la nueva parada
  const newStop = await createStop({ name, location: { lat, lng } });
  return newStop;
};
