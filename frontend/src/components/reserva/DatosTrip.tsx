import { useForm, SubmitHandler } from "react-hook-form";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VerifiedIcon from "@mui/icons-material/Verified";
import useStore from "../../contexts/store";
import { useNavigate } from "react-router-dom";
import "./DatosTrip.css";

// Interfaz para el formulario
interface IFormInput {
  nombre: string;
  apellido: string;
  correo: string;
}

// Interfaz para el objeto detalles
interface DetallesReserva {
  origen: string;
  destino: string;
  fecha: string;
  pasajero: string;
  asiento: string[];
  clase: string;
  agencia: string;
  salida: string;
  llegada: string;
  correo: string;
  duracion: string;
  precio: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-content",
  bgcolor: "background.paper",
  borderRadius: "10px",
  p: 4,
};

export default function DatosTrip() {
  const navigate = useNavigate();
  const [detalles, setDetalles] = React.useState<DetallesReserva | null>(null); // Tipar el estado
  const [open, setOpen] = React.useState(false); // Estado para controlar el modal
  const handleOpen = () => setOpen(true); // Función para abrir el modal
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  // Obtén los datos del store
  const {
    origen,
    destino,
    fecha,
    bus,
    compañia,
    salida,
    llegada,
    duracion,
    precio,
    asientos,
  } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // extraemos asientos del array
    const asientosSeleccionados = asientos.map((numero: number) =>
      numero.toString()
    );

    // Crear el objeto detalles
    const detallesObj: DetallesReserva = {
      origen,
      destino,
      fecha,
      pasajero: `${data.nombre} ${data.apellido}`,
      asiento: asientosSeleccionados,
      clase: bus || "semicama", // Asigna un valor por defecto si no está definido
      agencia: compañia || "Desconocida", // Asigna un valor por defecto si no está definido
      salida: salida || "00:00", // Asigna un valor por defecto si no está definido
      llegada: llegada || "00:00", // Asigna un valor por defecto si no está definido
      correo: `${data.correo}`,
      duracion,
      precio,
    };

    // Actualizar el estado
    setDetalles(detallesObj);

    // Abrir el modal directamente
    handleOpen();

    console.log("Detalles de la reserva:", detallesObj);
  };

  return (
    <>
      <form className="formulario-reserva" onSubmit={handleSubmit(onSubmit)}>
        {/* Campo Nombre */}
        <input
          {...register("nombre", { required: "El nombre es requerido" })}
          placeholder="Nombre"
        />
        {errors.nombre && (
          <span className="error">{errors.nombre.message}</span>
        )}

        {/* Campo Apellido */}
        <input
          {...register("apellido", { required: "El apellido es requerido" })}
          placeholder="Apellido"
        />
        {errors.apellido && (
          <span className="error">{errors.apellido.message}</span>
        )}

        {/* Campo Correo */}
        <input
          {...register("correo", {
            required: "El correo es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico no válido",
            },
          })}
          placeholder="Correo"
          type="email"
        />
        {errors.correo && (
          <span className="error">{errors.correo.message}</span>
        )}

        {/* Botón de envío */}
        <Button type="submit">Confirmar reserva</Button>
      </form>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h3"
            sx={{
              color: "green",
              display: "flex",
              alignItems: "center",
            }}
          >
            Reserva exitosa
            <VerifiedIcon sx={{ color: "green", m: 2 }} />
          </Typography>
          <Typography id="modal-modal-title" variant="h6">
            Detalles de la Reserva
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, p: 5 }}>
            {detalles ? (
              <ul>
                <li>Pasajero: {detalles.pasajero}</li>
                <li>Origen: {detalles.origen}</li>
                <li>Destino: {detalles.destino}</li>
                <li>Fecha: {detalles.fecha}</li>
                <li>Salida: {detalles.salida}</li>
                <li>Llegada: {detalles.llegada}</li>
                <li>Asientos: {detalles.asiento.join(", ")}</li>
                <li>Clase: {detalles.clase}</li>
                <li>Agencia: {detalles.agencia}</li>
                <li>Duracion estimada: {detalles.duracion}</li>
                <li>
                  Precio: <strong>{detalles.precio}</strong>
                </li>
              </ul>
            ) : (
              "No hay detalles disponibles."
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={() => handleClose()}>Cerrar</Button>
            <Box>
              <Button
                onClick={() => handleClose()}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                Enviar comprobante
              </Button>
              (&nbsp;{detalles?.correo}&nbsp;)
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
