import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
      <Navbar />
      <Container component="main" sx={{ flexGrow: 1, overflow: "auto" }} style={{ width: "100%", maxWidth: "100%", padding: 0 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;
