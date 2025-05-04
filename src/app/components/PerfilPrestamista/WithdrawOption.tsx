import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface WithdrawOptionProps {
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

const WithdrawOption: React.FC<WithdrawOptionProps> = ({
  accountBalance,
  setAccountBalance,
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleWithdraw = () => {
    const withdraw = parseFloat(withdrawAmount);
    if (!isNaN(withdraw) && withdraw > 0 && withdraw <= accountBalance) {
      setAccountBalance((prev) => prev - withdraw);
      setWithdrawAmount("");
    } else {
      alert("Monto inválido o insuficiente en la cuenta.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir solo números, backspace, y teclas de navegación
    if (
      !/[0-9]/.test(event.key) && // Permitir números
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
        display: "flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid #ccc",
        marginTop: 2,
      }}
    >
      <TextField
        label="Monto a retirar"
        variant="outlined"
        size="small"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        onKeyDown={handleKeyDown} // Filtrar las teclas permitidas
        sx={{ flex: 1 }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleWithdraw}
        sx={{ backgroundColor: "purple", color: "white" }}
      >
        Retirar
      </Button>
    </Box>
  );
};

export default WithdrawOption;
