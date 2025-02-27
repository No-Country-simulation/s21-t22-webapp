import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        ssl: true,
        authSource: "admin",
      })
      .then((db) => {
        console.log("🔥 MongoDB conectado");
        console.log(
          `DB is conected on: 
                  Name:${db.connections[0].name}
                  Port:${db.connections[0].port}`
        );
      });
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
