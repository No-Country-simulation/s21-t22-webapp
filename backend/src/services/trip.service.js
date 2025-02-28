// src/services/trip.service.js
import { createTrip, getTripsByRouteId, getTripsByRoutes } from "../repositories/trip.repository.js";
import Route from "../models/route.model.js";
import Bus from "../models/bus.model.js";
import { buildGraphFromConnections, canTravel } from "../utils/graph/bfs.graph.js";

export const createTripService = async ({ routeId, busId, departureDate, arrivalDate, price }) => {
  // Verificar si la ruta existe
  const route = await Route.findById(routeId);
  if (!route) {
    throw new Error("La ruta no existe");
  }

  // Verificar si el bus existe
  const bus = await Bus.findById(busId);
  if (!bus) {
    throw new Error("El bus no existe");
  }

  // Crear el viaje
  const newTrip = await createTrip({
    route: routeId,
    bus: busId,
    departureDate,
    arrivalDate,
    price,
  });

  return newTrip;
};

export const getTripsByRouteIdService = async (routeId) => {
  return await getTripsByRouteId(routeId);
};

export const searchTripsService = async ({ from, to }) => {
  if (!from || !to) {
    throw new Error("Debes proporcionar las paradas de origen y destino");
  }

  const fromStr = from.toString();
  const toStr = to.toString();

  // Obtener todas las rutas
  const allRoutes = await Route.find().populate(
    "connections.from connections.to"
  );

  // Filtrar las rutas donde from puede llegar a to
  const validRoutes = [];
  for (const route of allRoutes) {
    // Construir el grafo
    const graph = buildGraphFromConnections(route.connections);

    if (canTravel(graph, fromStr, toStr)) {
      validRoutes.push(route._id);
    }
  }

  if (validRoutes.length === 0) {
    throw new Error("No hay rutas disponibles entre estas paradas");
  }

  // Buscar viajes con esas rutas
  return await getTripsByRoutes(validRoutes);
};
