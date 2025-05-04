import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { GenericToast } from "@/app/components/comun/GenericToast";
import { fetchAvaxPriceInCOP } from "../CopToAvaxConverter"; // Import the conversion function

interface WalletOptionsProps {
  profileType: string;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

const WalletOptions: React.FC<WalletOptionsProps> = ({
  profileType,
  accountBalance,
  setAccountBalance,
}) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [avaxPriceCOP, setAvaxPriceCOP] = useState<number | null>(null);
  const { SuccessNotify, ErrorNotify } = GenericToast();

  // Fetch the AVAX price in COP when the component mounts
  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchAvaxPriceInCOP();
      if (price) {
        setAvaxPriceCOP(price);
      } else {
        ErrorNotify("Error al obtener la tasa de cambio COP/AVAX.");
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 60_000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, [ErrorNotify]);

  const handleDeposit = () => {
    const deposit = parseFloat(depositAmount);
    if (!isNaN(deposit) && deposit > 0) {
      if (avaxPriceCOP) {
        const avaxAmount = deposit / avaxPriceCOP; // Convert COP to AVAX
        setAccountBalance((prev) => prev + avaxAmount); // Update balance in AVAX
        setDepositAmount("");
        SuccessNotify(
          `Se ha depositado correctamente ${avaxAmount.toFixed(
            4
          )} AVAX al saldo disponible.`
        );
      } else {
        ErrorNotify("No se pudo realizar la conversión. Intenta nuevamente.");
      }
    } else {
      ErrorNotify("Por favor, ingresa un monto válido para depositar.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, backspace, and navigation keys
    if (
      !/[0-9]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Delete"
    ) {
      event.preventDefault();
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        color: "black",
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
        Opciones de Wallet
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      {profileType === "Perfil Prestamista" ? (
        <>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Saldo Disponible en la cuenta:{" "}
            <strong>{accountBalance.toFixed(4)} AVAX</strong>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <TextField
              label="Monto a depositar (COP)"
              variant="outlined"
              size="small"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              onKeyDown={handleKeyDown} // Filter allowed keys
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeposit}
              disabled={
                depositAmount === "" || depositAmount === null || !avaxPriceCOP
              }
              fullWidth
            >
              Depositar
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Cambia al perfil de Prestamista para ver las opciones de la wallet.
        </Typography>
      )}
    </Box>
  );
};

export default WalletOptions;
