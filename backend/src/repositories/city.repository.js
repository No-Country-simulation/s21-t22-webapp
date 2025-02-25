import City from '../models/City.js';

const getCitiesByRoute = async (from, to) => {
  try {
    return await City.find({ name: { $in: [from, to] } });
  } catch (error) {
    throw new Error('Error al buscar ciudades en la base de datos: ' + error.message);
  }
};

const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getCitiesByQuery = async (query) => {
  const escapedQuery = escapeRegex(query);
  const regex = new RegExp(escapedQuery, 'i');
  return await City.find({ name: { $regex: regex } });
};

export default { getCitiesByRoute, getCitiesByQuery };
