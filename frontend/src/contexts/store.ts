import { create } from "zustand";
interface Bus {
  company: string;
}
interface Trip {
  // duration: number;
  seatType: string;
  bus: Bus;
  departureDate: string;
  arrivalDate: string;
  _id: string;
}
interface Stop {
  imgUrl: string;
  name: string;
  _id: string;
}
interface Viaje {
  fecha: string;
  precio: string;
  trip: Trip;
  stops: Stop[];
  salida: string;
  llegada: string;
}
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
  salida: string;
  llegada: string;
  viajes: Viaje[];
  ViajesNoEncontrados: boolean;
  id: string;
  origenId: string;
  destinoId: string;
  setOrigen: (newOrigen: string) => void;
  setDestino: (newDestino: string) => void;
  setFecha: (newFecha: string) => void;
  setOrigenImg: (newOrigenImg: string) => void;
  setDestinoImg: (newDestinoImg: string) => void;
  setCompañia: (newCompañia: string) => void;
  setPrecio: (newPrecio: string) => void;
  setBus: (newBus: string) => void;
  setDuracion: (newDuracion: string) => void;
  setSalida: (newSalida: string) => void;
  setLlegada: (newLlegada: string) => void;
  setViajesNoEncontrados: (value: boolean) => void;
  setViajes: (newViajes: Viaje[]) => void;
  setId: (newId: string) => void;
  setOrigenId: (newOriginId: string) => void;
  setDestinoId: (newDestinoId: string) => void;
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
  salida: "",
  llegada: "",
  viajes: [],
  ViajesNoEncontrados: false,
  id: "",
  origenId: "",
  destinoId: "",
  setOrigen: (newOrigen) => set({ origen: newOrigen }),
  setDestino: (newDestino) => set({ destino: newDestino }),
  setFecha: (newFecha) => set({ fecha: newFecha }),
  setOrigenImg: (newOrigenImg) => set({ origenImg: newOrigenImg }),
  setDestinoImg: (newDestinoImg) => set({ destinoImg: newDestinoImg }),
  setCompañia: (newCompañia) => set({ compañia: newCompañia }),
  setPrecio: (newPrecio) => set({ precio: newPrecio }),
  setBus: (newBus) => set({ bus: newBus }),
  setDuracion: (newDuracion) => set({ duracion: newDuracion }),
  setSalida: (newSalida) => set({ salida: newSalida }),
  setLlegada: (newLlegada) => set({ llegada: newLlegada }),
  setViajes: (newViajes) => set({ viajes: newViajes }), // Función para actualizar el array
  setViajesNoEncontrados: (value) => set({ ViajesNoEncontrados: value }),
  setId: (newId) => set({ id: newId }),
  setOrigenId: (newOriginId) => set({ origenId: newOriginId }),
  setDestinoId: (newDestinoId) => set({ destinoId: newDestinoId }),
}));

export default useStore;
