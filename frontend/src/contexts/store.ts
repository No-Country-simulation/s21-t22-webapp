import { create } from "zustand";

interface StoreState {
  origenImg: string;
  destinoImg: string;
  compañia: string;
  origen: string;
  destino: string;
  fecha: string;
  precio: string;
  bus: string;
  duracion: string;
  setOrigen: (newOrigen: string) => void;
  setDestino: (newDestino: string) => void;
  setFecha: (newFecha: string) => void;
  setOrigenImg: (newOrigenImg: string) => void;
  setDestinoImg: (newDestinoImg: string) => void;
  setCompañia: (newCompañia: string) => void;
  setPrecio: (newPrecio: string) => void;
  setBus: (newBus: string) => void;
  setDuracion: (newDuracion: string) => void;
}

const useStore = create<StoreState>((set) => ({
  origenImg: "",
  destinoImg: "",
  compañia: "",
  origen: "",
  destino: "",
  fecha: "",
  precio: "",
  bus: "",
  duracion: "",
  setOrigen: (newOrigen) => set({ origen: newOrigen }),
  setDestino: (newDestino) => set({ destino: newDestino }),
  setFecha: (newFecha) => set({ fecha: newFecha }),
  setOrigenImg: (newOrigenImg) => set({ origenImg: newOrigenImg }),
  setDestinoImg: (newDestinoImg) => set({ destinoImg: newDestinoImg }),
  setCompañia: (newCompañia) => set({ compañia: newCompañia }),
  setPrecio: (newPrecio) => set({ precio: newPrecio }),
  setBus: (newBus) => set({ bus: newBus }),
  setDuracion: (newDuracion) => set({ duracion: newDuracion }),
}));

export default useStore;
