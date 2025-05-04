import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import {GenericToast} from "@/app/components/comun/GenericToast";

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

  const { SuccessNotify } = GenericToast()

  const handleDeposit = () => {
    const deposit = parseFloat(depositAmount);
    if (!isNaN(deposit) && deposit > 0) {
      setAccountBalance((prev) => prev + deposit); // Update balance in parent component
      setDepositAmount("");
      SuccessNotify("Se ha depositado correctamente al saldo disponible")
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
        Opciones de Wallet ({profileType})
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      {profileType === "Perfil Prestamista" ? (
        <>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Saldo Disponible en la cuenta:{" "}
            <strong>${accountBalance.toFixed(2)}</strong>
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
              label="Monto a depositar"
              variant="outlined"
              size="small"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              onKeyDown={handleKeyDown} // Filter allowed keys
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeposit}
              disabled={depositAmount == "" || depositAmount == null}
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
