import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import {GenericToast} from "@/app/components/comun/GenericToast";

interface Props {
    onAceptar: (firma: string) => void; // ahora devuelve la firma como imagen base64
}

export default function FormularioAceptacion({ onAceptar }: Props) {
    const [aceptado, setAceptado] = useState(false);
    const sigCanvasRef = useRef<SignatureCanvas>(null);
    const [error, setError] = useState("");
    const { ErrorNotify } = GenericToast();

    const handleSubmit = () => {
        if (!aceptado) {
            setError("Debes aceptar los términos");
            return;
        }

        const firmaCanvas = sigCanvasRef.current;
        if (firmaCanvas?.isEmpty()) {
            ErrorNotify("Por favor, firma antes de continuar.");
            return;
        }

        const firma = firmaCanvas!.getCanvas().toDataURL("image/png");
        onAceptar(firma);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="body1" mb={1}>
                Por favor, acepta los términos y condiciones y firma para continuar.
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={aceptado}
                        onChange={(e) => {
                            setAceptado(e.target.checked);
                            setError("");
                        }}
                        color="primary"
                    />
                }
                label="Acepto los términos y condiciones"
            />

            <Box mt={2}>
                <Typography variant="subtitle2">Firma electrónica:</Typography>
                <Box
                    sx={{
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        height: 150,
                        width: "100%",
                        mb: 1,
                    }}
                >
                    <SignatureCanvas
                        penColor="black"
                        canvasProps={{ width: 350, height: 150, className: "sigCanvas" }}
                        ref={sigCanvasRef}
                    />
                </Box>
                <Button
                    variant="outlined"
                    onClick={() => sigCanvasRef.current?.clear()}
                    size="small"
                >
                    Borrar firma
                </Button>
            </Box>

            {error && (
                <Typography color="error" variant="caption">
                    {error}
                </Typography>
            )}

            <Box mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!aceptado}
                >
                    Confirmar
                </Button>
            </Box>
        </Box>
    );
}
