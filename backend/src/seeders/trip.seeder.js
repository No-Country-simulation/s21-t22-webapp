import mongoose from "mongoose";
import dotenv from "dotenv";
import Trip from "../models/trip.model.js";
import Bus from "../models/bus.model.js";
import Route from "../models/route.model.js";
import Stop from "../models/stops.model.js";

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
    // Obtener datos de referencia
    const buses = await Bus.find();
    const routes = await Route.find();
    const stops = await Stop.find();

    if (!buses.length || !routes.length || !stops.length) {
      throw new Error("Asegúrate de tener buses, rutas y paradas en la BD");
    }

    // Crear viajes
    const trips = [
      {
        bus: buses[0]._id,
        route: routes[0]._id,
        departureDate: new Date(),
        arrivalDate: new Date(new Date().getTime() + 5 * 60 * 60 * 1000), // 5 horas después
        seats: Array.from({ length: 40 }, (_, i) => ({
          seatNumber: i + 1,
          availability: stops.map((stop) => ({
            stop: stop._id,
            isAvailable: Math.random() < 0.8, // 80% de asientos disponibles
          })),
        })),
      },
    ];

    await Trip.deleteMany(); // Limpiar colección antes de sembrar
    await Trip.insertMany(trips);

    console.log("Seeding completo");
    process.exit();
  } catch (error) {
    console.error("Error en seeding", error);
    process.exit(1);
  }
};

seedTrips();
