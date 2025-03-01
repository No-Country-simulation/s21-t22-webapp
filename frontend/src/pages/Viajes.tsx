import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Grafo } from "../utils/test/algoritmoGrafos";
import { dijkstra } from "../utils/test/dijkstra";
import MainLayout from "../components/common/MainLayout";
import TravelSearchCard, {
  TravelSearchCardProps,
} from "../components/travels/TravelSearchCard";
import Hero from "../components/home/Hero";
import useStore from "../contexts/store";

// Define el tipo TravelType
interface TravelType {
  id: number;
  origin: string;
  destination: string;
  date: string; // Cambiado a string
  description: string;
  imageUrl: string; // URL de la imagen
}

const Viajes = () => {
  const [searchParams] = useSearchParams();
  const [travelInfo, setTravelInfo] = useState<TravelSearchCardProps[]>([]);
  const [error, setError] = useState(false);

  const origenId = searchParams.get("origenId");
  const destinoId = searchParams.get("destinoId");
  const fecha = searchParams.get("fecha");

  console.log("Params:", { origenId, destinoId, fecha });
  console.log("Params:", { origenId, destinoId, fecha });

  useEffect(() => {
    const grafo = new Grafo();

    // Agregar ciudades
    grafo.agregarNodo("Arequipa");
    grafo.agregarNodo("Camaná");
    grafo.agregarNodo("Nazca");
    grafo.agregarNodo("Ica");
    grafo.agregarNodo("Lima");
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

    // Encontrar la mejor ruta desde Arequipa a Lima
    const ruta = dijkstra(grafo, "Nazca", "Lima");
    console.log("Ruta más corta:", ruta);
  });

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const response = await fetch("https://api.example.com/viajes");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setTravelInfo(data);
      } catch (error) {
        console.error("Fetch error:", error);
        // Usar información inventada por defecto
        setTravelInfo([
          {
            id: 1,
            origin: "Buenos Aires",
            destination: "Entre Rios",
            date: "2025-02-23",
            description: "Un viaje relajante a la naturaleza.",
            imageUrl:
              "https://img.static-kl.com/images/media/EDD567B6-661E-481F-97ACD929AB125ABA",
          },
          {
            id: 2,
            origin: "Córdoba",
            destination: "Mendoza",
            date: "2025-03-10",
            description: "Disfruta de la mejor gastronomía y vino.",
            imageUrl:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1",
          },
          {
            id: 2,
            origin: "Córdoba",
            destination: "Mendoza",
            date: "2025-03-10",
            description: "Disfruta de la mejor gastronomía y vino.",
            imageUrl:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1",
          },
          {
            id: 2,
            origin: "Córdoba",
            destination: "Mendoza",
            date: "2025-03-10",
            description: "Disfruta de la mejor gastronomía y vino.",
            imageUrl:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1",
          },
          {
            id: 2,
            origin: "Córdoba",
            destination: "Mendoza",
            date: "2025-03-10",
            description: "Disfruta de la mejor gastronomía y vino.",
            imageUrl:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1",
          },
          {
            id: 2,
            origin: "Córdoba",
            destination: "Mendoza",
            date: "2025-03-10",
            description: "Disfruta de la mejor gastronomía y vino.",
            imageUrl:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1",
          },
          {
            id: 2,
            origin: "Córdoba",
            destination: "Mendoza",
            date: "2025-03-10",
            description: "Disfruta de la mejor gastronomía y vino.",
            imageUrl:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1",
          },
        ]);
        setError(true);
      }
    };

    fetchTravelData();
  }, []);

  return (
    <MainLayout>
      <>
        {/* OJO ACÁ QUE HAY QUE TRABAJAR BASTANTE ESE "HeroDinamic" */}
        <Hero from={origenId!} to={destinoId!} tripDate={fecha!} />
        {/*
                    <h1>Detalles del Viaje</h1>
                    <p>Origen ID: {origenId ?? "No especificado"}</p>
                    <p>Destino ID: {destinoId ?? "No especificado"}</p>
                    <p>Fecha: {fecha ?? "No especificada"}</p>
                    */}
        {error ? (
          <>
            <TravelSearchCard
              imageOrigin="https://media.istockphoto.com/id/667138246/es/foto/argentina-buenos-aires-amanecer-en-el-centro-con-hora-punta.jpg?s=612x612&w=0&k=20&c=tpvOrY5aqJBBaqb5X27WjlhDsUB0GHJWc1GRD5Z5icQ="
              imageDestination="https://content.r9cdn.net/rimg/dimg/f8/29/792a1090-city-10439-169073685b0.jpg?crop=true&width=1020&height=498"
              company="Empresa Ejemplo"
              origin="Buenos Aires"
              destination="Córdoba"
              date="2025-03-10"
              price="50.00"
              busType="Normal"
              duration="6h 30m"
              seatsAvailable={5}
              rating={4.5}
              direct={false}
              onClick={() => console.log("CLICK")}
            />
            <TravelSearchCard
              imageOrigin="https://media.istockphoto.com/id/667138246/es/foto/argentina-buenos-aires-amanecer-en-el-centro-con-hora-punta.jpg?s=612x612&w=0&k=20&c=tpvOrY5aqJBBaqb5X27WjlhDsUB0GHJWc1GRD5Z5icQ="
              imageDestination="https://content.r9cdn.net/rimg/dimg/f8/29/792a1090-city-10439-169073685b0.jpg?crop=true&width=1020&height=498"
              company="Empresa Ejemplo"
              origin="Buenos Aires"
              destination="Córdoba"
              date="2025-03-10"
              price="50.00"
              busType="Normal"
              duration="6h 30m"
              seatsAvailable={5}
              rating={4.5}
              direct={false}
              onClick={() => console.log("CLICK")}
            />
            <TravelSearchCard
              imageOrigin="https://media.istockphoto.com/id/667138246/es/foto/argentina-buenos-aires-amanecer-en-el-centro-con-hora-punta.jpg?s=612x612&w=0&k=20&c=tpvOrY5aqJBBaqb5X27WjlhDsUB0GHJWc1GRD5Z5icQ="
              imageDestination="https://content.r9cdn.net/rimg/dimg/f8/29/792a1090-city-10439-169073685b0.jpg?crop=true&width=1020&height=498"
              company="Empresa Ejemplo"
              origin="Buenos Aires"
              destination="Córdoba"
              date="2025-03-10"
              price="50.00"
              busType="Cama"
              duration="6h 30m"
              seatsAvailable={5}
              rating={4.5}
              direct={false}
              onClick={() => console.log("CLICK")}
            />
            <TravelSearchCard
              imageOrigin="https://media.istockphoto.com/id/667138246/es/foto/argentina-buenos-aires-amanecer-en-el-centro-con-hora-punta.jpg?s=612x612&w=0&k=20&c=tpvOrY5aqJBBaqb5X27WjlhDsUB0GHJWc1GRD5Z5icQ="
              imageDestination="https://content.r9cdn.net/rimg/dimg/f8/29/792a1090-city-10439-169073685b0.jpg?crop=true&width=1020&height=498"
              company="Empresa Ejemplo"
              origin="Buenos Aires"
              destination="Córdoba"
              date="2025-03-10"
              price="50.00"
              busType="Semicama"
              duration="6h 30m"
              seatsAvailable={5}
              rating={4.5}
              direct={false}
              onClick={() => console.log("CLICK")}
            />
          </>
        ) : (
          <div>Error al obtener viajes: {error}</div>
        )}
      </>
    </MainLayout>
  );
};

export default Viajes;
