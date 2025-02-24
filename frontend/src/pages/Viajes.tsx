import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../components/common/Navbar";
import HeroDinamic from "../components/test/HeroDinamic";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Grafo } from "../utils/test/algoritmoGrafos";
import { dijkstra } from "../utils/test/dijkstra";
import MainLayout from '../components/common/MainLayout';

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
    const [travelInfo, setTravelInfo] = useState<TravelType[]>([]);
    const [error, setError] = useState(false);

    const origenId = searchParams.get("origenId");
    const destinoId = searchParams.get("destinoId");
    const fecha = searchParams.get("fecha");

    console.log("Params:", { origenId, destinoId, fecha });

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
                    { id: 1, origin: "Buenos Aires", destination: "Entre Rios", date: "2025-02-23", description: "Un viaje relajante a la naturaleza.", imageUrl: "https://img.static-kl.com/images/media/EDD567B6-661E-481F-97ACD929AB125ABA" },
                    { id: 2, origin: "Córdoba", destination: "Mendoza", date: "2025-03-10", description: "Disfruta de la mejor gastronomía y vino.", imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1" },
                    { id: 2, origin: "Córdoba", destination: "Mendoza", date: "2025-03-10", description: "Disfruta de la mejor gastronomía y vino.", imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1" }, { id: 2, origin: "Córdoba", destination: "Mendoza", date: "2025-03-10", description: "Disfruta de la mejor gastronomía y vino.", imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1" }, { id: 2, origin: "Córdoba", destination: "Mendoza", date: "2025-03-10", description: "Disfruta de la mejor gastronomía y vino.", imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1" }, { id: 2, origin: "Córdoba", destination: "Mendoza", date: "2025-03-10", description: "Disfruta de la mejor gastronomía y vino.", imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1" }, { id: 2, origin: "Córdoba", destination: "Mendoza", date: "2025-03-10", description: "Disfruta de la mejor gastronomía y vino.", imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3c/2b/f1/p1090956-1-largejpg.jpg?w=1200&h=700&s=1" },
                ]);
                setError(true);
            }
        };

        fetchTravelData();
    }, []);


    return (
        <MainLayout >
            <>
                <HeroDinamic travelData={{ origin: origenId ?? "Buenos Aires", destination: destinoId ?? "Entre Rios", date: new Date(fecha ?? "") }} />
                {
                    /*
                    <h1>Detalles del Viaje</h1>
                    <p>Origen ID: {origenId ?? "No especificado"}</p>
                    <p>Destino ID: {destinoId ?? "No especificado"}</p>
                    <p>Fecha: {fecha ?? "No especificada"}</p>
                    */
                }
                <Grid container spacing={2}>
                    {travelInfo.map((travel) => (
                        <Grid item xs={12} sm={6} md={4} key={travel.id}>
                            <Box
                                sx={{
                                    margin: "10px",
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    padding: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#f9f9f9',
                                    width: "82%",
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                    }
                                }}
                            >
                                <img
                                    src={travel.imageUrl}
                                    alt={`${travel.origin} a ${travel.destination}`}
                                    style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                                />
                                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                                    {travel.origin} a {travel.destination}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Fecha: {travel.date}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {travel.description}
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth>
                                    Reservar
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </>

        </MainLayout >
    );
};

export default Viajes;
