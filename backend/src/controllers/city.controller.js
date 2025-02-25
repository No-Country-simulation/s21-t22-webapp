import cityService from '../services/city.service.js';

const searchCities = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "Parámetros 'from' y 'to' requeridos" });
    }

    const cities = await cityService.searchCities(from, to);
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error al buscar ciudades:', error.message);
    res.status(500).json({ message: error.message });
  }
};
const searchCitiesByQuery = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "La query-params 'query' es requerida" });
    }

    const cities = await cityService.searchCitiesByQuery(query);
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error al buscar ciudades:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export default { searchCities, searchCitiesByQuery };
