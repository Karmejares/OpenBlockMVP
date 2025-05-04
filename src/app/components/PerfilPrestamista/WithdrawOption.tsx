import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {GenericToast} from "@/app/components/comun/GenericToast";

interface WithdrawOptionProps {
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

const WithdrawOption: React.FC<WithdrawOptionProps> = ({
  accountBalance,
  setAccountBalance,
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const { ErrorNotify, SuccessNotify } = GenericToast();

  const handleWithdraw = () => {
    const withdraw = parseFloat(withdrawAmount);
    if (!isNaN(withdraw) && withdraw > 0 && withdraw <= accountBalance) {
      setAccountBalance((prev) => prev - withdraw);
      setWithdrawAmount("");
      SuccessNotify(`Se ha retirado correctamente ${withdraw} a su cuenta`)
    } else {
      ErrorNotify("No se puede retirar dinero, monto o saldo insuficiente")
      setWithdrawAmount("");
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
        disabled={withdrawAmount == null || withdrawAmount == ""}
      >
        Retirar
      </Button>
    </Box>
  );
};

export default WithdrawOption;
