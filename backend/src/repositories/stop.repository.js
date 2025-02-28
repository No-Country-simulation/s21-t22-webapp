import Stop from "../models/stops.model.js";

export const findStopsByIds = async (stopIds) => {
  try {
    return await Stop.find({ _id: { $in: stopIds } });
  } catch (error) {
    throw new Error("Error al buscar las paradas: " + error.message);
  }
};
export const findStopByNameOrCoordinates = async (name, lat, lng) => {
  try {
    return await Stop.findOne({
      $or: [{ name }, { "location.lat": lat, "location.lng": lng }],
    });
  } catch (error) {
    throw new Error("Error al buscar la parada: " + error.message);
  }
};

export const createStop = async (stopData) => {
  try {
    const stop = new Stop(stopData);
    await stop.save();
    return stop;
  } catch (error) {
    throw new Error("Error al crear la parada: " + error.message);
  }
};

const findStopsByQuery = async (query) => {
  return await Stop.find({
    $or: [
      { name: { $regex: `^${query}`, $options: "i" } },
      { city: { $regex: `^${query}`, $options: "i" } } 
    ]
  }).sort({ name: 1 });
};

export default { findStopsByQuery };
