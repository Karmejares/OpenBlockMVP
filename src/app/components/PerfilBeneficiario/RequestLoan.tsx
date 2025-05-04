import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
} from "@mui/material";
import FormularioAceptacion from "@/app/components/Forms/FormularioAceptacion";
import { GenericToast } from "@/app/components/comun/GenericToast";

interface RequestLoanProps {
  onRequestLoan: (loan: {
    id: number;
    amount: number;
    term: string;
    status: string;
    requestDate: string;
  }) => void;
  currentLoanCount: number;
}

const RequestLoan: React.FC<RequestLoanProps> = ({
                                                   onRequestLoan,
                                                   currentLoanCount,
                                                 }) => {
  const [amount, setAmount] = useState<number | "">("");
  const [termDays, setTermDays] = useState<number>(15);
  const [term, setTerm] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
      "success"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingLoan, setPendingLoan] = useState<any>(null);

  const { SuccessNotify, ErrorNotify } = GenericToast();

  const calculateDueDate = (days: number): string => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate.toLocaleDateString();
  };

  const serviceFeePercentage = 0.05;
  const serviceFee = amount ? amount * serviceFeePercentage : 0;
  const totalToPay = amount ? amount + serviceFee : 0;

  const handleTermChange = (days: number) => {
    setTermDays(days);
    setTerm(`${days} días (vence el ${calculateDueDate(days)})`);
  };

  const handleRequestLoan = () => {
    if (currentLoanCount >= 2) {
      ErrorNotify("No puedes solicitar más de 2 préstamos.");
      return;
    }

    if (amount && amount >= 100 && amount <= 1000) {
      const newLoan = {
        id: Date.now(),
        amount,
        term: `${termDays} días (vence el ${calculateDueDate(termDays)})`,
        status: "Pendiente",
        requestDate: new Date().toLocaleDateString(),
      };
      setPendingLoan(newLoan);
      setModalOpen(true);
    } else {
      ErrorNotify("Por favor, ingresa un monto válido entre $100 y $1000");
    }
  };

  const handleAceptar = (firmaBase64: string) => {
    if (pendingLoan) {
      console.log("Firma capturada (base64):", firmaBase64);
      onRequestLoan(pendingLoan);
      SuccessNotify("Préstamo solicitado correctamente");
      setSnackbarMessage(
          `Monto: $${pendingLoan.amount}\n` +
          `Plazo: ${pendingLoan.term}\n` +
          `Tarifa: $${(pendingLoan.amount * serviceFeePercentage).toFixed(2)}\n` +
          `Total a pagar: $${(pendingLoan.amount * 1.05).toFixed(2)}`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setPendingLoan(null);
      setAmount("");
      handleTermChange(15);
      setModalOpen(false);
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
        <Typography variant="h6" textAlign="center">
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
            disabled={amount === "" || amount === null}
        >
          Solicitar Préstamo
        </Button>

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

        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <DialogTitle>Aceptar Términos</DialogTitle>
          <FormularioAceptacion onAceptar={handleAceptar} />
        </Dialog>
      </Box>
  );
};

export default RequestLoan;
