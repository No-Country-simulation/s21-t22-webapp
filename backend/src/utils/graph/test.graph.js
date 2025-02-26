import { Grafo } from "./base.graph.js";
import { dijkstra } from "./dijkstra.graph.js";
import { distance } from "./distance.graph.js";

const lat1 = -34.603722,
  lon1 = -58.381592; // Buenos Aires
const lat2 = -32.94682,
  lon2 = -60.63932; // Rosario

const distancia = distance(lat1, lon1, lat2, lon2);
console.log(`📍 La distancia entre Buenos Aires y Rosario es: ${distancia} km`);

const grafo = new Grafo();

// Agregar nodos (ciudades)
grafo.agregarNodo("A");
grafo.agregarNodo("B");
grafo.agregarNodo("C");
grafo.agregarNodo("D");

// Agregar aristas (conexiones) con sus respectivos pesos
// (parámetro: origen, destino, distancia, tiempo)
grafo.agregarArista("A", "B", 1, 2);
grafo.agregarArista("A", "C", 4, 5);
grafo.agregarArista("B", "C", 2, 1);
grafo.agregarArista("B", "D", 7, 8);
grafo.agregarArista("C", "D", 1, 1);

// Calcular la ruta más corta desde "A" hasta "D" basándonos en la "distancia"
const ruta = dijkstra(grafo, "A", "D", "distancia");

console.log("La ruta más corta es:", ruta);
