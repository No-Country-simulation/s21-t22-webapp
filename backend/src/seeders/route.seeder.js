import dotenv from "dotenv";
import mongoose from "mongoose";
import Route from "../models/route.model.js";
import Stop from "../models/stops.model.js";
import { distance } from "../utils/graph/distance.graph.js";

dotenv.config();

mongoose.connect(process.env.MY_MONGO_URI, {
  ssl: true,
  authSource: "admin",
});

const crearRutas = async () => {
  try {
    // Obtener todas las paradas disponibles
    const stops = await Stop.find();

    if (stops.length === 0) {
      console.log(
        "No hay paradas en la base de datos. Ejecuta primero el seeder de paradas."
      );
      mongoose.disconnect();
      return;
    }

    // Definir rutas con múltiples paradas (en forma de conexiones)
    const rutas = [
      {
        name: "Buenos Aires - Mendoza",
        connections: [
          { from: "Buenos Aires", to: "Rosario" },
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "Mendoza" },
        ],
      },
      {
        name: "Buenos Aires - Salta",
        connections: [
          { from: "Buenos Aires", to: "Santa Fe" },
          { from: "Santa Fe", to: "Córdoba" },
          { from: "Córdoba", to: "Salta" },
        ],
      },
    ];

    // Formatear las rutas con sus IDs y calcular distancias
    const formattedRoutes = [];

    for (const ruta of rutas) {
      const formattedConnections = [];

      for (const connection of ruta.connections) {
        const stop1 = stops.find((s) => s.name === connection.from);
        const stop2 = stops.find((s) => s.name === connection.to);

        if (!stop1 || !stop2) {
          console.log(
            `⚠️ No se encontró una de las paradas: ${connection.from} o ${connection.to}`
          );
          continue;
        }

        const Distance = distance(
          stop1.location.lat,
          stop1.location.lng,
          stop2.location.lat,
          stop2.location.lng
        );

        formattedConnections.push({
          from: stop1._id,
          to: stop2._id,
          distance: Distance,
        });
      }

      formattedRoutes.push({
        name: ruta.name,
        connections: formattedConnections,
      });
    }

    await Route.insertMany(formattedRoutes);
    console.log("Rutas insertadas correctamente");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error al insertar rutas en la base de datos", error);
    mongoose.disconnect();
  }
};

const deleteRoutes = async () => {
  try {
    await Route.deleteMany();
    console.log("Rutas eliminadas");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error al borrar rutas en la base de datos", error);
    mongoose.disconnect();
  }
};

if (process.argv[2] === "-i") {
  crearRutas();
} else if (process.argv[2] === "-d") {
  deleteRoutes();
}
