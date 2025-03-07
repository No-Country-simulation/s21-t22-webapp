import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import MainLayout from "../components/common/MainLayout";
import TravelSearchCard, {
  TravelSearchCardProps,
} from "../components/travels/TravelSearchCard";
import type { TravelData } from "../components/test/HeroDinamic";
import useStore from "../contexts/store";
import HeroDinamic from "../components/test/HeroDinamic";

const Viajes = () => {
  const [searchParams] = useSearchParams();
  const [travelInfo, setTravelInfo] = useState<TravelSearchCardProps[]>([]);
  const [error, setError] = useState(false);
  const { viajes } = useStore();

  const navigate = useNavigate();

  const {
    setOrigen,
    setDestino,
    setFecha,
    setOrigenImg,
    setDestinoImg,
    setCompañia,
    setPrecio,
    setBus,
    setDuracion,
  } = useStore();

  const origenId = searchParams.get("origenId");
  const destinoId = searchParams.get("destinoId");
  const fecha = searchParams.get("fecha");

  // Función para crear el contexto del viaje
  const crearContextTrip = (
    origenImg: string,
    destinoImg: string,
    compañia: string,
    origen: string,
    destino: string,
    fecha: string,
    precio: string,
    bus: string,
    duracion: string
  ) => {
    setOrigen(origen);
    setDestino(destino);
    setFecha(fecha);
    setOrigenImg(origenImg);
    setDestinoImg(destinoImg);
    setCompañia(compañia);
    setPrecio(precio);
    setBus(bus);
    setDuracion(duracion);
  };
  console.log(travelInfo);
  // Datos simulados de viajes

  const travelData: TravelData = {
    origin: origenId,
    destination: destinoId,
    date: fecha ? new Date(fecha) : null,
  };

  return (
    <MainLayout>
      <>
        <HeroDinamic travelData={travelData} />
        {error ? (
          <div>Error al obtener viajes. Mostrando datos simulados...</div>
        ) : (
          <>
            {viajes.map((trip, index) => (
              <TravelSearchCard
                key={index}
                imageOrigin={trip.origenImg}
                imageDestination={trip.destinoImg}
                company={trip.compañia}
                origin={trip.origen}
                destination={trip.destino}
                date={trip.fecha}
                price={trip.precio}
                busType={trip.bus}
                duration={trip.duracion}
                seatsAvailable={5}
                rating={4.5}
                direct={false}
                onClick={() => {
                  crearContextTrip(
                    trip.origenImg,
                    trip.destinoImg,
                    trip.compañia,
                    trip.origen,
                    trip.destino,
                    trip.fecha,
                    trip.precio,
                    trip.bus,
                    trip.duracion
                  );
                  navigate("/reserva");
                }}
              />
            ))}
          </>
        )}
      </>
    </MainLayout>
  );
};

export default Viajes;
