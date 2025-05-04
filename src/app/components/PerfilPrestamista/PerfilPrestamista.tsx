import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WalletOptions from "./WalletOptions";
import WithdrawOption from "./WithdrawOption";
import PrestamosActuales from "./PrestamosActuales";

interface PerfilPrestamistaProps {
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

const PerfilPrestamista: React.FC<PerfilPrestamistaProps> = ({
  accountBalance,
  setAccountBalance,
}) => {
  const [activeTab, setActiveTab] = useState(0); // Tab activa para Depositar/Retirar

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
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
                profileType="Perfil Prestamista"
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
            {
              id: 1,
              monto: 500,
              fechaDeInicio: "2023-10-01",
              fechaDeFin: "2023-11-01",
              estado: "Activo",
            },
            {
              id: 2,
              monto: 300,
              fechaDeInicio: "2023-10-05",
              fechaDeFin: "2023-10-20",
              estado: "Pagado",
            },
          ]}
        />
      </Box>
    </>
  );
};

export default PerfilPrestamista;
