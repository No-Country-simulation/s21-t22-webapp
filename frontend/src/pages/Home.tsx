import {
  AirlineSeatReclineExtra,
  DirectionsBus,
  LocationOn,
  Schedule,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { DestinationCard } from '../components/home/DestinationCard';
import { ExperienceCard } from '../components/home/ExperienceCard';
import { FeaturedCard } from '../components/home/FeaturedCard';
import { nanoid } from 'nanoid';
import { SpecialOffer } from '../components/home/SpecialOffer';
import Hero from '../components/home/Hero';
import MainLayout from '../components/common/MainLayout';

const features = [
  {
    icon: <DirectionsBus />,
    title: "Flota Moderna",
    description: "Autobuses último modelo con máxima comodidad",
  },
  {
    icon: <AirlineSeatReclineExtra />,
    title: "Asientos Reclinables",
    description: "Espaciosos asientos con amplio espacio para piernas",
  },
  {
    icon: <LocationOn />,
    title: "Múltiples Destinos",
    description: "Conexiones a más de 50 ciudades del país",
  },
  {
    icon: <Schedule />,
    title: "Salidas Frecuentes",
    description: "Horarios convenientes durante todo el día",
  },
];

const destinations = [
  {
    title: "Bs. As. - Mendoza",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTtBfEcT9UuJXGKVlQhW97QHGe1Z0Ih1Vng&s",
    price: "$150.000",
    duration: "12h 30min",
    rating: 4.8,
    nextDeparture: "08:30",
    amenities: ["wifi", "power", "ac"],
  },
  {
    title: "Córdoba - Rosario",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQDf22Rl3oLQMMff4VxCK3CPAGeaCIXMVcHQ&s",
    price: "$55.000",
    duration: "4h 15min",
    rating: 4.7,
    nextDeparture: "09:00",
    amenities: ["wifi", "power", "ac"],
  },
  {
    title: "Bs. As. - Mar del Plata",
    image: "https://www.rionegro.com.ar/wp-content/uploads/2024/10/mardel1.jpg",
    price: "$65.000",
    duration: "6h 45min",
    rating: 4.6,
    nextDeparture: "07:45",
    amenities: ["wifi", "power", "ac"],
  },
];

const experiences = [
  {
    name: "Laura Martínez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    route: "Madrid - Barcelona",
    comment:
      "Viaje muy cómodo. El bus salió puntual y el conductor fue muy profesional. Los asientos son espaciosos y el WiFi funcionó perfectamente durante todo el trayecto.",
    rating: 5,
  },
  {
    name: "David Sánchez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    route: "Barcelona - Valencia",
    comment:
      "Excelente servicio, el autobús estaba muy limpio y el aire acondicionado funcionaba perfectamente. Llegamos incluso antes de lo previsto.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <MainLayout>
      <>
        <Hero />
        {/* Destacados */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {features.map((feature) => (
              <FeaturedCard feature={feature} key={nanoid()} />
            ))}
          </Grid>
        </Container>

        {/* Rutas Populares */}
        <Box sx={{ bgcolor: "grey.50", py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Rutas Populares
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary">
              Descubre nuestras rutas más solicitadas con salidas diarias
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {destinations.map((destination) => (
                <DestinationCard destination={destination} key={nanoid()} />
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Oferta Especial */}
        <SpecialOffer />

        {/* Experiencias */}
        <Box sx={{ bgcolor: "grey.50", py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Experiencias de Viajeros
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
              Lo que dicen nuestros pasajeros sobre sus viajes
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {experiences.map((experience) => (
                <ExperienceCard experience={experience} key={nanoid()} />
              ))}
            </Grid>
          </Container>
        </Box>
      </>
    </MainLayout>
  );
}

