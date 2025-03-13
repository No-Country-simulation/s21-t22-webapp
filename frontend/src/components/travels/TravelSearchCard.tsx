import React from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
} from "@mui/material";

export type TravelSearchCardProps = {
  imageOrigin: string;
  imageDestination: string;
  company: string;
  origin: string;
  destination: string;
  date: string;
  price: string;
  busType: string;
  duration: string;
  salida: string;
  llegada: string;
  seatsAvailable: number;
  rating: number;
  direct: boolean;
  onClick?: () => void;
};

const TravelSearchCard: React.FC<TravelSearchCardProps> = ({
  imageOrigin,
  imageDestination,
  company,
  origin,
  destination,
  date,
  price,
  busType,
  duration,
  salida,
  llegada,
  seatsAvailable,
  rating,
  direct,
  onClick,
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        padding: 2,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%", // Cambié el width a 100% para hacer que se adapte al tamaño del contenedor
          maxWidth: 1000, // Agregué un máximo ancho para evitar que el card se haga muy grande
          height: "auto",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={imageOrigin}
          alt="travel"
          sx={{
            width: "30%", // Hago que la imagen ocupe un 30% del card
            height: "auto",
            objectFit: "cover",
            marginRight: 2, // Añadí margen a la derecha para separar la imagen del contenido
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {company}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {origin} → {destination}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fecha: {date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tipo de bus: {busType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duración: {duration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Asientos disponibles: {seatsAvailable}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Salida: {salida}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Llegada: {llegada}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body2" color="text.secondary">
              {direct ? (
                <Typography variant="body2" color="text.secondary">
                  Viaje directo
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Viaje con paradas
                </Typography>
              )}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Rating value={rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {rating}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ${price}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={onClick}
          >
            Reservar
          </Button>
        </CardContent>
        <CardMedia
          component="img"
          image={imageDestination}
          alt="travel"
          sx={{
            width: "30%", // Hago que la imagen ocupe un 30% del card
            height: "auto",
            objectFit: "cover",
            marginLeft: 2, // Añadí margen a la izquierda para separar la imagen del contenido
          }}
        />
      </Card>
    </Container>
  );
};

export default TravelSearchCard;
