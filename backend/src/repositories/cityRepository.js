import City from "../models/City.js";

const getCitiesByRoute = async (from, to) => {
  return await City.find({ name: { $in: [from, to] } });
};

export default { getCitiesByRoute };
