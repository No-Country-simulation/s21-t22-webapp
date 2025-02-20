import MainLayout from '../components/common/MainLayout';
import Hero from '../components/home/Hero';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import {
  DirectionsBus,
  AirlineSeatReclineExtra,
  Verified,
  WifiRounded,
  PowerSettingsNew,
  AcUnit,
  LocationOn,
  Schedule,
  EventSeat,
} from "@mui/icons-material";

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

export default function TravelHeroSearch() {
  return (
    <MainLayout>
      <>
        <Hero />
        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    textAlign: "center",
                    height: "100%",
                    backgroundColor: "transparent",
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: "primary.main", mb: 2, "& svg": { fontSize: 40 } }}>{feature.icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Popular Routes */}
        <Box sx={{ bgcolor: "grey.50", py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Rutas Populares
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
              Descubre nuestras rutas más solicitadas con salidas diarias
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {destinations.map((destination, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: "100%" }}>
                    <CardMedia component="img" height="200" image={destination.image} alt={destination.title} />
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6">{destination.title}</Typography>
                          <Chip label={`Desde ${destination.price}`} color="primary" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Schedule fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {destination.duration}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <EventSeat fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              Próxima salida: {destination.nextDeparture}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Chip size="small" icon={<WifiRounded />} label="WiFi" />
                          <Chip size="small" icon={<PowerSettingsNew />} label="Enchufes" />
                          <Chip size="small" icon={<AcUnit />} label="A/C" />
                        </Stack>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Rating value={destination.rating} precision={0.1} readOnly size="small" />
                            <Typography variant="body2" color="text.secondary">
                              {destination.rating}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Special Offer */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Card sx={{ position: "relative", overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="400"
              image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80"
              alt="Special offer"
              sx={{
                filter: "brightness(0.7)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                p: 4,
              }}
            >
              <Typography variant="h3" gutterBottom>
                Oferta Especial
              </Typography>
              <Typography variant="h4" gutterBottom>
                20% de descuento
              </Typography>
              <Typography variant="h6">En viajes de ida y vuelta reservados con anticipación</Typography>
            </Box>
          </Card>
        </Container>

        {/* Testimonials */}
        <Box sx={{ bgcolor: "grey.50", py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Experiencias de Viajeros
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
              Lo que dicen nuestros pasajeros sobre sus viajes
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {experiences.map((experience, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar src={experience.avatar} sx={{ width: 56, height: 56 }} />
                        <Box>
                          <Typography variant="h6">{experience.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ruta: {experience.route}
                          </Typography>
                        </Box>
                        <Verified sx={{ ml: "auto", color: "primary.main" }} />
                      </Stack>
                      <Typography variant="body1" paragraph>
                        {experience.comment}
                      </Typography>
                      <Rating value={experience.rating} readOnly />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

      </>
    </MainLayout>
  );
}

