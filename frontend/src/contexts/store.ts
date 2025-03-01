import { create } from "zustand";

interface StoreState {
  origen: string;
  destino: string;
  fecha: string;
  descripcion: string;
  imagen: string;
  setOrigen: (newOrigen: string) => void;
  setDestino: (newDestino: string) => void;
  setFecha: (newFecha: string) => void;
  setDescripcion: (newDescripcion: string) => void;
  setImagen: (newImagen: string) => void;
}

const useStore = create<StoreState>((set) => ({
  origen: "",
  destino: "",
  fecha: "",
  descripcion: "",
  imagen: "",
  setOrigen: (newOrigen) => set({ origen: newOrigen }),
  setDestino: (newDestino) => set({ destino: newDestino }),
  setFecha: (newFecha) => set({ fecha: newFecha }),
  setDescripcion: (newDescripcion) => set({ descripcion: newDescripcion }),
  setImagen: (newImagen) => set({ imagen: newImagen }),
}));

export default useStore;
