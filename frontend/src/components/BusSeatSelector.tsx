import { use, useEffect, useState } from "react";
import { Box, Container, Typography, Paper, Stack, useTheme } from "@mui/material";

interface Seat {
  id: number;
  numero: number;
  tipo: string;
}

interface BusSeatSelectorProps {
  seats: Seat[];
  quantity: number;
}

export default function BusSeatSelector({ seats, quantity }: BusSeatSelectorProps) {
  const theme = useTheme();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.tipo === "libre") {
      setSelectedSeats((prev) =>
        prev.includes(seat.id) ? prev.filter((id) => id !== seat.id) : prev.length < quantity ? [...prev, seat.id] : prev
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
        <rect
          width="35"
          height="35"
          rx="4"
          fill={
            isOccupied
              ? theme.palette.grey[300]
              : isSelected
                ? theme.palette.secondary.main
                : theme.palette.primary.main
          }
          stroke={theme.palette.grey[400]}
          strokeWidth="1"
        />
        <text
          x="17.5"
          y="22.5"
          textAnchor="middle"
          fill={isOccupied ? theme.palette.text.disabled : theme.palette.primary.contrastText}
          style={{ fontSize: "12px", userSelect: "none" }}
        >
          {seat.numero}
        </text>
      </g>
    );
  };

  const seatRows = Math.ceil(seats.length / 4);
  const busHeight = 160 + seatRows * 40;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Selecciona tu asiento
      </Typography>

      {/* Leyenda */}
      <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.primary.main, borderRadius: 0.5 }} />
          <Typography variant="body2">Disponible</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.grey[300], borderRadius: 0.5 }} />
          <Typography variant="body2">Ocupado</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.secondary.main, borderRadius: 0.5 }} />
          <Typography variant="body2">Seleccionado</Typography>
        </Stack>
      </Stack>

      {/* SVG del autobús */}
      <Box>
        <svg width="300" height={busHeight} viewBox={`0 0 300 ${busHeight}`} style={{ display: "block", margin: "auto" }}>
          {/* Contorno del autobús */}
          <path
            d={`M50,20 L250,20 Q270,20 270,40 L270,${busHeight - 20} Q270,${busHeight} 250,${busHeight} L50,${busHeight} Q30,${busHeight} 30,${busHeight - 20} L30,40 Q30,20 50,20`}
            fill="white"
            stroke={theme.palette.grey[300]}
            strokeWidth="2"
          />

          {/* Volante en la izquierda */}
          <circle cx="70" cy="60" r="15" fill="none" stroke={theme.palette.grey[400]} strokeWidth="2" />

          {/* Texto de "INGRESO" sobre el asiento 4 */}
          <text
            x="220"
            y="90"
            textAnchor="middle"
            fill={theme.palette.grey[600]}
            style={{ fontSize: "14px", fontWeight: "bold", userSelect: "none" }}
          >
            Ingreso
          </text>

          {/* Asientos */}
          {seats.map((seat, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const x = col < 2 ? 70 + col * 40 : 180 + (col - 2) * 40;
            const y = 120 + row * 40;
            return renderSeat(seat, x, y);
          })}
        </svg>
      </Box>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        Haz clic en un asiento disponible para seleccionarlo
      </Typography>
    </Container>
  );
}
