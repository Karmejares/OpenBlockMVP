import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface RequestLoanProps {
  onRequestLoan: (loan: {
    id: number;
    amount: number;
    term: string;
    status: string;
    requestDate: string;
  }) => void;
  currentLoanCount: number;
  hasOverdueLoans: boolean; // New prop to check if there are overdue loans
}

const RequestLoan: React.FC<RequestLoanProps> = ({
  onRequestLoan,
  currentLoanCount,
  hasOverdueLoans, // New prop to check if there are overdue loans
}) => {
  const calculateDueDate = (days: number): string => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate.toLocaleDateString();
  };

  const [amount, setAmount] = useState<number | "">("");
  const [termDays, setTermDays] = useState<number>(15);
  const [term, setTerm] = useState<string>(
    `15 días (vence el ${calculateDueDate(15)})`
  );
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const serviceFeePercentage = 0.05;
  const serviceFee = amount ? amount * serviceFeePercentage : 0;
  const totalToPay = amount ? amount + serviceFee : 0;

  const handleTermChange = (days: number) => {
    setTermDays(days);
    const dueDateString = `${days} días (vence el ${calculateDueDate(days)})`;
    setTerm(dueDateString);
  };

  const handleRequestLoan = () => {
    if (hasOverdueLoans) {
      setSnackbarMessage(
        "No puedes solicitar un préstamo mientras tengas préstamos atrasados."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (currentLoanCount >= 2) {
      setSnackbarMessage("No puedes solicitar más de 2 préstamos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (amount && amount >= 100 && amount <= 1000) {
      const newLoan = {
        id: Date.now(),
        amount,
        term,
        status: "Pendiente",
        requestDate: new Date().toLocaleDateString(),
      };
      onRequestLoan(newLoan);
      setSnackbarMessage(
        `Préstamo solicitado con éxito:\n\n` +
          `Monto: $${amount.toFixed(2)}\n` +
          `Plazo: ${term}\n` +
          `Tarifa por servicio: $${serviceFee.toFixed(2)}\n` +
          `Monto total a pagar: $${totalToPay.toFixed(2)}\n` +
          `Fecha de solicitud: ${newLoan.requestDate}`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setAmount("");
      handleTermChange(15);
    } else {
      setSnackbarMessage(
        "Por favor, ingresa un monto válido entre $100 y $1000."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        label="Plazo del préstamo"
        value={termDays}
        onChange={(e) => handleTermChange(Number(e.target.value))}
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
      >
        Solicitar Préstamo
      </Button>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RequestLoan;
