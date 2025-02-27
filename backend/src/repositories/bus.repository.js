import Bus from "../models/bus.model.js";

export const findBusByPlate = async (plate) => {
  return await Bus.findOne({ plate });
};

export const createBus = async (busData) => {
  const bus = new Bus(busData);
  return await bus.save();
};
