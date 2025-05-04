import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {GenericToast} from "@/app/components/comun/GenericToast";

const RequestLoan: React.FC = () => {
  const { SuccessNotify, ErrorNotify} = GenericToast();
  const [amount, setAmount] = useState<number | "">("");
  const [term, setTerm] = useState<number>(15); // Default term: 15 days
  const serviceFeePercentage = 0.05; // 5% fee

  // Calculate the service fee
  const serviceFee = amount ? amount * serviceFeePercentage : 0;

  // Calculate the total amount to pay
  const totalToPay = amount ? amount + serviceFee : 0;

  const handleRequestLoan = () => {
    if (amount && amount >= 100 && amount <= 1000) {
      // Add logic here to send the request to the backend
      setAmount("");
      setTerm(15); // Reset term to default value
      SuccessNotify("Prestamo solicitado correctamente");
    } else {
      ErrorNotify("Por favor, ingresa un monto válido entre $100 y $1000");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 4,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        margin: "auto",
        color: "black",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Solicitar Préstamo
      </Typography>
      <TextField
        label="Monto solicitado ($)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        inputProps={{ min: 100, max: 1000 }}
        fullWidth
      />
      <TextField
        select
        label="Plazo del préstamo (días)"
        value={term}
        onChange={(e) => setTerm(Number(e.target.value))}
        fullWidth
      >
        <MenuItem value={15}>15 días</MenuItem>
        <MenuItem value={30}>30 días</MenuItem>
      </TextField>
      <Typography>
        <strong>Tarifa por servicio:</strong> ${serviceFee.toFixed(2)}
      </Typography>
      <Typography>
        <strong>Monto total a pagar:</strong> ${totalToPay.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRequestLoan}
        fullWidth
        disabled={amount == null || amount == ""}
      >
        Solicitar Préstamo
      </Button>
    </Box>
  );
};

export default RequestLoan;
