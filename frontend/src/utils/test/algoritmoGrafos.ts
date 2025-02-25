import { Conexion } from "../typeAlgoritmo";

export class Grafo {
    private nodos: Map<string, Conexion[]>;

    constructor() {
        this.nodos = new Map();
    }

    agregarNodo(ciudad: string): void {
        if (!this.nodos.has(ciudad)) {
            this.nodos.set(ciudad, []);
        }
    }

    agregarArista(origen: string, destino: string, distancia: number, tiempo: number): void {
        if (!this.nodos.has(origen) || !this.nodos.has(destino)) {
            throw new Error(`Las ciudades ${origen} o ${destino} no están registradas`);
        }
        this.nodos.get(origen)?.push({ destino, distancia, tiempo });
        this.nodos.get(destino)?.push({ destino: origen, distancia, tiempo }); // Si es bidireccional
    }

    obtenerConexiones(ciudad: string): Conexion[] {
        return this.nodos.get(ciudad) || [];
    }

    obtenerCiudades(): string[] {
        return Array.from(this.nodos.keys());
    }
}
