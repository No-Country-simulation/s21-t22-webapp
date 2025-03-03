import { 
  createTrip, 
  getTripsByRouteId, 
  getTripsByRoutes, 
  findTripsByDate,
  getAllTrips,
  getTripById
} from "../repositories/trip.repository.js";
import { findStopById } from "../repositories/stop.repository.js";
import Route from "../models/route.model.js";
import Bus from "../models/bus.model.js";
import { buildGraphFromConnections, canTravel } from "../utils/graph/bfs.graph.js";


// Obtener todos los viajes
export const obtenerViajesService = async () => {
  try {
    return await getAllTrips();
  } catch (error) {
    throw new Error("Error al obtener los viajes: " + error.message);
  }
};

// Obtener un viaje por ID
export const obtenerViajePorIdService = async (tripId) => {
  try {
    const trip = await getTripById(tripId);
    if (!trip) {
      throw new Error("Viaje no encontrado");
    }
    return trip;
  } catch (error) {
    throw new Error("Error al obtener el viaje: " + error.message);
  }
};

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

export const hasValidConnection = (connections, stopDesde, stopHasta) => {
  let foundDesde = false;
  for (const connection of connections) {
    if (String(connection.from._id) === String(stopDesde._id)) {
      foundDesde = true; // Se encontró la parada de inicio
    }
    if (foundDesde && String(connection.to._id) === String(stopHasta._id)) {
      return true; // Se encontró la parada de destino después del inicio
    }
  }
  return false;
};

export const getTripsForDate = async (id1, id2, fecha) => {
  // Buscar las paradas por ID
  const stopDesde = await findStopById(id1);
  const stopHasta = await findStopById(id2);

  if (!stopDesde || !stopHasta) {
    throw new Error("No se encontró una o ambas paradas.");
  }

  // Definir rango de búsqueda para la fecha (todo el día)
  const startDate = new Date(fecha);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(fecha);
  endDate.setUTCHours(23, 59, 59, 999);

  // Buscar los viajes dentro del rango de fechas
  const trips = await findTripsByDate(startDate, endDate);

  // Filtrar los viajes que tengan una conexión válida entre las paradas
  const validTrips = trips.filter((trip) =>
    hasValidConnection(trip.route.connections, stopDesde, stopHasta)
  );

  if (!validTrips || validTrips.length === 0) {
    throw new Error("No se encontró un viaje válido en la fecha indicada.");
  }

  return validTrips.map((trip) => ({
    trip: {
      _id: trip._id,
      departureDate: trip.departureDate,
      arrivalDate: trip.arrivalDate,
      bus: trip.bus,
      route: {
        _id: trip.route._id,
        name: trip.route.name
      }
    },
    stops: [stopDesde, stopHasta]
  }));
};
