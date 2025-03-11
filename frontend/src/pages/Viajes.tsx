import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/common/MainLayout";
import TravelSearchCard, {
  TravelSearchCardProps,
} from "../components/travels/TravelSearchCard";
import type { TravelData } from "../components/test/HeroDinamic";
import useStore from "../contexts/store";
import HeroDinamic from "../components/test/HeroDinamic";
import { Box, Typography } from "@mui/material";
import EventBusyIcon from "@mui/icons-material/EventBusy";

// Función para formatear salida y llegada (definida en el mismo archivo)
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
// Función para formatear fecha
const formatFecha = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const Viajes = () => {
  const [searchParams] = useSearchParams();
  const [travelInfo, setTravelInfo] = useState<TravelSearchCardProps[]>([]);
  // const [error, setError] = useState(false);
  const { viajes, ViajesNoEncontrados } = useStore();

  const navigate = useNavigate();

  const {
    setOrigen,
    setDestino,
    setOrigenImg,
    setDestinoImg,
    setCompañia,
    setPrecio,
    setBus,
    setFecha,
    setDuracion,
    setSalida,
    setLlegada,
    setId,
    setOrigenId,
    setDestinoId,
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
    precio: string,
    bus: string,
    fecha: string,
    duracion: string,
    salida: string,
    llegada: string,
    id: string,
    origenId: string,
    destinoId: string
  ) => {
    setOrigen(origen);
    setDestino(destino);
    setOrigenImg(origenImg);
    setDestinoImg(destinoImg);
    setCompañia(compañia);
    setPrecio(precio);
    setBus(bus);
    setFecha(fecha);
    setDuracion(duracion);
    setSalida(salida);
    setLlegada(llegada);
    setId(id);
    setOrigenId(origenId);
    setDestinoId(destinoId);
  };

  const travelData: TravelData = {
    origin: origenId,
    destination: destinoId,
    date: fecha ? new Date(fecha) : null,
  };

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HeroDinamic travelData={travelData} />
        {ViajesNoEncontrados ? (
          <Typography
            variant="h5"
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            No hay viajes disponibles para esa fecha{" "}
            <EventBusyIcon sx={{ color: "#641c34" }} />
          </Typography>
        ) : (
          <>
            {viajes.map((trip) => {
              // Formatea las fechas de salida y llegada
              const salidaFormateada = formatDate(trip.trip.departureDate);
              const llegadaFormateada = formatDate(trip.trip.arrivalDate);
              const fecha = formatFecha(trip.trip.departureDate);

              return (
                <TravelSearchCard
                  key={trip.trip._id}
                  imageOrigin={trip.stops[0].imgUrl}
                  imageDestination={trip.stops[1].imgUrl}
                  company={trip.trip.bus.company}
                  origin={trip.stops[0].name}
                  destination={trip.stops[1].name}
                  date={fecha}
                  price={trip.precio}
                  busType={trip.trip.seatType}
                  duration={""}
                  salida={salidaFormateada}
                  llegada={llegadaFormateada}
                  seatsAvailable={5}
                  rating={4.5}
                  direct={false}
                  onClick={() => {
                    crearContextTrip(
                      trip.stops[0].imgUrl,
                      trip.stops[1].imgUrl,
                      trip.trip.bus.company,
                      trip.stops[0].name,
                      trip.stops[1].name,
                      trip.precio,
                      trip.trip.seatType,
                      fecha,
                      "",
                      salidaFormateada,
                      llegadaFormateada,
                      trip.trip._id,
                      trip.stops[0]._id,
                      trip.stops[1]._id
                    );
                    navigate("/reserva");
                  }}
                />
              );
            })}
          </>
        )}
      </Box>
    </MainLayout>
  );
};

export default Viajes;
