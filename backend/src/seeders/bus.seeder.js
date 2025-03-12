import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Bus from "../models/bus.model.js";

const db = mongoose.connection;

const buses = [
  {
    plate: "DFC 656",
    capacity: 40,
    company: "Flecha Bus",
  },
  {
    plate: "DFC 651",
    capacity: 40,
    company: "Flecha Bus",
  },
  {
    plate: "DFC 652",
    capacity: 40,
    company: "Flecha Bus",
  },
  {
    plate: "DFC 654",
    capacity: 40,
    company: "Flecha Bus",
  },
  {
    plate: "DFC 655",
    capacity: 40,
    company: "Flecha Bus",
  },
  {
    plate: "FCJ 705",
    capacity: 40,
    company: "Rápido del Norte",
  },
  {
    plate: "FCJ 704",
    capacity: 40,
    company: "Rápido del Norte",
  },
  {
    plate: "FCJ 703",
    capacity: 40,
    company: "Rápido del Norte",
  },
  {
    plate: "FCJ 702",
    capacity: 40,
    company: "Rápido del Norte",
  },
  {
    plate: "FCJ 701",
    capacity: 40,
    company: "Rápido del Norte",
  },
  {
    plate: "ASA 156",
    capacity: 40,
    company: "Adesmar",
  },
  {
    plate: "ASA 155",
    capacity: 40,
    company: "Adesmar",
  },
  {
    plate: "ASA 154",
    capacity: 40,
    company: "Adesmar",
  },
  {
    plate: "ASA 153",
    capacity: 40,
    company: "Adesmar",
  },
  {
    plate: "ASA 152",
    capacity: 40,
    company: "Adesmar",
  },
  {
    plate: "ASA 151",
    capacity: 40,
    company: "Adesmar",
  },
  {
    plate: "ASA 150",
    capacity: 40,
    company: "Adesmar",
  }
];

const seedBuses = async () => {
  await connectDB();

  try {
    console.log("🔹 Conectado a la BD. Verificando datos existentes...")

    // Verificar si ya hay buses
    const existingBuses = await Bus.countDocuments();
    if (existingBuses > 0) {
      console.log("🗑️ Eliminando buses existentes...");
      await Bus.deleteMany();
    }

    // Insertar nuevos buses
    await Bus.insertMany(buses);
    console.log(`✅ Seeding completo: ${buses.length} buses agregados.`);
  } catch (error) {
    console.error("❌ Error en seeding de buses:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔹 Conexión cerrada.");
  }
};

seedBuses();
