import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Prestamo {
  id: number;
  monto: number;
  fecha: string;
  estado: string;
}

interface PrestamosActualesProps {
  prestamos: Prestamo[];
}

const PrestamosActuales: React.FC<PrestamosActualesProps> = ({ prestamos }) => {
  return (
    <div>
      <h2>Préstamos Actuales</h2>
      {prestamos.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prestamos.map((prestamo) => (
                <TableRow key={prestamo.id}>
                  <TableCell>{prestamo.id}</TableCell>
                  <TableCell>${prestamo.monto.toFixed(2)}</TableCell>
                  <TableCell>{prestamo.fecha}</TableCell>
                  <TableCell>{prestamo.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No hay préstamos actuales.</p>
      )}
    </div>
  );
};

export default PrestamosActuales;
