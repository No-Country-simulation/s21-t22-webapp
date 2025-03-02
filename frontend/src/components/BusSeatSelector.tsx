import { useEffect, useState } from "react";
import { Box, Container, Typography, Stack, useTheme } from "@mui/material";

interface Seat {
  id: number;
  numero: number;
  tipo: string;
}

interface BusSeatSelectorProps {
  seats: Seat[];
  quantity: number;
}

export default function BusSeatSelector({
  seats,
  quantity,
}: BusSeatSelectorProps) {
  const theme = useTheme();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.tipo === "libre") {
      setSelectedSeats(
        (prev) =>
          prev.includes(seat.id)
            ? prev.filter((id) => id !== seat.id) // Deseleccionar
            : prev.length < quantity
            ? [...prev, seat.id] // Seleccionar
            : prev // No hacer nada si ya se seleccionó la cantidad máxima
      );
    }
  };

  useEffect(() => {
    console.log("Asientos seleccionados:", selectedSeats);
  }, [selectedSeats]);

  const renderSeat = (seat: Seat, x: number, y: number) => {
    const isOccupied = seat.tipo === "ocupado";
    const isSelected = selectedSeats.includes(seat.id);

    return (
      <g
        key={seat.id}
        transform={`translate(${x}, ${y})`}
        onClick={() => handleSeatClick(seat)}
        style={{ cursor: isOccupied ? "not-allowed" : "pointer" }}
      >
        {/* Asiento en forma de cuadrado */}
        <rect
          x="0"
          y="0"
          width="35"
          height="35"
          fill={
            isOccupied
              ? theme.palette.grey[300] // Ocupado
              : isSelected
              ? theme.palette.secondary.main // Seleccionado
              : theme.palette.primary.main // Disponible
          }
          stroke={theme.palette.grey[400]}
          strokeWidth="1"
          style={{ transition: "fill 0.2s ease" }} // Transición suave
        />
        {/* Número del asiento */}
        <text
          x="17.5"
          y="20"
          textAnchor="middle"
          fill={
            isOccupied
              ? theme.palette.text.disabled
              : theme.palette.primary.contrastText
          }
          style={{ fontSize: "12px", userSelect: "none", fontWeight: "bold" }}
        >
          {seat.numero}
        </text>
      </g>
    );
  };

  const seatColumns = Math.ceil(seats.length / 4);
  const busWidth = 160 + seatColumns * 40;

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column" }}>
      {/* Leyenda */}
      <Stack direction="row" spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: theme.palette.primary.main,
              borderRadius: 1,
            }}
          />
          <Typography variant="body2">Disponible</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: theme.palette.grey[300],
              borderRadius: 1,
            }}
          />
          <Typography variant="body2">Ocupado</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: theme.palette.secondary.main,
              borderRadius: 1,
            }}
          />
          <Typography variant="body2">Seleccionado</Typography>
        </Stack>
      </Stack>
      {/* SVG del autobús */}
      <Box>
        <svg
          width={busWidth}
          height="300"
          viewBox={`0 0 ${busWidth} 300`}
          style={{ display: "block", margin: "auto" }}
        >
          {/* Contorno del autobús */}
          <path
            d={`M20,50 L20,250 Q20,270 40,270 L${
              busWidth - 20
            },270 Q${busWidth},270 ${busWidth},250 L${busWidth},50 Q${busWidth},30 ${
              busWidth - 20
            },30 L40,30 Q20,30 20,50`}
            fill="white"
            stroke={theme.palette.grey[300]}
            strokeWidth="2"
          />
          {/* Volante en la parte inferior */}
          <circle
            cx="60"
            cy="230" // Movido hacia abajo
            r="15"
            fill="none"
            stroke={theme.palette.grey[400]}
            strokeWidth="2"
          />
          {/* Texto de "INGRESO" cerca del volante
          <text
            x="90"
            y="240" // Ajustado para estar cerca del volante
            textAnchor="middle"
            fill={theme.palette.grey[600]}
            style={{ fontSize: "14px", fontWeight: "bold", userSelect: "none" }}
          >
            Ingreso
          </text> */}
          {/* Asientos */}
          {seats.map((seat, index) => {
            const col = Math.floor(index / 4);
            const row = index % 4;
            const x = 120 + col * 40;
            const y = row < 2 ? 50 + row * 40 : 160 + (row - 2) * 40; // Ajustado para dejar espacio abajo
            return renderSeat(seat, x, y);
          })}
        </svg>
      </Box>
    </Container>
  );
}
