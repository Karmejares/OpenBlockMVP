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
import { requestLoan } from "@/app/web3Functions/loanContract";

interface RequestLoanProps {
  onRequestLoan: (loan: {
    id: number;
    amount: number;
    term: string;
    status: string;
    requestDate: string;
  }) => void;
  currentLoanCount: number;
  hasOverdueLoans: boolean;
}

const RequestLoan: React.FC<RequestLoanProps> = ({
  onRequestLoan,
  currentLoanCount,
  hasOverdueLoans,
}) => {
  const [amount, setAmount] = useState<number | "">("");
  const [termDays, setTermDays] = useState<number>(15);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingLoan, setPendingLoan] = useState<null | {
    id: number;
    amount: number;
    term: string;
    status: string;
    requestDate: string;
  }>(null);

  const { SuccessNotify, ErrorNotify } = GenericToast();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((accounts: string[]) => {
        setWalletAddress(accounts[0]);
      });
    }
  }, []);

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
  };

  const handleRequestLoan = () => {
    if (hasOverdueLoans) {
      ErrorNotify("No puedes solicitar un préstamo mientras tengas préstamos atrasados.");
      return;
    }

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
      ErrorNotify("Por favor, ingresa un monto válido entre $100 y $1000.");
    }
  };

  const handleAceptar = async (firmaBase64: string) => {
    if (!pendingLoan || !walletAddress) return;

    try {
      await requestLoan(pendingLoan.amount, walletAddress, termDays === 30 ? 1 : 0);
      SuccessNotify("Préstamo solicitado correctamente");
      onRequestLoan(pendingLoan);
    } catch (err) {
      console.error(err);
      ErrorNotify("Error al solicitar el préstamo.");
    }

    setPendingLoan(null);
    setAmount("");
    handleTermChange(15);
    setModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" textAlign="center">Solicitar Préstamo</Typography>
      <TextField
        label="Monto solicitado ($)"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <TextField
        select
        label="Plazo del préstamo"
        value={termDays}
        onChange={(e) => handleTermChange(Number(e.target.value))}
        fullWidth
        sx={{ mt: 2 }}
      >
        <MenuItem value={15}>15 días</MenuItem>
        <MenuItem value={30}>30 días</MenuItem>
      </TextField>
      <Typography>Tarifa por servicio: ${serviceFee.toFixed(2)}</Typography>
      <Typography>Monto total a pagar: ${totalToPay.toFixed(2)}</Typography>
      <Button
        variant="contained"
        onClick={handleRequestLoan}
        disabled={amount === ""}
        sx={{ mt: 2 }}
        fullWidth
      >
        Solicitar Préstamo
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
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
