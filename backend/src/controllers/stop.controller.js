import stopService, { createStopService } from "../services/stop.service.js";
import Stop from "../models/stops.model.js"
import Trip from "../models/trip.model.js"

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

export const buscarViajePorFecha = async (req, res) => {
  try {
    const { desde, hasta, fecha } = req.query;
    console.log("Desde:", desde);
    console.log("Hasta:", hasta);

    // Buscar las paradas por nombre
    const stopDesde = await Stop.findOne({ name: desde });
    const stopHasta = await Stop.findOne({ name: hasta });

    console.log("Parada Desde:", stopDesde);
    console.log("Parada Hasta:", stopHasta);

    if (!stopDesde || !stopHasta) {
      return res.status(404).json({ error: "No se encontró una o ambas paradas." });
    }

    // Definir rango de búsqueda para la fecha (todo el día)
    const startDate = new Date(fecha);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(fecha);
    endDate.setUTCHours(23, 59, 59, 999);

    console.log("Fecha Inicio:", startDate);
    console.log("Fecha Fin:", endDate);

    // Buscar viajes cuya fecha de salida esté dentro del rango
    const trips = await Trip.find({
      departureDate: { $gte: startDate, $lte: endDate }
    }).populate({
      path: "route",
      populate: {
        path: "connections.from connections.to",
        model: "Stop"
      }
    });

    // Función para verificar si `stopDesde` aparece antes que `stopHasta` en la ruta
    const hasValidConnection = (connections, stopDesde, stopHasta) => {
      let foundDesde = false;

      for (const connection of connections) {
        if (connection.from._id.equals(stopDesde._id)) {
          foundDesde = true; // Se encontró la parada de inicio
        }

        if (foundDesde && connection.to._id.equals(stopHasta._id)) {
          return true; // Se encontró la parada de destino después del inicio
        }
      }

      return false; // Si no se encontró la conexión en orden, no es válido
    };

    // Filtrar viajes donde exista una conexión válida en orden
    const validTrip = trips.find(trip =>
      hasValidConnection(trip.route.connections, stopDesde, stopHasta)
    );

    if (!validTrip) {
      return res.status(404).json({ error: "No se encontró un viaje válido en la fecha indicada." });
    }

    // Retornar el viaje encontrado primero y luego las paradas solicitadas
    return res.status(200).json({
      trip: validTrip,
      stops: [stopDesde, stopHasta] // Lista con las dos paradas en orden
    });

  } catch (error) {
    console.error("Error al buscar el viaje:", error);
    res.status(500).json({ message: "Error interno del servidor", details: error.message });
  }
};

export const findStopsByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const stops = await stopService.findStopsByQuery(q);
    return res.status(200).json({ stops });
  } catch (error) {
    console.error("Error al buscar paradas:", error.message);
    return res.status(400).json({ message: error.message });
  }
};
