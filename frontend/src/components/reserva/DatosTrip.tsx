import { useForm, SubmitHandler } from "react-hook-form";
import "./DatosTrip.css";
import { Button } from "@mui/material";

interface IFormInput {
  nombre: string;
  apellido: string;
  correo: string;
}

export default function DatosTrip() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form className="formulario-reserva" onSubmit={handleSubmit(onSubmit)}>
      {/* Campo Nombre */}
      <input
        {...register("nombre", { required: "El nombre es requerido" })}
        placeholder="Nombre"
      />
      {errors.nombre && <span className="error">{errors.nombre.message}</span>}

      {/* Campo Apellido */}
      <input
        {...register("apellido", { required: "El apellido es requerido" })}
        placeholder="Apellido"
      />
      {errors.apellido && (
        <span className="error">{errors.apellido.message}</span>
      )}

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
      {errors.correo && <span className="error">{errors.correo.message}</span>}

      {/* Botón de envío */}
      <Button type="submit">Confirmar reserva</Button>
    </form>
  );
}
