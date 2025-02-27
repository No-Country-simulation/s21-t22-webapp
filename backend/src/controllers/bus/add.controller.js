import Bus from "../../models/bus.model.js";

export const addBus = async (req, res) => {
  try {
    const { plate, capacity } = req.body;

    //validaciones
    if (!plate || !capacity) {
      return res
        .status(400)
        .json({ error: "Se deben proporcionar los datos del bus" });
    }

    if (typeof plate !== "string" || typeof capacity !== "number") {
      return res
        .status(400)
        .json({ error: "Los datos del bus deben ser de tipo string y número" });
    }

    const existingBus = await Bus.findOne({ plate });
    if (existingBus) {
      return res.status(400).json({ error: "Ya existe un bus con esa placa" });
    }

    // Crea el bus en base de datos
    const bus = new Bus({ plate, capacity });
    await bus.save();

    //Respueta
    res.status(201).json({ message: "Bus añadido correctamente", bus });
  } catch (error) {
    next(error);
  }
};
