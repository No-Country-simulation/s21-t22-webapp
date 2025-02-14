import { useEffect, useState } from "react";
import { SOCKET } from './socket/socket-connection';
import { getRequest } from './services/http-requests';

function App() {
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState<string[]>([]);

  // Funcion para emitir un evento socket "mensaje" que será escuchado en el servidor
  const enviarMensaje = () => {
    SOCKET.emit("mensaje", mensaje);
    setMensaje("");
  };

  // Escuchar el evento socket "respuesta" emitido por el servidor
  useEffect(() => {
    SOCKET.on("respuesta", (data) => {
      setMensajes((prev) => [...prev, data]);
    });
    return () => {
      SOCKET.off("respuesta"); //  Evitar múltiples suscripciones
    };
  }, []);

  // Hace una petición HTTP GET a "/api/"
  useEffect(() => {
    getRequest('/')
      .then(data => setRespuesta(data as string));
  }, []);


  return (
    <><div>
      <h3>Respuesta al hacer fetch a la raíz del backend:</h3>
      <pre>{JSON.stringify(respuesta)}</pre>
    </div>
      <div>
        <h3>Probar Conexión Socket:</h3>
        <form onSubmit={(e) => { e.preventDefault(); enviarMensaje(); }}>
          <input value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
          <button type="submit">Enviar</button>
        </form>
        <ul>
          {mensajes.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
