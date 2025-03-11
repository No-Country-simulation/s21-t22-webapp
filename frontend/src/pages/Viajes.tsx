import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
    setSalida,
    setLlegada,
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
    duracion: string,
    salida: string,
    llegada: string
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
    setSalida(salida);
    setLlegada(llegada);
  };

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
                imageOrigin={trip.stops[0].imgUrl}
                imageDestination={trip.stops[1].imgUrl}
                company={trip.trip.bus.company}
                origin={trip.stops[0].name}
                destination={trip.stops[1].name}
                date={trip.fecha} // Pasa la fecha
                price={trip.precio} // Pasa el precio
                busType={trip.trip.seatType}
                duration={""} // Pasa la duración (o usa un valor real si está disponible)
                salida={trip.salida} // Pasa la hora de salida
                llegada={trip.llegada} // Pasa la hora de llegada
                seatsAvailable={5} // Pasa el número de asientos disponibles
                rating={4.5} // Pasa la calificación
                direct={false} // Pasa si es directo o no
                onClick={() => {
                  crearContextTrip(
                    trip.stops[0].imgUrl,
                    trip.stops[1].imgUrl,
                    trip.trip.bus.company,
                    trip.stops[0].name,
                    trip.stops[1].name,
                    trip.fecha,
                    trip.precio,
                    trip.trip.seatType,
                    "", // Pasa la duración (o usa un valor real si está disponible)
                    trip.salida,
                    trip.llegada
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
