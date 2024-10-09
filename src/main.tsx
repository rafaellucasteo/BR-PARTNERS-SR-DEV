import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import AppRoutes from "./Routes";
import { ClientProvider } from "./modules/clients/providers/ClientProvider.tsx";
import { theme } from "./styles/theme/index.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ClientProvider>
              <AppRoutes />
            </ClientProvider>
          </QueryClientProvider>
        </StyledThemeProvider>
      </MUIThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
