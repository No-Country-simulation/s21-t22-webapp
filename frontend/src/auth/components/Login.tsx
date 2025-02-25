import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular una autenticación exitosa
    if (username === "admin" && password === "1234") {
      login({ name: username }); // Guardar el usuario en el store
      alert("Inicio de sesión exitoso");
      navigate("/viajes");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    // LUEGO ADAPTAMOS EL FORMULARIO A REACT HOOK FORM!!
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
