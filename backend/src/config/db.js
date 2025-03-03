import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("❌ No se encontró la variable de entorno MONGO_URI");
    }

    // Detecta automáticamente si es Atlas o Local
    const isAtlas = MONGO_URI.includes("mongodb+srv://");

    await mongoose.connect(MONGO_URI, {
      ssl: isAtlas, // Activa SSL solo para Atlas
      authSource: isAtlas ? "admin" : undefined,
    });

    const db = mongoose.connection;
    console.log("🔥 MongoDB conectado");
    console.log(
      `DB está conectada en: 
        Nombre: ${db.name}
        Host: ${db.host}
        Puerto: ${db.port}`
    );
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);

    //process.exit(1);
  }
};

export default connectDB;