import React, { useEffect } from "react";
import BusSeatSelector from "../components/BusSeatSelector";
import MainLayout from "../components/common/MainLayout";
import useStore from "../contexts/store";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import "./Reserva.css";
import { Box, Stack, Typography } from "@mui/material";
import { DatosTrip } from "../components/reserva/DatosTrip";
import { useLocation } from "react-router-dom";

interface Seat {
  id: number;
  numero: number;
  tipo: "libre" | "ocupado";
}

interface ReservaProps {
  seats?: Seat[];
  quantity?: number;
}

export const Reserva: React.FC<ReservaProps> = ({ seats, quantity }) => {
  const { origen, destino, fecha, descripcion, imagen } = useStore();
  const location = useLocation();
  //corrección de SPA (navegar hacia arriba)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <MainLayout>
      {/* Destino*/}
      <Box
        sx={{
          backgroundImage: imagen
            ? `url(${imagen})`
            : "url(https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2018%2F05%2F16163658%2Fmicros-larga-distancia-Getty-Images.jpg?auth=719b522476893895b314fbd2a2b32db914361f6be2e99aad2c7afe065edfdc3f&smart=true&width=1200&height=675&quality=85)",
          backgroundSize: "cover",
          width: "100%",
          height: "40vh",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white", // Color del texto
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            fontSize: { xs: "2rem", sm: "3rem", md: "3rem", lg: "4rem" }, // Sombra para mejorar el contraste
          }}
        >
          {destino}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "70vw",
          p: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6">Origen</Typography>
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TripOriginIcon sx={{ color: "#1d2a4a" }} />
            {origen}
          </Typography>
        </Stack>
        <SyncAltIcon />
        <Stack spacing={2}>
          <Typography variant="h6">Destino</Typography>
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FmdGoodIcon sx={{ color: "#1d2a4a" }} />
            {destino}
          </Typography>
        </Stack>
        <TrendingFlatIcon />

        <Stack spacing={2}>
          <Typography variant="h6">Fecha</Typography>
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CalendarMonthIcon /> {fecha}
          </Typography>
        </Stack>
      </Box>
      <hr />
      <Typography variant="h4" sx={{ m: 3 }}>
        Asientos
      </Typography>
      <BusSeatSelector seats={seats || []} quantity={quantity || 0} />
      <Typography variant="h4" sx={{ m: 3 }}>
        Tus datos
      </Typography>
      <DatosTrip />
      <Typography variant="h4" sx={{ m: 3 }}>
        Aplicar descuentos
      </Typography>
    </MainLayout>
  );
};
