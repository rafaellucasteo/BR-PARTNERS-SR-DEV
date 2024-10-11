// styles.ts
import { css, keyframes, styled } from "@mui/system";

type SnackbarType = "success" | "error";

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

interface CustomSnackbarProps {
  type: SnackbarType;
}

export const CustomSnackbar = styled("div")<CustomSnackbarProps>(
  ({ type }) =>
    css`
      position: fixed;
      z-index: 5500;
      display: flex;
      right: 16px;
      top: 16px;
      left: auto;
      justify-content: start;
      max-width: 560px;
      min-width: 300px;
      background-color: ${type === "error" ? "#ffcccc" : "#fff"};
      border-radius: 8px;
      border: 1px solid ${type === "error" ? "#ff0000" : "#ccc"};
      box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
      padding: 0.75rem;
      color: ${type === "error" ? "#ff0000" : "#000000"};
      font-family: "IBM Plex Sans", sans-serif;
      font-weight: 500;
      animation: ${snackbarInRight} 200ms;
      transition: transform 0.2s ease-out;
    `
);
