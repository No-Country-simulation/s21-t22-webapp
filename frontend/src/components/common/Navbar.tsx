import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { nanoid } from "nanoid";
import busicon from "../../assets/busicon.png";

const pages = [{ label: "¡Prepara tu viaje!", link: "/viajes" }];

const settings = [
  { label: "Iniciar Sesión", link: "/login" },
  { label: "Perfil", link: "/profile" },
  { label: "Viajes", link: "/viajes" },
  { label: "Salir", link: "/logout" },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ bgcolor: "#70B734" }}>
        <Toolbar disableGutters>
          <img src={busicon} alt="Bus icon" style={{ maxHeight: "10vh" }} />

          {/* Menú para móviles */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={nanoid()}
                  onClick={handleCloseNavMenu}
                  component={NavLink}
                  to={page.link}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* NavLinks desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 4, // 👈 ESPACIO aplicado entre ícono y links
            }}
          >
            {pages.map((page) => (
              <Button
                key={nanoid()}
                onClick={handleCloseNavMenu}
                component={NavLink}
                to={page.link}
                sx={{
                  my: 2,
                  display: "block",
                  pr: 2,
                  fontFamily: "var(--font-main)",
                  color: "#1E1E1E",
                  "&:hover": {
                    color: "#fefefe", // fondo
                  },
                  fontSize: "1.3rem",
                  textTransform: "capitalize",
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Avatar y menú de usuario */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Usuario" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={nanoid()}
                  onClick={handleCloseUserMenu}
                  component={NavLink}
                  to={setting.link}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
