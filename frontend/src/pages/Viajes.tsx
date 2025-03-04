import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import { Box, Typography, Grid, Button } from "@mui/material";
import { Grafo } from "../utils/test/algoritmoGrafos";
import { dijkstra } from "../utils/test/dijkstra";
import MainLayout from "../components/common/MainLayout";
import TravelSearchCard, {
  TravelSearchCardProps,
} from "../components/travels/TravelSearchCard";
import Hero from "../components/home/Hero";
import useStore from "../contexts/store";

// Define el tipo TripSimulation
interface TripSimulation {
  origenImg: string;
  destinoImg: string;
  compañia: string;
  origen: string;
  destino: string;
  fecha: string;
  precio: string;
  bus: string;
  duracion: string;
}

const Viajes = () => {
  const [searchParams] = useSearchParams();
  const [travelInfo, setTravelInfo] = useState<TravelSearchCardProps[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Hook para navegar

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

  console.log("Params:", { origenId, destinoId, fecha });

  // Inicialización del grafo
  useEffect(() => {
    const grafo = new Grafo();

    // Agregar ciudades
    grafo.agregarNodo("Arequipa");
    grafo.agregarNodo("Camaná");
    grafo.agregarNodo("Nazca");
    grafo.agregarNodo("Ica");
    grafo.agregarNodo("Lima");

    // Agregar rutas entre ciudades
    grafo.agregarArista("Arequipa", "Camaná", 180, 120);
    grafo.agregarArista("Camaná", "Nazca", 400, 300);
    grafo.agregarArista("Nazca", "Ica", 150, 120);
    grafo.agregarArista("Ica", "Lima", 300, 240);

    // Encontrar la mejor ruta desde Nazca a Lima
    const ruta = dijkstra(grafo, "Nazca", "Lima");
    console.log("Ruta más corta:", ruta);
  }, []);

  // Fetch de datos de viajes
  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const response = await fetch("https://api.example.com/viajes");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setTravelInfo(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(true);
      }
    };

    fetchTravelData();
  }, []);

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

  // Datos simulados de viajes
  const apiTripsSimulation: TripSimulation[] = [
    {
      origenImg:
        "https://media.istockphoto.com/id/667138246/es/foto/argentina-buenos-aires-amanecer-en-el-centro-con-hora-punta.jpg?s=612x612&w=0&k=20&c=tpvOrY5aqJBBaqb5X27WjlhDsUB0GHJWc1GRD5Z5icQ=",
      destinoImg:
        "https://content.r9cdn.net/rimg/dimg/f8/29/792a1090-city-10439-169073685b0.jpg?crop=true&width=1020&height=498",
      compañia: "Tour Bus",
      origen: "Buenos Aires",
      destino: "Córdoba",
      fecha: "2025-03-10",
      precio: "50.00",
      bus: "Semicama",
      duracion: "6h 30m",
    },
    {
      origenImg:
        "https://media.istockphoto.com/id/667138246/es/foto/argentina-buenos-aires-amanecer-en-el-centro-con-hora-punta.jpg?s=612x612&w=0&k=20&c=tpvOrY5aqJBBaqb5X27WjlhDsUB0GHJWc1GRD5Z5icQ=",
      destinoImg:
        "https://content.r9cdn.net/rimg/dimg/f8/29/792a1090-city-10439-169073685b0.jpg?crop=true&width=1020&height=498",
      compañia: "Tour Bus",
      origen: "Buenos Aires",
      destino: "Córdoba",
      fecha: "2025-03-10",
      precio: "50.00",
      bus: "Semicama",
      duracion: "6h 30m",
    },
  ];

  return (
    <MainLayout>
      <>
        <Hero from={origenId!} to={destinoId!} tripDate={fecha!} />
        {error ? (
          <>
            {apiTripsSimulation.map((trip, index) => (
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
        ) : (
          <div>Error al obtener viajes. Mostrando datos simulados...</div>
        )}
      </>
    </MainLayout>
  );
};

export default Viajes;
