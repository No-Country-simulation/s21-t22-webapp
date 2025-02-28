import { addBusService } from "../services/bus.service.js";

export const addBus = async (req, res, next) => {
  try {
    const { plate, capacity } = req.body;
    const bus = await addBusService(plate, capacity);
    res.status(201).json({ message: "Bus añadido correctamente", bus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
