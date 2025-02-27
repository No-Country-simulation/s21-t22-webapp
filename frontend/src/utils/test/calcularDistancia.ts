
// Función para convertir grados a radianes
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const calcularDistancia = (lat1: number, lon1: number) => {
    
    // Coordenadas de Buenos Aires
    const lat2: number = -34.59509790616856;
    const lon2: number = -58.36923257361296;

    const R = 6371;
    // Formula de Haversine (diferencia entre latitudes y longitudes)
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    // Aplicar la fórmula de Haversine
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    // Calcular la distancia
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Convertir a kilómetros
    return R * c;
};
