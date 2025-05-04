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
  fechaDeInicio: string;
  fechaDeFin: string;
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
                <TableCell>Fecha de Inicio</TableCell>
                <TableCell>Fecha de Fin</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prestamos.map((prestamo) => (
                <TableRow key={prestamo.id}>
                  <TableCell>{prestamo.id}</TableCell>
                  <TableCell>${prestamo.monto.toFixed(2)}</TableCell>
                  <TableCell>{prestamo.fechaDeInicio}</TableCell>
                  <TableCell>{prestamo.fechaDeFin}</TableCell>
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
