import React from "react";
import { Card, CardContent, Typography } from "@/components/ui/card";
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

const DashboardPrestamista = ({ profileType }) => {
  if (profileType !== "Perfil Prestamista") return null;

  // Datos simulados
  const inversion = 10000;
  const ganancia = 6800;
  const beneficiarios = 25;
  const porcentajePagos = 92;

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h4">Resumen de Prestamista</Typography>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <Typography variant="h6">Inversión Total</Typography>
            <Typography variant="h5">${inversion.toLocaleString()}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Ganancia Total</Typography>
            <Typography variant="h5">${ganancia.toLocaleString()}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Beneficiarios</Typography>
            <Typography variant="h5">{beneficiarios}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">% Créditos Pagados</Typography>
            <Typography variant="h5">{porcentajePagos}%</Typography>
          </CardContent>
        </Card>
      </div>

      {/* Historial de ganancias */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
        <Typography variant="h6" className="mb-4">
          Historial de Ganancias
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ganancias"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPrestamista;
