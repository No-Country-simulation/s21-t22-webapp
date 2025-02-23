import cityRepository from "../repositories/city.repository.js";

const searchCities = async (from, to) => {
  if (!from || !to) {
    throw new Error("Los parámetros 'from' y 'to' son obligatorios");
  }

  const cities = await cityRepository.getCitiesByRoute(from, to);

  if (!cities || cities.length === 0) {
    throw new Error("Ciudades no encontradas");
  }

  return cities;
};

export default { searchCities };
