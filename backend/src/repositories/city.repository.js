import City from "../models/City.js";

const getCitiesByRoute = async (from, to) => {
  try {
    return await City.find({ name: { $in: [from, to] } });
  } catch (error) {
    throw new Error("Error al buscar ciudades en la base de datos: " + error.message);
  }
};

export default { getCitiesByRoute };
