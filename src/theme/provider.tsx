import React from "react";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

type Props = {
  children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          a: {
            textDecoration: "none",
            color: "inherit",
            ":hover": { textDecoration: "underline" },
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
