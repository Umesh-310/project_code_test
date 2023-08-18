import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const AuthTheme = ({ children }) => {
  const theme = createTheme({
    palette: {
      // primary : cyan[500],
      primary: {
        main: "#fff",
        contrastText: "#002984",
      },
      secondary: {
        main: "#0c1f4d",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AuthTheme;
