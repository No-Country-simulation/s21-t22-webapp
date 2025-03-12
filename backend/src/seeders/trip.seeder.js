import mongoose from "mongoose";
import dotenv from "dotenv";
import Trip from "../models/trip.model.js";
import Bus from "../models/bus.model.js";
import Route from "../models/route.model.js";
import Stop from "../models/stop.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

const seedTrips = async () => {
  await connectDB();

  try {
    console.log("Conectado a la BD. Obteniendo datos...");

    // Obtener datos de referencia
    const buses = await Bus.find();
    const routes = await Route.find();
    const stops = await Stop.find();

    if (!buses.length || !routes.length || !stops.length) {
      throw new Error("Asegúrate de tener buses, rutas y paradas en la BD");
    }

    console.log(`Buses encontrados: ${buses.length}`);
    console.log(`Rutas encontradas: ${routes.length}`);
    console.log(`Paradas encontradas: ${stops.length}`);

    // Borrar datos previos solo si existen
    const existingTrips = await Trip.countDocuments();
    if (existingTrips > 0) {
      console.log("Eliminando viajes existentes...");
      await Trip.deleteMany();
    }

    // Crear múltiples viajes
    const trips = Array.from({ length: 50 }, (_, index) => {
      const randomBus = buses[Math.floor(Math.random() * buses.length)];
      const randomRoute = routes[Math.floor(Math.random() * routes.length)];

      // Fecha de salida aleatoria dentro de los próximos 7 días
      const departureDate = new Date();
      departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 7));

      const arrivalDate = new Date(departureDate.getTime() + (3 + Math.random() * 5) * 60 * 60 * 1000); // 3 a 8 horas después

      return {
        bus: randomBus._id,
        route: randomRoute._id,
        departureDate,
        arrivalDate,
        duration: Math.floor((arrivalDate - departureDate) / (60 * 1000)), // en minutos
        seatType: Math.random() < 0.5 ? "semicama" : "cama",
      };
    });

    // Insertar viajes
    await Trip.insertMany(trips);

    console.log(`✅ Seeding completo: ${trips.length} viajes creados.`);
  } catch (error) {
    console.error("❌ Error en seeding:", error);
  } finally {
    mongoose.connection.close();
    console.log("Conexión cerrada.");
  }
};

seedTrips();