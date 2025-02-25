import React from "react";
import useAuthStore from "../stores/authStore";

const Profile: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div>
      {user ? (
        <div>
          <h2>Perfil de {user.name}</h2>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
};

export default Profile;
