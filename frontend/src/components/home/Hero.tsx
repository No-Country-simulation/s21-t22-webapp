import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { City } from '../../../types/city';
import { es } from "date-fns/locale";
import { formatDateToDDMMYYYY } from '../../utils/formatDateToDDMMYYYY ';
import { getRequest } from '../../services/http-requests';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import CustomAutocomplete from './Autocomplete';
import CustomDatePicker from './Datepicker';

const searchPlaces = async (query: string) => {
  return await getRequest<City[]>(`/cities/search-by-query?query=${query}`);
};

const baclgoundImage = "https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2018%2F05%2F16163658%2Fmicros-larga-distancia-Getty-Images.jpg?auth=719b522476893895b314fbd2a2b32db914361f6be2e99aad2c7afe065edfdc3f&smart=true&width=1200&height=675&quality=85";

const Hero = () => {
  const [origin, setOrigin] = useState<City | null>(null);
  const [destination, setDestination] = useState<City | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [originOptions, setOriginOptions] = useState<City[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<City[]>([]);

  const navigate = useNavigate();

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
    if (!origin || !destination || !date) {
      return;
    }
    const formattedDate = formatDateToDDMMYYYY(date!);
    console.log("Buscando viajes:", { origin: origin._id, destination: destination._id, date: formattedDate });
    navigate(`/viajes?origenId=${origin._id}&destinoId=${destination._id}&fecha=${formattedDate}`);
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
            backgroundImage:
              `url(${baclgoundImage})`,
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
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
              <CustomAutocomplete
                value={origin ? origin.name : null}
                onChange={(value) => {
                  const selectedCity = originOptions.find(city => city.name === value) || null;
                  setOrigin(selectedCity);
                }}
                options={originOptions.map((city) => city.name)}
                onSearch={handleOriginSearch}
                placeholder="Origen"
              />
              <CustomAutocomplete
                value={destination ? destination.name : null}
                onChange={(value) => {
                  const selectedCity = destinationOptions.find(city => city.name === value) || null;
                  setDestination(selectedCity);
                }}
                options={destinationOptions.map((city) => city.name)}
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
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  px: 4,
                  py: 1.5,
                  whiteSpace: "nowrap",
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

export default Hero;