import cityRepository from "../repositories/cityRepository.js";

const findCitiesByName = async (names) => {
  const cityNames = names.split(",").map(name => name.trim());
  return await cityRepository.getCitiesByNames(cityNames);
};

export default { findCitiesByName };
