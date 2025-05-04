"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuComponent from "./components/MenuComponent";
import PerfilPrestamista from "./components/PerfilPrestamista/PerfilPrestamista";
import PerfilBeneficiario from "./components/PerfilBeneficiario/PerfilBeneficiario";
import Dashboard from "./components/Statistics/Dashboard";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accountBalance, setAccountBalance] = useState(1000);
  const [activeView, setActiveView] = useState<
    "perfil" | "usuario" | "estadisticas"
  >("perfil");
  const [profileType, setProfileType] = useState<
    "Perfil Prestamista" | "Perfil Beneficiario de Crédito"
  >("Perfil Prestamista");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleProfileType = () => {
    setProfileType((prev) =>
      prev === "Perfil Prestamista"
        ? "Perfil Beneficiario de Crédito"
        : "Perfil Prestamista"
    );
    setActiveView("perfil");
  };

  return (
    <Box sx={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "black", zIndex: 1200 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NFT Whitelist DApp
          </Typography>
          <Button
            onClick={toggleProfileType}
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
          >
            {profileType}
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ paddingTop: "64px", p: 2 }}>
        <MenuComponent
          anchorEl={anchorEl}
          handleMenuClose={handleMenuClose}
          onWalletClick={() => setActiveView("perfil")}
          onProfileClick={() => setActiveView("usuario")}
          onStatisticsClick={() => setActiveView("estadisticas")}
          profileType={profileType}
        />

        {/* Vista activa */}
        {activeView === "perfil" &&
          (profileType === "Perfil Prestamista" ? (
            <PerfilPrestamista
              accountBalance={accountBalance}
              setAccountBalance={setAccountBalance}
            />
          ) : (
            <PerfilBeneficiario />
          ))}

        {activeView === "estadisticas" &&
          profileType === "Perfil Prestamista" && (
            <>
              <Box textAlign="right" mb={2}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => setActiveView("perfil")}
                >
                  Volver
                </Button>
              </Box>
              <Dashboard profileType={profileType} />
            </>
          )}

        {activeView === "usuario" && (
          <Box>
            <Typography variant="h5">Perfil del Usuario</Typography>
            {/* Puedes agregar aquí las configuraciones del usuario */}
          </Box>
        )}
      </Box>

      <ToastContainer />
    </Box>
  );
}
