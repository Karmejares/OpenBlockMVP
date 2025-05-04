"use client";

import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, MenuItem, Button,
  Snackbar, Alert, Dialog, DialogTitle
} from "@mui/material";
import FormularioAceptacion from "@/app/components/Forms/FormularioAceptacion";
import { requestLoan } from "@/app/web3Functions/loanContract";
import { GenericToast } from "@/app/components/comun/GenericToast";

const RequestLoan = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [termDays, setTermDays] = useState<number>(15);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingLoan, setPendingLoan] = useState<number | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const { SuccessNotify, ErrorNotify } = GenericToast();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((accounts: string[]) => {
        setWalletAddress(accounts[0]);
      });
    }
  }, []);

  const handleRequestLoan = () => {
    if (amount && amount >= 100 && amount <= 1000) {
      setPendingLoan(amount);
      setModalOpen(true);
    } else {
      ErrorNotify("Ingresa un monto válido entre $100 y $1000");
    }
  };

  const handleAceptar = async (firma: string) => {
    try {
      if (!pendingLoan) return;
      await requestLoan(pendingLoan, walletAddress, termDays === 15 ? 0 : 1);
      SuccessNotify("Préstamo solicitado correctamente");
    } catch (e) {
      ErrorNotify("Error al solicitar el préstamo");
      console.error(e);
    } finally {
      setModalOpen(false);
      setAmount("");
      setPendingLoan(null);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" textAlign="center">Solicitar Préstamo</Typography>

      <TextField
        label="Monto solicitado ($)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        fullWidth
      />

      <TextField
        select
        label="Plazo"
        value={termDays}
        onChange={(e) => setTermDays(Number(e.target.value))}
        fullWidth
        sx={{ mt: 2 }}
      >
        <MenuItem value={15}>15 días</MenuItem>
        <MenuItem value={30}>30 días</MenuItem>
      </TextField>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        fullWidth
        onClick={handleRequestLoan}
        disabled={amount === ""}
      >
        Solicitar
      </Button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Confirma y firma la solicitud</DialogTitle>
        <FormularioAceptacion onAceptar={handleAceptar} />
      </Dialog>
    </Box>
  );
};

export default RequestLoan;
