import City from "../models/City.js";

const searchCities = (from, to) => {
  return City.find({ name: { $in: [from, to] } })
    .then(cities => {
      return cities;
    })
    .catch(error => {
      throw new Error("Error al buscar ciudades: " + error.message);
    });
};

export default { searchCities };
