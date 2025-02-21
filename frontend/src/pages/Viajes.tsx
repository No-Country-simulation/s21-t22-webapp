import { useSearchParams } from "react-router-dom";
import NavBar from "../components/common/Navbar";
import HeroDinamic from "../components/test/HeroDinamic";

const Viajes = () => {
    const [searchParams] = useSearchParams();

    const origenId = searchParams.get("origenId");
    const destinoId = searchParams.get("destinoId");
    const fecha = searchParams.get("fecha");

    console.log("Params:", { origenId, destinoId, fecha });

    return (
        <div>
            <NavBar />
            <HeroDinamic travelData={{ origin: origenId ?? "Buenos Aires", destination: destinoId ?? "Entre Rios", date: new Date(fecha ?? "") }} /> 
            <h1>Detalles del Viaje</h1>
            <p>Origen ID: {origenId ?? "No especificado"}</p>
            <p>Destino ID: {destinoId ?? "No especificado"}</p>
            <p>Fecha: {fecha ?? "No especificada"}</p>
        </div>
    );
};

export default Viajes;
