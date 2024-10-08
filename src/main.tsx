import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import App from "./App.tsx";
import { theme } from "./styles/theme/index.ts";

const queryClient = new QueryClient();

async function initializeMsw() {
  const { worker } = await import("./services/mocks/browser");
  worker.start();
}

initializeMsw().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </StyledThemeProvider>
        </MUIThemeProvider>
      </StyledEngineProvider>
    </StrictMode>
  );
});
