import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";

interface MenuComponentProps {
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  anchorEl,
  handleMenuClose,
}) => {
  const handleStatisticsClick = () => {
    // Aquí puedes manejar la lógica para mostrar las estadísticas

    console.log("Mostrar estadísticas");
    handleMenuClose(); // Cierra el menú después de hacer clic
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AccountCircleIcon sx={{ marginRight: 1 }} />
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <AccountBalanceWalletIcon sx={{ marginRight: 1 }} />
        Wallet
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <BarChartIcon sx={{ marginRight: 1 }} />
        Statistics
      </MenuItem>
    </Menu>
  );
};

export default MenuComponent;
