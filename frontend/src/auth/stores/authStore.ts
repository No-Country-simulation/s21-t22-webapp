import { create } from "zustand";

interface AuthState {
  user: { name: string } | null;
  isAuthenticated: boolean;
  login: (userData: { name: string }) => void;
  logout: () => void;
}

// Store de autenticación
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  // Función para iniciar sesión
  login: (userData) => set({ user: userData, isAuthenticated: true }),

  // Función para cerrar sesión
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// agregar contextos hacia abajo
// .
// .
// .

export default useAuthStore;
