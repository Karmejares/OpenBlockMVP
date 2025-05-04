import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import RequestLoan from "./RequestLoan";
import RequestedLoans from "./RequestedLoans";
import SettleAccount from "./SettleAccount";
import ZBeneficiaryHistory from "./ZBeneficiaryHistory";

export interface Loan {
  id: number;
  amount: number;
  term: string;
  status: string;
  requestDate: string;
}

export default function PerfilBeneficiario() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [history, setHistory] = useState<Loan[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleRequestLoan = (newLoan: Loan) => {
    const loanWithDate = {
      ...newLoan,
      requestDate: new Date().toISOString(),
    };
    setLoans((prevLoans) => [...prevLoans, loanWithDate]);
  };

  const handleSettleAccount = (id: number) => {
    setLoans((prevLoans) => {
      const paidLoan = prevLoans.find((loan) => loan.id === id);
      if (paidLoan) {
        setHistory((prevHistory) => {
          const alreadyExists = prevHistory.some(
            (loan) => loan.id === paidLoan.id
          );
          if (!alreadyExists) {
            return [...prevHistory, { ...paidLoan, status: "Paid" }];
          }
          return prevHistory;
        });
      }
      return prevLoans.filter((loan) => loan.id !== id);
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        height: "100vh",
        color: "white",
        padding: 4,
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            height: "75vh",
            color: "black",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab label="Solicitar Préstamo" />
            <Tab label="Pagar Préstamo" />
          </Tabs>

          <Box sx={{ marginTop: 2 }}>
            {activeTab === 0 && (
              <RequestLoan
                onRequestLoan={handleRequestLoan}
                currentLoanCount={loans.length}
                hasOverdueLoans={loans.some((loan) => loan.status === "Atrasado")}
              />
            )}
            {activeTab === 1 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {loans.length === 0 ? (
                  <Typography>No tienes préstamos pendientes.</Typography>
                ) : (
                  loans.map((loan) => (
                    <SettleAccount
                      key={loan.id}
                      loanId={loan.id}
                      amount={loan.amount}
                      onSettleAccount={() => handleSettleAccount(loan.id)}
                    />
                  ))
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            height: "75vh",
            color: "black",
          }}
        >
          <RequestLoan
            onRequestLoan={handleRequestLoan}
            currentLoanCount={loans.length}
            hasOverdueLoans={loans.some((loan) => loan.status === "Atrasado")}
          />

        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          padding: 4,
          backgroundColor: "#1c1c1c",
          borderTop: "1px solid #333",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Historial de Pagos
        </Typography>
        <ZBeneficiaryHistory loans={history} />
      </Box>
    </Box>
  );
}


