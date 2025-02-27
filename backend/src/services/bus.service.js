import { findBusByPlate, createBus } from "../repositories/bus.repository.js";

export const addBusService = async (plate, capacity) => {
  if (!plate || !capacity) {
    throw new Error("Se deben proporcionar los datos del bus");
  }

  if (typeof plate !== "string" || typeof capacity !== "number") {
    throw new Error("Los datos del bus deben ser de tipo string y número");
  }

  const existingBus = await findBusByPlate(plate);
  if (existingBus) {
    throw new Error("Ya existe un bus con esa placa");
  }

  return await createBus({ plate, capacity });
};
