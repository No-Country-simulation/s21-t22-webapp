import City from "../models/City.js";

const getCitiesByNames = async (cityNames) => {
  return await City.find({ name: { $in: cityNames } });
};

export default { getCitiesByNames };
