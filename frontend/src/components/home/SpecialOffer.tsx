import { Container, Card, CardMedia, Box, Typography } from '@mui/material';

export const SpecialOffer = () => {
  return (
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
  );
};
