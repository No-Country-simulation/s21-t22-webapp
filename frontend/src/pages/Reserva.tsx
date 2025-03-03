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
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
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
  const { origenImg, destinoImg, fecha, destino, origen, compañia, bus } =
    useStore();
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
          width: "100%",
          height: "40vh",
          position: "relative",
          display: "flex",
        }}
        className="destino-clippath"
      >
        <Box sx={{ flex: 0.3, position: "relative" }}>
          <img src={origenImg} alt="" className="image-left" />
          <Typography
            variant="h2"
            sx={{
              color: "white", // Color del texto
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              fontSize: { xs: "2rem", sm: "3rem", md: "3rem", lg: "3rem" },
              position: "absolute",
              top: "50%",
              transform: "translate(-50%,-50%)",
              left: "50%",
            }}
          >
            {origen}
          </Typography>
        </Box>
        <Box sx={{ flex: 0.7, position: "relative" }}>
          <img src={destinoImg} alt="" className="image-right" />
          <Typography
            variant="h2"
            sx={{
              color: "white", // Color del texto
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              fontSize: { xs: "2rem", sm: "3rem", md: "3rem", lg: "3rem" },
              position: "absolute",
              top: "50%",
              transform: "translate(-50%,-50%)",
              left: "50%",
            }}
          >
            {destino}
          </Typography>
        </Box>
        <SyncAltIcon
          sx={{
            position: "absolute",
            top: "50%",
            left: "30%",
            transform: "translate(-50%,-50%)",
            color: "purple",
            fontSize: "40px",
          }}
        />
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
      <Typography
        variant="h4"
        sx={{ m: 3, display: "flex", alignItems: "center" }}
      >
        Detalles del bus
      </Typography>
      <Typography
        variant="h5"
        sx={{ m: 5, display: "flex", alignItems: "center", pl: "30vw" }}
      >
        Clase:&nbsp;
        {bus && bus === "Semicama" ? (
          <>
            {" "}
            <AirlineSeatReclineExtraIcon sx={{ color: "black" }} />
            {bus}
          </>
        ) : (
          ""
        )}
      </Typography>
      <Typography
        variant="h5"
        sx={{ m: 5, display: "flex", alignItems: "center", pl: "30vw" }}
      >
        Asientos disponibles:&nbsp;5
      </Typography>
      <Typography
        variant="h5"
        sx={{ m: 5, display: "flex", alignItems: "center", pl: "30vw" }}
      >
        Agencia:&nbsp;{compañia}
      </Typography>
      <Typography
        variant="h5"
        sx={{ m: 6, display: "flex", alignItems: "center", pl: "15vw" }}
      >
        Selecciona tus asientos
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
