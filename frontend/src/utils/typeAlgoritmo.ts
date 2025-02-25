export interface Conexion {
    destino: string;
    distancia: number;
    tiempo: number;
}

export interface Nodo {
    nombre: string;
    conexiones: Conexion[];
}


