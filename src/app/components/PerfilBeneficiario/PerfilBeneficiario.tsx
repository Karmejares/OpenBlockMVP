import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RequestLoan from "./RequestLoan";
import RequestedLoans from "./RequestedLoans";
import SettleAccount from "./SettleAccount";
import ZBeneficiaryHistory from "./ZBeneficiaryHistory";

interface Loan {
  id: number;
  amount: number;
  requestDate: string;
  term: string;
  status: string;
}

const initialLoans: Loan[] = [
  {
    id: 1,
    amount: 500,
    requestDate: "2023-10-01",
    term: "15 days",
    status: "Pending",
  },
  {
    id: 2,
    amount: 300,
    requestDate: "2023-10-05",
    term: "30 days",
    status: "Pending",
  },
];

export default function PerfilBeneficiario() {
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [history, setHistory] = useState<Loan[]>([]);
  const [activeTab, setActiveTab] = useState(0); // Controls the active tab

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
            {activeTab === 0 && <RequestLoan />}
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
            height: "65vh",
            padding: 3,
            color: "black",
          }}
        >
          <RequestedLoans loans={loans} />
        </Box>
      </Box>

      {/* Loan History Section */}
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
    </Box>
  );
}
