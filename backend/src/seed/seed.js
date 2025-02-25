import { cities } from './cities.seeder.js';
import City from '../models/City.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await City.deleteMany();
    console.log('-> Ciudades existentes eliminadas');

    await City.insertMany(cities);
    console.log('-> Nuevas ciudades agregadas');

    mongoose.disconnect();
    console.log('-> Seed completado');
  } catch (error) {
    console.error('Error al poblar la base de datos', error);
    mongoose.disconnect();
  }
};

seedDatabase();
