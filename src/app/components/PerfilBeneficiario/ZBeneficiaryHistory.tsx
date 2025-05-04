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
      <Typography variant="h6" sx={{ marginBottom: 2, color: "white" }}>
        Historial de Préstamos
      </Typography>
      {loans.length > 0 ? (
        <TableContainer component={Paper} sx={{ backgroundColor: "white" }}>
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
              {loans.map((prestamo) => (
                <TableRow key={prestamo.id}>
                  <TableCell>{prestamo.id}</TableCell>
                  <TableCell>${prestamo.amount.toFixed(2)}</TableCell>
                  <TableCell>{prestamo.requestDate}</TableCell>
                  <TableCell>{prestamo.term}</TableCell>
                  <TableCell>{prestamo.status}</TableCell>
                </TableRow>
              ))}
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
