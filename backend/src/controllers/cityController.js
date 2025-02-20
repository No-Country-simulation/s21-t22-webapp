import cityService from "../services/cityService.js";

const searchCities = (req, res) => {
  const { from, to } = req.query;

  cityService.searchCities(from, to)
    .then(cities => {
      if (cities.length === 0) {
        return res.status(404).json({ message: "Ciudades no encontradas" });
      }
      res.status(200).json(cities);
    })
    .catch(error => {
      console.error("Error al buscar ciudades:", error);
      res.status(500).json({ message: "Error en el servidor" });
    });
};

export default { searchCities };
