// Función para convertir grados a radianes
const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const calcularDistancia = (lat1, lon1) => {
  // Coordenadas de Buenos Aires
  const lat2 = -34.59509790616856;
  const lon2 = -58.36923257361296;

  const R = 6371; // Radio de la Tierra en kilómetros
  // Fórmula de Haversine (diferencia entre latitudes y longitudes)
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  // Aplicar la fórmula de Haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // Calcular la distancia
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Convertir a kilómetros
  return R * c;
};
