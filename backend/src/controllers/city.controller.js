import cityService from "../services/city.service.js";

const searchCities = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "Parámetros 'from' y 'to' requeridos" });
    }

    const cities = await cityService.searchCities(from, to);
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error al buscar ciudades:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default { searchCities };
