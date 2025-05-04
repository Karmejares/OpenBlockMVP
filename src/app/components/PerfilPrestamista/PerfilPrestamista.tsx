import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WalletOptions from "./WalletOptions";
import WithdrawOption from "./WithdrawOption"; // Importar el componente de retiro
import PrestamosActuales from "./PrestamosActuales";
import CopToAvaxConverter, { fetchAvaxPriceInCOP } from "../CopToAvaxConverter"; // Import the conversion function

interface PerfilPrestamistaProps {
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

const PerfilPrestamista: React.FC<PerfilPrestamistaProps> = ({
  accountBalance,
  setAccountBalance,
}) => {
  const [activeTab, setActiveTab] = useState(0); // Tab activa para Depositar/Retirar
  const [avaxPriceCOP, setAvaxPriceCOP] = useState<number | null>(null); // Tasa de conversión AVAX a COP
  const [balanceInCOP, setBalanceInCOP] = useState<number | null>(null); // Saldo en COP

  // Fetch the AVAX price in COP when the component mounts
  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchAvaxPriceInCOP();
      if (price) {
        setAvaxPriceCOP(price);
        setBalanceInCOP(accountBalance * price); // Calcula el saldo en COP
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 60_000); // Actualiza cada 60 segundos
    return () => clearInterval(interval);
  }, [accountBalance]); // Recalcula el saldo en COP si cambia el saldo en AVAX

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {/* Contenedor principal para Saldo Actual y Operaciones */}
      <Box
        sx={{
          display: "flex", // Alinea los elementos horizontalmente
          flexDirection: "row", // Coloca los elementos en fila
          justifyContent: "center", // Centra los elementos horizontalmente
          alignItems: "flex-start", // Alinea los elementos al inicio verticalmente
          gap: 4, // Espaciado entre las cajas
          padding: 4,
          mb: 6,
        }}
      >
        {/* Caja de Saldo Actual y Operaciones */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%", // Ocupa la mitad del espacio disponible
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 2,
            color: "black",
            padding: 4,
            height: "60vh",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Saldo en COP:{" "}
            {balanceInCOP !== null
              ? `$${balanceInCOP.toLocaleString()} COP`
              : "Cargando..."}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}></Typography>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Depositar" />
            <Tab label="Retirar" />
          </Tabs>
          <Box sx={{ padding: 2, width: "100%" }}>
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

        {/* Caja de Conversión COP a AVAX */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "30%", // Ocupa la mitad del espacio disponible
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 2,
            color: "black",
            padding: 4,
            height: "60vh",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Conversión COP a AVAX
          </Typography>
          <CopToAvaxConverter /> {/* Componente de conversión COP a AVAX */}
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
