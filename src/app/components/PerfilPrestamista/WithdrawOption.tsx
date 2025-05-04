import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  const { ErrorNotify, SuccessNotify } = GenericToast();

  const handleWithdraw = async () => {
    if (accountBalance > 0) {
      try {
        const avaxPriceCOP = await fetchAvaxPriceInCOP(); // Fetch the conversion rate when the button is pressed
        if (avaxPriceCOP) {
          const copAmount = accountBalance * avaxPriceCOP; // Convert AVAX to COP
          setAccountBalance(0); // Set account balance to 0 after withdrawal
          SuccessNotify(
            `Se ha retirado correctamente ${accountBalance.toFixed(
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
      ErrorNotify("No tienes saldo disponible para retirar.");
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
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        border: "1px solid #ccc",
        marginTop: 2,
      }}
    >
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Saldo disponible: <strong>{accountBalance.toFixed(4)} AVAX</strong>
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleWithdraw}
        sx={{ backgroundColor: "purple", color: "white" }}
        disabled={accountBalance <= 0} // Disable button if no balance
      >
        Retirar Todo
      </Button>
    </Box>
  );
};

export default WithdrawOption;
