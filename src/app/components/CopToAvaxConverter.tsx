"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, CircularProgress } from "@mui/material";

// Exporta la función para obtener la tasa de conversión
export const fetchAvaxPriceInCOP = async (): Promise<number | null> => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=cop"
    );
    const data = await res.json();
    return data["avalanche-2"].cop;
  } catch (err) {
    console.error("Error al obtener tasa de cambio COP/AVAX:", err);
    return null;
  }
};

const CopToAvaxConverter = () => {
  const [copAmount, setCopAmount] = useState<number>(0);
  const [avaxPriceCOP, setAvaxPriceCOP] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchAvaxPriceInCOP();
      setAvaxPriceCOP(price);
      setLoading(false);
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 60_000); // Actualiza cada 60s
    return () => clearInterval(interval);
  }, []);

  const avaxAmount = avaxPriceCOP ? copAmount / avaxPriceCOP : 0;

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        color: "black",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        mt: 4,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Typography variant="h6" mb={2}>
        Conversión de COP a AVAX
      </Typography>

      <TextField
        label="Monto en COP"
        fullWidth
        type="number"
        value={copAmount}
        onChange={(e) => setCopAmount(Number(e.target.value))}
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { color: "#000" } }}
        InputProps={{ style: { color: "#000" } }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography>
            <strong>Precio actual de AVAX:</strong> $
            {avaxPriceCOP?.toLocaleString()} COP
          </Typography>
          <Typography>
            <strong>Recibirás aproximadamente:</strong> {avaxAmount.toFixed(4)}{" "}
            AVAX
          </Typography>
        </>
      )}
    </Box>
  );
};

export default CopToAvaxConverter;
