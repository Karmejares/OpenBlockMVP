import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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

  const handleDeposit = () => {
    const deposit = parseFloat(depositAmount);
    if (!isNaN(deposit) && deposit > 0) {
      setAccountBalance((prev) => prev + deposit); // Actualiza el saldo en el componente padre
      setDepositAmount("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir solo números, backspace, y teclas de navegación
    if (
      !/[0-9]/.test(event.key) && // Permitir números v
      event.key !== "Backspace" && // Permitir borrar
      event.key !== "ArrowLeft" && // Permitir mover el cursor a la izquierda
      event.key !== "ArrowRight" && // Permitir mover el cursor a la derecha
      event.key !== "Delete" // Permitir borrar hacia adelante
    ) {
      event.preventDefault();
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "white",
        borderRadius: 2,
        color: "black",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Opciones de Wallet ({profileType})
      </Typography>
      {profileType === "Perfil Prestamista" ? (
        <>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Saldo Disponible en la cuenta: ${accountBalance.toFixed(2)}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
          >
            <TextField
              label="Monto a depositar"
              variant="outlined"
              size="small"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              onKeyDown={handleKeyDown} // Filtrar las teclas permitidas
            />
            <Button variant="contained" color="primary" onClick={handleDeposit}>
              Depositar
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1">
          Cambia al perfil de Prestamista para ver las opciones de la wallet.
        </Typography>
      )}
    </Box>
  );
};

export default WalletOptions;
