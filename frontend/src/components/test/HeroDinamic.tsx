import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState } from "react";
import CustomAutocomplete from "../home/Autocomplete";
import CustomDatePicker from "../home/Datepicker";
import useStore from "../../contexts/store";
import { useNavigate } from "react-router-dom";

// Función para buscar lugares en la API
const searchPlaces = async (
  query: string
): Promise<{ id: string; name: string }[]> => {
  const url = `http://localhost:5000/api/stop/search?q=${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data.map((item: any) => ({ id: item._id, name: item.name })); // Devuelve un array de objetos
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    return [];
  }
};

const backgroundImage =
  "https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2018%2F05%2F16163658%2Fmicros-larga-distancia-Getty-Images.jpg?auth=719b522476893895b314fbd2a2b32db914361f6be2e99aad2c7afe065edfdc3f&smart=true&width=1200&height=675&quality=85";

// Tipados
export type TravelData = {
  origin: string | null;
  destination: string | null;
  date: Date | null;
};

interface Place {
  id: string;
  name: string;
}

const HeroDinamic = ({ travelData }: { travelData: TravelData }) => {
  const { setViajes, setViajesNoEncontrados } = useStore();
  const navigate = useNavigate();
  // Estados
  const [origin, setOrigin] = useState<Place | null>(null);
  const [destination, setDestination] = useState<Place | null>(null);
  const [date, setDate] = useState<Date | null>(travelData.date);
  const [originOptions, setOriginOptions] = useState<Place[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<
    { id: string; name: string }[]
  >([]);

  // Funciones
  const handleOriginSearch = async (query: string) => {
    if (query.length > 2) {
      const results = await searchPlaces(query);
      setOriginOptions(results);
    }
  };

  const handleDestinationSearch = async (query: string) => {
    if (query.length > 2) {
      const results = await searchPlaces(query);
      setDestinationOptions(results);
    }
  };

  const handleSearch = () => {
    navigate("/viajes");
    // Validación de campos
    if (!origin || !destination || !date) {
      alert("No has completado la búsqueda de viajes");
      return; // Detener la ejecución si falta algún campo
    }
    // Formatear la fecha
    const fechaOriginal = new Date(date);
    const fechaFormateada = format(fechaOriginal, "yyyy-MM-dd");

    const url = `http://localhost:5000/api/trip/search-trips?id1=${origin.id}&id2=${destination.id}&fecha=${fechaFormateada}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          // Si la respuesta no es exitosa, lanzar un error con el código de estado
          throw new Error(
            `Error en la solicitud: ${res.status} ${res.statusText}`
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // Si la respuesta es exitosa y hay datos
        setViajes(data);
        setViajesNoEncontrados(false); // Desactivar el mensaje de "no encontrados"
        navigate("/viajes");
      })
      .catch((error) => {
        console.error("Error al buscar viajes:", error);

        // Verificar si el error es un error interno del servidor (por ejemplo, 500)
        if (error.message.includes("500")) {
          setViajesNoEncontrados(true); // Activar el mensaje de "no encontrados"
          setViajes([]); // Limpiar los viajes
        } else {
          // Otros errores (por ejemplo, red o problemas de conexión)
          alert(
            "Hubo un error al buscar viajes. Por favor, intenta nuevamente."
          );
        }
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box
        sx={{
          position: "relative",
          color: "white",
          py: { xs: 6, md: 12 },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2rem", md: "3.75rem" },
            }}
          >
            Encuentra tu próximo viaje
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 4,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Explora destinos, compara precios y reserva tu aventura ideal
          </Typography>
          <Box
            component="form"
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 2,
              bgcolor: alpha("#000", 0.3),
              backdropFilter: "blur(10px)",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <CustomAutocomplete
                value={origin}
                onChange={(newValue) => setOrigin(newValue)}
                options={originOptions}
                onSearch={handleOriginSearch}
                placeholder="Origen"
              />
              <CustomAutocomplete
                value={destination}
                onChange={(newValue) => setDestination(newValue)}
                options={destinationOptions}
                onSearch={handleDestinationSearch}
                placeholder="Destino"
              />
              <CustomDatePicker
                value={date}
                onChange={setDate}
                placeholder="Fecha de viaje"
                sx={{
                  maxWidth: { md: "170px" },
                }}
              />
              <Button
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{
                  width: { xs: "100%", md: "auto" },
                  minWidth: { md: "200px" },
                  bgcolor: "#70B734",
                  fontFamily: "var(--font-main)",
                  color: "#1E1E1E",
                  "&:hover": {
                    bgcolor: "green",
                  },
                  px: 4,
                  py: 1.5,
                  whiteSpace: "nowrap",
                  ml: 2,
                }}
              >
                Buscar Viaje
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default HeroDinamic;
