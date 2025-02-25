import { Grafo } from "./base.graph.js";

export function dijkstra(grafo, inicio, fin, criterio = "distancia") {
  const distancias = new Map();
  const previos = new Map();
  const visitados = new Set();
  const cola = new Map();

  // Inicializar distancias con infinito
  for (const ciudad of grafo.obtenerCiudades()) {
    distancias.set(ciudad, Infinity);
    previos.set(ciudad, null);
  }
  distancias.set(inicio, 0);
  cola.set(inicio, 0);

  while (cola.size > 0) {
    const nodoActual = [...cola.entries()].reduce((a, b) =>
      a[1] < b[1] ? a : b
    )[0];
    cola.delete(nodoActual);
    visitados.add(nodoActual);

    if (nodoActual === fin) break;

    for (const vecino of grafo.obtenerConexiones(nodoActual)) {
      console.log(`Nodo ${nodoActual} tiene vecino:`, vecino);
      if (visitados.has(vecino.destino)) continue;

      const peso = criterio === "distancia" ? vecino.distancia : vecino.tiempo;
      const distanciaNodoActual =
        distancias.get(nodoActual) !== undefined
          ? distancias.get(nodoActual)
          : Infinity;
      const nuevaDistancia = distanciaNodoActual + peso;

      const distanciaVecino =
        distancias.get(vecino.destino) !== undefined
          ? distancias.get(vecino.destino)
          : Infinity;
      if (nuevaDistancia < distanciaVecino) {
        distancias.set(vecino.destino, nuevaDistancia);
        previos.set(vecino.destino, nodoActual);
        cola.set(vecino.destino, nuevaDistancia);
      }
    }
  }

  // Reconstruir la ruta
  let ruta = [];
  for (let at = fin; at !== null; at = previos.get(at) || null) {
    ruta.push(at);
  }
  console.log("Distancias:", Array.from(distancias.entries()));
  console.log("Predecesores:", Array.from(previos.entries()));
  return ruta.reverse();
}
