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
  requestDate: string; // Date when the loan was requested
}

export default function PerfilBeneficiario() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [history, setHistory] = useState<Loan[]>([]);
  const [activeTab, setActiveTab] = useState(0); // Controls the active tab

  const handleRequestLoan = (newLoan: Loan) => {
    const loanWithDate = {
      ...newLoan,
      requestDate: new Date().toISOString(), // Add the current date as the request date
    };
    setLoans((prevLoans) => [...prevLoans, loanWithDate]);
  };

  const handleSettleAccount = (id: number) => {
    setLoans((prevLoans) => {
      const paidLoan = prevLoans.find((loan) => loan.id === id);
      if (paidLoan) {
        // Check if the loan is already in the history
        setHistory((prevHistory) => {
          const isAlreadyInHistory = prevHistory.some(
            (loan) => loan.id === paidLoan.id
          );
          if (!isAlreadyInHistory) {
            // Add the loan to the history only if it's not already there
            return [...prevHistory, { ...paidLoan, status: "Paid" }];
          }
          return prevHistory; // Return the existing history if already present
        });
      }
      // Remove the paid loan from the active loans list
      return prevLoans.filter((loan) => loan.id !== id);
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Logic to update loans to "Atrasado" if they are overdue

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
      {/* Active Loans Section */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Tabs for Request Loan and Pay Loan */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            height: "70vh", // Ensure consistent height
            color: "black",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Request Loan" />
            <Tab label="Pay Loan" />
          </Tabs>

          <Box sx={{ marginTop: 2 }}>
            {activeTab === 0 && (
              <RequestLoan
                onRequestLoan={handleRequestLoan}
                currentLoanCount={loans.length}
                hasOverdueLoans={loans.some(
                  (loan) => loan.status === "Atrasado"
                )} // Check for overdue loans
              />
            )}
            {activeTab === 1 && (
              <SettleAccount
                loans={loans}
                onSettleAccount={handleSettleAccount}
              />
            )}
          </Box>
        </Box>

        {/* Requested Loans */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            height: "70vh", // Ensure consistent height
            color: "black",
          }}
        >
          <RequestedLoans loans={loans} />
        </Box>
      </Box>

      {/* Loan History Section */}
      {history.length > 0 ? (
        <Box
          sx={{
            marginTop: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            color: "black",
          }}
        >
          <ZBeneficiaryHistory loans={history} />
        </Box>
      ) : null}
    </Box>
  );
}
