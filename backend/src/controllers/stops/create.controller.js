import Stop from "../../models/stop.model.js";

export const createStop = async (req, res) => {
  try {
    const { name, lat, lng } = req.body;

    if (!name || lat === undefined || lng === undefined) {
      return res
        .status(400)
        .json({ message: "Nombre, latitud y longitud son obligatorios" });
    }

    // Revisar si la parada ya existe (por nombre o coordenadas)
    const existingStop = await Stop.findOne({
      $or: [{ name }, { "location.lat": lat, "location.lng": lng }],
    });

    if (existingStop) {
      return res.status(400).json({ message: "Esta parada ya existe" });
    }

    const newStop = new Stop({
      name,
      location: { lat, lng },
    });

    await newStop.save();

    res
      .status(201)
      .json({ message: "Parada creada exitosamente", stop: newStop });
  } catch (error) {
    console.error("Error al crear la parada:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
