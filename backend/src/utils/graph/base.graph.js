export class Grafo {
  constructor() {
    this.nodos = new Map();
  }

  agregarNodo(ciudad) {
    if (!this.nodos.has(ciudad)) {
      this.nodos.set(ciudad, []);
    }
  }

  agregarArista(origen, destino, distancia, tiempo) {
    if (!this.nodos.has(origen) || !this.nodos.has(destino)) {
      throw new Error(
        `Las ciudades ${origen} o ${destino} no están registradas`
      );
    }
    this.nodos.get(origen).push({ destino, distancia, tiempo });
    this.nodos.get(destino).push({ destino: origen, distancia, tiempo }); // Si es bidireccional
  }

  obtenerConexiones(ciudad) {
    return this.nodos.get(ciudad) || [];
  }

  obtenerCiudades() {
    return Array.from(this.nodos.keys());
  }
}
