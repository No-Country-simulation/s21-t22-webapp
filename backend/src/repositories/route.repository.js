import Route from "../models/route.model.js";

export const findRouteByName = async (routeName) => {
  try {
    return await Route.findOne({ name: routeName });
  } catch (error) {
    throw new Error("Error al buscar la ruta: " + error.message);
  }
};

export const createRoute = async (routeData) => {
  try {
    const route = new Route(routeData);
    await route.save();
    return route;
  } catch (error) {
    throw new Error("Error al crear la ruta: " + error.message);
  }
};
