import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";

interface MenuComponentProps {
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
  onWalletClick: () => void;
  onProfileClick: () => void;
  onStatisticsClick: () => void;
  profileType: string;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  anchorEl,
  handleMenuClose,
  onWalletClick,
  onProfileClick,
  onStatisticsClick,
  profileType,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          onProfileClick();
          handleMenuClose();
        }}
      >
        <AccountCircleIcon sx={{ marginRight: 1 }} />
        Perfil
      </MenuItem>
      <MenuItem
        onClick={() => {
          onWalletClick();
          handleMenuClose();
        }}
      >
        <AccountBalanceWalletIcon sx={{ marginRight: 1 }} />
        Wallet
      </MenuItem>
      {profileType === "Perfil Prestamista" && (
        <MenuItem
          onClick={() => {
            onStatisticsClick();
            handleMenuClose();
          }}
        >
          <BarChartIcon sx={{ marginRight: 1 }} />
          Estadísticas
        </MenuItem>
      )}
    </Menu>
  );
};

export default MenuComponent;
