import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
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
  const totalPrestamos = prestamos.reduce((acc, p) => acc + p.monto, 0);
  const totalComisiones = prestamos.reduce((acc, p) => {
    const tasa = p.monto < 500 ? 0.13 : 0.10;
    return acc + p.monto * tasa;
  }, 0);
  const totalGeneral = totalPrestamos + totalComisiones;
  const numeroDePrestamos = prestamos.length;

  return (
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 4 }}>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Tabla de préstamos - 8 columnas */}
          <Box
              sx={{
                flex: "0 0 66.6666%", // 8/12
                minWidth: "300px",
              }}
          >
            <TableContainer component={Paper}>
              <Table size="small">
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
          </Box>

          {/* Resumen financiero - 4 columnas */}
          <Box
              sx={{
                flex: "0 0 31%", // aproximadamente 4/12
                minWidth: "250px",
                alignSelf: "flex-start",
              }}
          >
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Resumen Financiero
              </Typography>
              <Typography>
                <strong>Total de préstamos:</strong> ${totalPrestamos.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Total ganancias prestamos:</strong> ${totalComisiones.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Total general a pagar:</strong> ${totalGeneral.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Total de prestamos:</strong> {numeroDePrestamos}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
  );
};

export default PrestamosActuales;