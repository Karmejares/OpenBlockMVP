import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { GenericToast } from "@/app/components/comun/GenericToast";
import { fetchAvaxPriceInCOP } from "../CopToAvaxConverter"; // Import the conversion function

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

  const handleWithdraw = async () => {
    const withdraw = parseFloat(withdrawAmount);

    if (!isNaN(withdraw) && withdraw > 0 && withdraw <= accountBalance) {
      try {
        const avaxPriceCOP = await fetchAvaxPriceInCOP(); // Fetch the conversion rate when the button is pressed
        if (avaxPriceCOP) {
          const copAmount = withdraw * avaxPriceCOP; // Convert AVAX to COP
          setAccountBalance((prev) => prev - withdraw); // Deduct AVAX from balance
          setWithdrawAmount("");
          SuccessNotify(
            `Se ha retirado correctamente ${withdraw.toFixed(
              4
            )} AVAX. Recibiste $${copAmount.toLocaleString()} COP en tu cuenta.`
          );
        } else {
          ErrorNotify(
            "No se pudo obtener la tasa de cambio. Intenta nuevamente."
          );
        }
      } catch (error) {
        ErrorNotify("Error al realizar el retiro. Intenta nuevamente.");
        console.error("Error al obtener la tasa de cambio:", error);
      }
    } else {
      ErrorNotify("No se puede retirar dinero, monto o saldo insuficiente.");
      setWithdrawAmount("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, backspace, and navigation keys
    if (
      !/[0-9.]/.test(event.key) && // Allow numbers and decimal point
      event.key !== "Backspace" && // Allow backspace
      event.key !== "ArrowLeft" && // Allow left arrow
      event.key !== "ArrowRight" && // Allow right arrow
      event.key !== "Delete" // Allow delete
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
        label="Monto a retirar (AVAX)"
        variant="outlined"
        size="small"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        onKeyDown={handleKeyDown} // Filter allowed keys
        sx={{ flex: 1 }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleWithdraw}
        sx={{ backgroundColor: "purple", color: "white" }}
        disabled={withdrawAmount === "" || withdrawAmount === null}
      >
        Retirar
      </Button>
    </Box>
  );
};

export default WithdrawOption;
