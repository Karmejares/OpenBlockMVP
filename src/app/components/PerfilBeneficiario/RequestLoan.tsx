import React, { useState, useEffect } from "react";
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
import { fetchAvaxPriceInCOP } from "../CopToAvaxConverter"; // Import the conversion function

interface RequestLoanProps {
  onRequestLoan: (loan: {
    id: number;
    amount: number; // Amount in AVAX
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
  hasOverdueLoans,
}) => {
  const [copAmount, setCopAmount] = useState<number | "">(""); // Amount in COP
  const [avaxAmount, setAvaxAmount] = useState<number | null>(null); // Equivalent in AVAX
  const [termDays, setTermDays] = useState<number>(15);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingLoan, setPendingLoan] = useState<null | {
    id: number;
    amount: number; // Amount in AVAX
    term: string;
    status: string;
    requestDate: string;
  }>(null);
  const [avaxPriceCOP, setAvaxPriceCOP] = useState<number | null>(null); // Conversion rate

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

  const calculateDueDate = (days: number): string => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate.toLocaleDateString();
  };

  const handleCopAmountChange = (value: number) => {
    setCopAmount(value);

    if (value === 0) {
      setAvaxAmount(null); // No calcular el equivalente si el valor es 0
      return;
    }

    if (avaxPriceCOP && value > 0) {
      setAvaxAmount(value / avaxPriceCOP); // Convertir COP a AVAX
    } else {
      setAvaxAmount(null); // No mostrar el equivalente si no hay tasa de cambio
    }
  };

  const handleRequestLoan = async () => {
    // Check if the beneficiary has overdue loans
    if (hasOverdueLoans) {
      ErrorNotify(
        "No puedes solicitar un préstamo mientras tengas préstamos atrasados."
      );
      setSnackbarMessage(
        "No puedes solicitar un préstamo mientras tengas préstamos atrasados."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Check if the beneficiary already has 2 loans
    if (currentLoanCount >= 2) {
      ErrorNotify("No puedes solicitar más de 2 préstamos.");
      setSnackbarMessage("No puedes solicitar más de 2 préstamos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Fetch the AVAX price in COP when the button is clicked
    if (!avaxPriceCOP) {
      const price = await fetchAvaxPriceInCOP();
      if (price) {
        setAvaxPriceCOP(price);
      } else {
        ErrorNotify("Error al obtener la tasa de cambio COP/AVAX.");
        setSnackbarMessage("Error al obtener la tasa de cambio COP/AVAX.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    }

    // Validate the loan amount
    if (
      copAmount &&
      copAmount >= 10000 && // Minimum amount
      copAmount <= 150000 && // Maximum amount
      avaxPriceCOP
    ) {
      const avaxEquivalent = copAmount / avaxPriceCOP; // Convert COP to AVAX
      const newLoan = {
        id: Date.now(),
        amount: avaxEquivalent, // Store the equivalent in AVAX
        term: `${termDays} días (vence el ${calculateDueDate(termDays)})`,
        status: "Pendiente",
        requestDate: new Date().toLocaleDateString(),
      };
      setPendingLoan(newLoan);
      setModalOpen(true);
    } else {
      ErrorNotify(
        "Por favor, ingresa un monto válido entre $10,000 y $150,000 COP."
      );
      setSnackbarMessage(
        "Por favor, ingresa un monto válido entre $10,000 y $150,000 COP."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleAceptar = (firmaBase64: string) => {
    if (pendingLoan) {
      console.log("Firma capturada (base64):", firmaBase64);
      onRequestLoan(pendingLoan);
      SuccessNotify("Préstamo solicitado correctamente");
      setSnackbarMessage(
        `Monto solicitado: ${copAmount} COP\n` +
          `Equivalente en AVAX: ${pendingLoan.amount.toFixed(4)} AVAX\n` +
          `Plazo: ${pendingLoan.term}`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setPendingLoan(null);
      setCopAmount("");
      setAvaxAmount(null);
      setTermDays(15);
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
        label="Monto solicitado (COP)"
        fullWidth
        value={copAmount}
        onChange={(e) => handleCopAmountChange(Number(e.target.value))}
        InputLabelProps={{
          style: { color: "#000" }, // Label color
        }}
        InputProps={{
          style: { color: "#000" }, // Input text color
        }}
      />

      <Typography>
        <strong>Equivalente en AVAX:</strong>{" "}
        {avaxAmount !== null ? `${avaxAmount.toFixed(4)} AVAX` : "Cargando..."}
      </Typography>

      <TextField
        select
        label="Plazo del préstamo"
        value={termDays}
        onChange={(e) => setTermDays(Number(e.target.value))}
        fullWidth
      >
        <MenuItem value={15}>15 días</MenuItem>
        <MenuItem value={30}>30 días</MenuItem>
      </TextField>

      <Button
        variant="contained"
        color="primary"
        onClick={handleRequestLoan}
        fullWidth
        disabled={copAmount === "" || copAmount === null || avaxAmount === null}
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
