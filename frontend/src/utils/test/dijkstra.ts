import { Grafo } from "./algoritmoGrafos";

export function dijkstra(grafo: Grafo, inicio: string, fin: string, criterio: "distancia" | "tiempo" = "distancia"): string[] {
    const distancias: Map<string, number> = new Map();
    const previos: Map<string, string | null> = new Map();
    const visitados: Set<string> = new Set();
    const cola: Map<string, number> = new Map();

    // Inicializar distancias con infinito
    for (const ciudad of grafo.obtenerCiudades()) {
        distancias.set(ciudad, Infinity);
        previos.set(ciudad, null);
    }
    distancias.set(inicio, 0);
    cola.set(inicio, 0);

    while (cola.size > 0) {
        const [nodoActual] = [...cola.entries()].reduce((a, b) => (a[1] < b[1] ? a : b));
        cola.delete(nodoActual);
        visitados.add(nodoActual);

        if (nodoActual === fin) break;

        for (const vecino of grafo.obtenerConexiones(nodoActual)) {
            if (visitados.has(vecino.destino)) continue;

            const peso = criterio === "distancia" ? vecino.distancia : vecino.tiempo;
            const nuevaDistancia = (distancias.get(nodoActual) ?? Infinity) + peso;

            if (nuevaDistancia < (distancias.get(vecino.destino) ?? Infinity)) {
                distancias.set(vecino.destino, nuevaDistancia);
                previos.set(vecino.destino, nodoActual);
                cola.set(vecino.destino, nuevaDistancia);
            }
        }
    }

    // Reconstruir la ruta
    let ruta: string[] = [];
    for (let at: string | null = fin; at !== null; at = previos.get(at) || null) {
        ruta.push(at);
    }
    return ruta.reverse();
}
