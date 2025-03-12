import dotenv from "dotenv";
import mongoose from "mongoose";
import Route from "../models/route.model.js";
import Stop from "../models/stop.model.js";
import { distance } from "../utils/graph/distance.graph.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const isAtlas = MONGO_URI.includes("mongodb+srv://");

mongoose.connect(MONGO_URI, {
  ssl: isAtlas, // Activa SSL solo para Atlas
  authSource: isAtlas ? "admin" : undefined,
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
      {
        name: "Buenos Aires - San Juan",
        connections: [
          { from: "Buenos Aires", to: "La Plata" },
          { from: "La Plata", to: "Mar del Plata" },
          { from: "Mar del Plata", to: "San Juan" },
        ],
      },
      {
        name: "Córdoba - San Miguel de Tucumán",
        connections: [
          { from: "Córdoba", to: "San Miguel de Tucumán" },
        ],
      },
      {
        name: "Rosario - Mar del Plata",
        connections: [
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "La Plata" },
          { from: "La Plata", to: "Mar del Plata" },
        ],
      },
      {
        name: "La Plata - Mendoza",
        connections: [
          { from: "La Plata", to: "Córdoba" },
          { from: "Córdoba", to: "Mendoza" },
        ],
      },
      {
        name: "Córdoba - Rosario",
        connections: [
          { from: "Córdoba", to: "Rosario" },
        ],
      },
      {
        name: "Buenos Aires - Santa Fe",
        connections: [
          { from: "Buenos Aires", to: "Rosario" },
          { from: "Rosario", to: "Santa Fe" },
        ],
      },
      {
        name: "Mendoza - San Juan",
        connections: [
          { from: "Mendoza", to: "San Juan" },
        ],
      },
      {
        name: "Buenos Aires - San Miguel de Tucumán",
        connections: [
          { from: "Buenos Aires", to: "Rosario" },
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "San Miguel de Tucumán" },
        ],
      },
      {
        name: "Rosario - La Plata",
        connections: [
          { from: "Rosario", to: "Santa Fe" },
          { from: "Santa Fe", to: "La Plata" },
        ],
      },
      {
        name: "San Juan - Mar del Plata",
        connections: [
          { from: "San Juan", to: "Córdoba" },
          { from: "Córdoba", to: "La Plata" },
          { from: "La Plata", to: "Mar del Plata" },
        ],
      },
      {
        name: "Salta - San Miguel de Tucumán",
        connections: [
          { from: "Salta", to: "San Miguel de Tucumán" },
        ],
      },
      {
        name: "Rosario - Mendoza",
        connections: [
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "Mendoza" },
        ],
      },
      {
        name: "La Plata - Rosario",
        connections: [
          { from: "La Plata", to: "Córdoba" },
          { from: "Córdoba", to: "Rosario" },
        ],
      },
      {
        name: "San Juan - Salta",
        connections: [
          { from: "San Juan", to: "Córdoba" },
          { from: "Córdoba", to: "Salta" },
        ],
      },
      {
        name: "Buenos Aires - Córdoba",
        connections: [
          { from: "Buenos Aires", to: "Rosario" },
          { from: "Rosario", to: "Córdoba" },
        ],
      },
      {
        name: "Mar del Plata - Mendoza",
        connections: [
          { from: "Mar del Plata", to: "La Plata" },
          { from: "La Plata", to: "Córdoba" },
          { from: "Córdoba", to: "Mendoza" },
        ],
      },
      {
        name: "Buenos Aires - Salta - San Juan",
        connections: [
          { from: "Buenos Aires", to: "La Plata" },
          { from: "La Plata", to: "San Juan" },
          { from: "San Juan", to: "Córdoba" },
          { from: "Córdoba", to: "Salta" },
        ],
      },
      {
        name: "Córdoba - Rosario - Santa Fe",
        connections: [
          { from: "Córdoba", to: "Rosario" },
          { from: "Rosario", to: "Santa Fe" },
        ],
      },
      {
        name: "Rosario - Salta",
        connections: [
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "Salta" },
        ],
      },
      {
        name: "Córdoba - San Juan - Mendoza",
        connections: [
          { from: "Córdoba", to: "San Juan" },
          { from: "San Juan", to: "Mendoza" },
        ],
      },
      {
        name: "Mar del Plata - San Juan",
        connections: [
          { from: "Mar del Plata", to: "La Plata" },
          { from: "La Plata", to: "San Juan" },
        ],
      },
      {
        name: "Buenos Aires - Rosario - Mendoza",
        connections: [
          { from: "Buenos Aires", to: "Rosario" },
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "Mendoza" },
        ],
      },
      {
        name: "La Plata - San Miguel de Tucumán",
        connections: [
          { from: "La Plata", to: "Córdoba" },
          { from: "Córdoba", to: "San Miguel de Tucumán" },
        ],
      },
      {
        name: "Córdoba - Santa Fe",
        connections: [
          { from: "Córdoba", to: "Santa Fe" },
        ],
      },
      {
        name: "Rosario - San Miguel de Tucumán",
        connections: [
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "San Miguel de Tucumán" },
        ],
      },
      {
        name: "San Juan - Rosario",
        connections: [
          { from: "San Juan", to: "Córdoba" },
          { from: "Córdoba", to: "Rosario" },
        ],
      },
      {
        name: "Buenos Aires - Mendoza - Mar del Plata",
        connections: [
          { from: "Buenos Aires", to: "Rosario" },
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "Mendoza" },
          { from: "Mendoza", to: "Mar del Plata" },
        ],
      },
      {
        name: "Rosario - San Juan - Mendoza",
        connections: [
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "San Juan" },
          { from: "San Juan", to: "Mendoza" },
        ],
      },
      {
        name: "Santa Fe - Mendoza",
        connections: [
          { from: "Santa Fe", to: "Rosario" },
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "Mendoza" },
        ],
      },
      {
        name: "San Miguel de Tucumán - Rosario",
        connections: [
          { from: "San Miguel de Tucumán", to: "Córdoba" },
          { from: "Córdoba", to: "Rosario" },
        ],
      },
      {
        name: "Buenos Aires - Rosario - San Miguel de Tucumán",
        connections: [
          { from: "Buenos Aires", to: "Rosario" },
          { from: "Rosario", to: "Córdoba" },
          { from: "Córdoba", to: "San Miguel de Tucumán" },
        ],
      },
      {
        name: "Mendoza - San Miguel de Tucumán",
        connections: [
          { from: "Mendoza", to: "San Juan" },
          { from: "San Juan", to: "Córdoba" },
          { from: "Córdoba", to: "San Miguel de Tucumán" },
        ],
      },
      {
        name: "Buenos Aires - Rosario - Salta",
        connections: [
          { from: "Buenos Aires", to: "Rosario" },
          { from: "Rosario", to: "Córdoba" },
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


