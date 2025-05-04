"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import MenuComponent from "./components/MenuComponent";
import WalletOptions from "./components/PerfilPrestamita/WalletOptions";
import WithdrawOption from "./components/PerfilPrestamita/WithdrawOption";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileType, setProfileType] = useState("Perfil Prestamista");
  const [accountBalance, setAccountBalance] = useState(1000); // Monto inicial

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
      <Box sx={{ padding: 4 }}>
        <WalletOptions
          profileType={profileType}
          accountBalance={accountBalance}
          setAccountBalance={setAccountBalance}
        />
      </Box>
      {profileType === "Perfil Prestamista" && ( // Mostrar solo si es perfil prestamista
        <Box sx={{ padding: 4 }}>
          <WithdrawOption
            accountBalance={accountBalance}
            setAccountBalance={setAccountBalance}
          />
        </Box>
      )}
    </Box>
  );
}
