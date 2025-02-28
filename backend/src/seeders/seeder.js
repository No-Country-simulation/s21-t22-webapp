import dotenv from "dotenv";
import mongoose from "mongoose";
import Stop from "../models/stops.model.js";
import { stops } from "./stops.seeder.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const isAtlas = MONGO_URI.includes("mongodb+srv://");

    mongoose.connect(MONGO_URI, {
      ssl: isAtlas, // Activa SSL solo para Atlas
      authSource: isAtlas ? "admin" : undefined,
    });

const importData = async () => {
  try {
    await Stop.insertMany(stops);
    console.log("Paradas agregadas");

    mongoose.disconnect();
    console.log(" Seed completado");
  } catch (error) {
    console.error("Error al poblar la base de datos", error);
    mongoose.disconnect();
  }
};

const deleteData = async () => {
  try {
    await Stop.deleteMany();
    console.log("Paradas eliminadas");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error al borrar la base de datos", error);
    mongoose.disconnect();
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
