import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Loan {
  id: number;
  amount: number;
  requestDate: string;
  term: string;
  status: string;
}

interface ZBeneficiaryHistoryProps {
  loans: Loan[];
}

const ZBeneficiaryHistory: React.FC<ZBeneficiaryHistoryProps> = ({ loans }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      {loans.length > 0 ? (
        <TableContainer component={Paper} sx={{ backgroundColor: "white" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Monto</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Fecha de Inicio
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fecha de Fin</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((loan) => {
                // Calculate the end date based on the term
                const startDate = new Date(loan.requestDate);
                const termDays = parseInt(loan.term.split(" ")[0], 10);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + termDays);

                return (
                  <TableRow key={loan.id}>
                    <TableCell>{loan.id}</TableCell>
                    <TableCell>${loan.amount.toFixed(2)}</TableCell>
                    <TableCell>{startDate.toLocaleDateString()}</TableCell>
                    <TableCell>{endDate.toLocaleDateString()}</TableCell>
                    <TableCell>{loan.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ color: "white" }}>
          No hay préstamos en el historial.
        </Typography>
      )}
    </Box>
  );
};

export default ZBeneficiaryHistory;
