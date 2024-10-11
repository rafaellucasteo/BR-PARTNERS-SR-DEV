import { CircularProgress } from "@mui/material";
import { CustomButtonProps, StyledButton } from "./styles";

interface ButtonProps extends CustomButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  onClick,
  label,
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton {...rest} onClick={onClick} disabled={disabled || loading}>
      {loading ? <CircularProgress size={10} color="inherit" /> : label}
    </StyledButton>
  );
}
