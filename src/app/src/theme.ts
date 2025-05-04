import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: "#000",
        },
      },
    },
  },
});

export default theme;
