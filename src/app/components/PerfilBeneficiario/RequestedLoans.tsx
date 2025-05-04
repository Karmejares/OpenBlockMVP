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
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Préstamos Solicitados
      </Typography>
      {loans.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Fecha de Solicitud</TableCell>
                <TableCell>Plazo</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>{loan.id}</TableCell>
                  <TableCell>{loan.amount.toFixed(2)} AVAX</TableCell>
                  <TableCell>{loan.requestDate}</TableCell>
                  <TableCell>{loan.term}</TableCell>
                  <TableCell>{loan.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No hay préstamos solicitados.</Typography>
      )}
    </Box>
  );
};

export default RequestLoan;
