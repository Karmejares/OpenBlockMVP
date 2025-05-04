import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Ene", ganancias: 1200 },
  { month: "Feb", ganancias: 1500 },
  { month: "Mar", ganancias: 1000 },
  { month: "Abr", ganancias: 1700 },
  { month: "May", ganancias: 1400 },
];

const Dashboard = ({ profileType }) => {
  const inversion = 10000;
  const ganancia = 6800;
  const beneficiarios = 25;
  const porcentajePagos = 92;

  const theme = useTheme();

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {profileType === "Perfil Prestamista"
          ? "Resumen de Prestamista"
          : "Resumen de Beneficiario"}
      </Typography>

      {/* Tarjetas de resumen */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", backgroundColor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="subtitle2">Inversión Total</Typography>
              <Typography variant="h6">
                ${inversion.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", backgroundColor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="subtitle2">Ganancia Total</Typography>
              <Typography variant="h6">${ganancia.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", backgroundColor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="subtitle2">Beneficiarios</Typography>
              <Typography variant="h6">{beneficiarios}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", backgroundColor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="subtitle2">% Créditos Pagados</Typography>
              <Typography variant="h6">{porcentajePagos}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Historial de ganancias */}
      <Card sx={{ p: 2, backgroundColor: "#fff" }}>
        <Typography variant="h6" gutterBottom>
          Historial de Ganancias
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ganancias"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </Box>
  );
};

export default Dashboard;
