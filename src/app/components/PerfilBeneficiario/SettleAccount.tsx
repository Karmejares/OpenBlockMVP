import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { GenericToast } from "@/app/components/comun/GenericToast";

interface Loan {
  id: number;
  amount: number;
  requestDate: string;
  term: string;
  status: string;
}

interface SettleAccountProps {
  loans: Loan[];
  onSettleAccount: (id: number) => void; // Callback to handle loan payment
}

const SettleAccount: React.FC<SettleAccountProps> = ({
  loans,
  onSettleAccount,
}) => {
  const [selectedLoanId, setSelectedLoanId] = useState<number | "">("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const { SuccessNotify } = GenericToast();
  const handlePay = () => {
    if (selectedLoanId !== "") {
      onSettleAccount(selectedLoanId);
      setSnackbarMessage(`Loan with ID ${selectedLoanId} successfully paid.`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      SuccessNotify(`Loan with ID ${selectedLoanId} successfully paid.`);
      setSelectedLoanId(""); // Reset the selector
    } else {
      setSnackbarMessage("Please select a loan to pay.");
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
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        padding: 3,
        color: "black",
        maxWidth: 500,
        margin: "auto",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
        Pay Loan
      </Typography>
      <TextField
        select
        label="Select a loan"
        value={selectedLoanId}
        onChange={(e) => setSelectedLoanId(Number(e.target.value))}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        {loans
          .filter((loan) => loan.status === "Pendiente") // Only show pending loans
          .map((loan) => (
            <MenuItem key={loan.id} value={loan.id}>
              {`ID: ${loan.id} - Amount: ${loan.amount.toFixed(
                2
              )} AVAX - Term: ${loan.term}`}
            </MenuItem>
          ))}
      </TextField>
      <Button
        disabled={selectedLoanId == null || selectedLoanId == ""}
        variant="contained"
        color="primary"
        onClick={handlePay}
        fullWidth
      >
        Pay Loan
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

export default SettleAccount;
