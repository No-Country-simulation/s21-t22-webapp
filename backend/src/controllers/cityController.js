import cityService from "../services/cityService.js";

const searchCities = async (req, res) => {
  try {
    const { names } = req.query;

    if (!names) {
      return res.status(400).json({ error: "Debes proporcionar nombres de ciudades" });
    }

    const cities = await cityService.findCitiesByName(names);
    res.json(cities);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default { searchCities };
