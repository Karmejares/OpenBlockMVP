"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import MenuComponent from "./components/MenuComponent";
import PerfilPrestamista from "./components/PerfilPrestamista/PerfilPrestamista";
import PerfilBeneficiario from "./components/PerfilBeneficiario/PerfilBeneficiario";
import {ToastContainer} from "react-toastify";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileType, setProfileType] = useState("Perfil Prestamista");
  const [accountBalance, setAccountBalance] = useState(1000); // Monto inicial
  const [setActiveTab] = useState(0); // Tab activa para Depositar/Retirar

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleProfileType = () => {
    setProfileType((prevType) =>
      prevType === "Perfil Beneficiario de Crédito"
        ? "Perfil Prestamista"
        : "Perfil Beneficiario de Crédito"
    );
  };

  return (
    <Box sx={{ backgroundColor: "black", height: "100vh", color: "white" }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
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
          <button
            onClick={toggleProfileType}
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {profileType}
          </button>
        </Toolbar>
      </AppBar>
      <MenuComponent anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
      {profileType === "Perfil Prestamista" ? (
        <PerfilPrestamista
          accountBalance={accountBalance}
          setAccountBalance={setAccountBalance}
        />
      ) : (
        <PerfilBeneficiario />
      )}
      <ToastContainer/>
    </Box>
  );
}
