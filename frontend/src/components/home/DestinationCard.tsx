import { Grid, Card, CardMedia, CardContent, Stack, Typography, Chip, Box, Rating } from '@mui/material';
import { Schedule, EventSeat, WifiRounded, PowerSettingsNew, AcUnit } from '@mui/icons-material';
import React from 'react';

interface Destination {
  title: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
  nextDeparture: string;
  amenities: string[];
}

interface Props {
  destination: Destination;

}

export const DestinationCard: React.FC<Props> = ({ destination }) => {

  return (
    <Grid item xs={12} sm={6} md={4}>
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
  );
};
