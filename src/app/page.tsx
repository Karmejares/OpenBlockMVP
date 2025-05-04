"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import MenuComponent from "./components/MenuComponent";
import PrestamosActuales from "./components/PerfilPrestamita/PrestamosActuales";
import WalletOptions from "./components/PerfilPrestamita/WalletOptions";
import WithdrawOption from "./components/PerfilPrestamita/WithdrawOption";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileType, setProfileType] = useState("Perfil Prestamista");
  const [accountBalance, setAccountBalance] = useState(1000); // Monto inicial
  const [activeTab, setActiveTab] = useState(0); // Tab activa para Depositar/Retirar

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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

      {/* Saldo actual y operaciones */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh", // Ocupa la mitad superior de la pantalla
          padding: 4,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Saldo Actual: ${accountBalance.toFixed(2)}
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            color: "black",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Depositar" />
            <Tab label="Retirar" />
          </Tabs>
          <Box sx={{ padding: 2 }}>
            {activeTab === 0 ? (
              <WalletOptions
                profileType={profileType}
                accountBalance={accountBalance}
                setAccountBalance={setAccountBalance}
              />
            ) : (
              <WithdrawOption
                accountBalance={accountBalance}
                setAccountBalance={setAccountBalance}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Historial de préstamos */}
      {profileType === "Perfil Prestamista" && (
        <Box
          sx={{
            padding: 4,
            backgroundColor: "#1c1c1c",
            borderTop: "1px solid #333",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Historial de Préstamos
          </Typography>
          <PrestamosActuales
            prestamos={[
              { id: 1, monto: 500, fecha: "2023-10-01", estado: "Activo" },
              { id: 2, monto: 300, fecha: "2023-10-05", estado: "Pagado" },
            ]}
          />
        </Box>
      )}
    </Box>
  );
}
