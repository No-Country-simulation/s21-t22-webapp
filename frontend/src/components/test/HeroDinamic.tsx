import {
    alpha,
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";
import { formatDateToDDMMYYYY } from '../../utils/formatDateToDDMMYYYY ';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import CustomAutocomplete from "../home/Autocomplete";
import CustomDatePicker from "../home/Datepicker";

// Simulación de búsqueda, luego se reemplazará por una llamada a una API real
const searchPlaces = (query: string) => {
    return new Promise<string[]>((resolve) => {
        setTimeout(() => {
            resolve([`${query} Ciudad`, `${query} Aeropuerto`, `${query} Central`, `${query} Plaza`]);
        }, 300);
    });
};

const baclgoundImage = "https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2018%2F05%2F16163658%2Fmicros-larga-distancia-Getty-Images.jpg?auth=719b522476893895b314fbd2a2b32db914361f6be2e99aad2c7afe065edfdc3f&smart=true&width=1200&height=675&quality=85";


type TravelData = {
    origin: string;
    destination: string;
    date: Date;
}

const HeroDinamic = ({ travelData }: { travelData: TravelData }) => {
    const [origin, setOrigin] = useState<string | null>(travelData.origin);
    const [destination, setDestination] = useState<string | null>(travelData.destination);
    const [date, setDate] = useState<Date | null>(travelData.date);
    const [originOptions, setOriginOptions] = useState<string[]>([]);
    const [destinationOptions, setDestinationOptions] = useState<string[]>([]);
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
        console.log("Buscando viajes:", { origin, destination, date: formattedDate });
        navigate(`/viajes?origenId=${origin}&destinoId=${destination}&fecha=${encodeURIComponent(formattedDate)}`);
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
                                value={origin}
                                onChange={setOrigin}
                                options={originOptions}
                                onSearch={handleOriginSearch}
                                placeholder="Origen"
                            />
                            <CustomAutocomplete
                                value={destination}
                                onChange={setDestination}
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

export default HeroDinamic;