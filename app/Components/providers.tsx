"use client";

import { WuiProvider, createTheme } from "@welcome-ui/core";

const theme = createTheme({
  colors: {
    primary: {
      500: "#ffffff",
    },
  },
});

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WuiProvider theme={theme}>
      {children}
    </WuiProvider>
  );
}