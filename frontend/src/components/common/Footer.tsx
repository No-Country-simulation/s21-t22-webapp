import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ py: 2, textAlign: "center", bgcolor: "grey.200" }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Reserva de viajes
      </Typography>
    </Box>
  );
};

export default Footer;
