import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import App from "./App.tsx";
import { theme } from "./styles/theme/index.ts";

async function msw() {
  const { worker } = await import("./services/mocks/browser");
  worker.start();
}

msw().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <StrictMode>
            <App />
          </StrictMode>
        </StyledThemeProvider>
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
});
