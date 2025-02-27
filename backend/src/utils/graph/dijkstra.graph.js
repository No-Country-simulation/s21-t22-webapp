import Route from "../../models/route.model.js";

export const dijkstra = async (routeId, startId, endId) => {
  const route = await Route.findById(routeId).populate(
    "connections.from connections.to"
  );

  if (!route) throw new Error("Ruta no encontrada");

  const graph = new Map();

  route.connections.forEach(({ from, to, distance }) => {
    if (!graph.has(from._id.toString())) graph.set(from._id.toString(), []);
    if (!graph.has(to._id.toString())) graph.set(to._id.toString(), []);

    graph
      .get(from._id.toString())
      .push({ destino: to._id.toString(), distancia: distance });
    graph
      .get(to._id.toString())
      .push({ destino: from._id.toString(), distancia: distance });
  });

  // Inicializar estructuras
  const distancias = new Map();
  const previos = new Map();
  const visitados = new Set();
  const cola = new Map();

  for (const key of graph.keys()) {
    distancias.set(key, Infinity);
    previos.set(key, null);
  }
  distancias.set(startId, 0);
  cola.set(startId, 0);

  while (cola.size > 0) {
    const [nodoActual] = [...cola.entries()].reduce((a, b) =>
      a[1] < b[1] ? a : b
    );
    cola.delete(nodoActual);
    visitados.add(nodoActual);

    if (nodoActual === endId) break;

    for (const vecino of graph.get(nodoActual) || []) {
      if (visitados.has(vecino.destino)) continue;

      const nuevaDistancia = distancias.get(nodoActual) + vecino.distancia;

      if (nuevaDistancia < distancias.get(vecino.destino)) {
        distancias.set(vecino.destino, nuevaDistancia);
        previos.set(vecino.destino, nodoActual);
        cola.set(vecino.destino, nuevaDistancia);
      }
    }
  }

  // Reconstrucción de la ruta
  let ruta = [];
  for (let at = endId; at !== null; at = previos.get(at)) {
    ruta.push(at);
  }
  ruta.reverse();

  return { ruta, distanciaTotal: distancias.get(endId) };
};
