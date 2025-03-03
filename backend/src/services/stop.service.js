// src/services/stop.service.js
import stopRepository, {
  findStopByNameOrCoordinates,
  createStop,
} from "../repositories/stop.repository.js";

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

const findStopsByQuery = async (q) => {
  if (!q) {
    throw new Error("Se requiere un parámetro de búsqueda (q).");
  }

  const stops = await stopRepository.findStopsByQuery(q);

  if (stops.length === 0) {
    throw new Error("No se encontraron paradas con el criterio de búsqueda.");
  }

  return stops;
};

export default { findStopsByQuery };
