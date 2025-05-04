import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {GenericToast} from "@/app/components/comun/GenericToast";

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
  const { SuccessNotify } = GenericToast();
  const handlePay = () => {
    if (selectedLoanId !== "") {
      onSettleAccount(selectedLoanId);
      SuccessNotify(`Loan with ID ${selectedLoanId} successfully paid.`);
      setSelectedLoanId(""); // Reset the selector
    }
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
              {`ID: ${loan.id} - Amount: $${loan.amount.toFixed(2)} - Term: ${
                loan.term
              } days`}
            </MenuItem>
          ))}
      </TextField>
      <Button
          disabled={selectedLoanId == null || selectedLoanId == ""}
          variant="contained" color="primary" onClick={handlePay} fullWidth>
        Pay Loan
      </Button>
    </Box>
  );
};

export default SettleAccount;
