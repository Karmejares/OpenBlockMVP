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

interface RequestedLoansProps {
  loans: Loan[];
}

const RequestedLoans: React.FC<RequestedLoansProps> = ({ loans }) => {
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
                  <TableCell>${loan.amount.toFixed(2)}</TableCell>
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

export default RequestedLoans;
