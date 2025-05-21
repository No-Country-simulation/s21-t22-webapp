import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "green", // Color para todos los iconoes de MUI material
        },
      },
    },
  },
});

export default theme;
